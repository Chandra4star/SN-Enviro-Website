import express from 'express';
import Visit from '../models/Visit.js';
import { broadcastNotification } from './notificationRoutes.js';

const router = express.Router();

// @route   POST api/visits
// @desc    Log a new site visit
router.post('/', async (req, res) => {
    const { pagePath, referrer } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    try {
        const newVisit = new Visit({
            ip,
            userAgent,
            pagePath: pagePath || '/',
            referrer: referrer || ''
        });

        await newVisit.save();

        // Broadcast visit to all connected admin panels in real-time
        broadcastNotification('new_visit', {
            _id: newVisit._id,
            pagePath: newVisit.pagePath,
            userAgent: newVisit.userAgent,
            timestamp: newVisit.createdAt
        });

        res.status(201).json({ success: true, visitId: newVisit._id });
    } catch (err) {
        console.error('Error logging visit:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// @route   GET api/visits/stats
// @desc    Get total visit counts and recent visit history
router.get('/stats', async (req, res) => {
    try {
        const totalVisits = await Visit.countDocuments();
        const recentVisits = await Visit.find()
            .sort({ createdAt: -1 })
            .limit(10);

        res.json({ totalVisits, recentVisits });
    } catch (err) {
        console.error('Error fetching visit stats:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

export default router;
