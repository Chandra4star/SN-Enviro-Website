import express from 'express';
import { adminAuth } from '../middleware/auth.js';
import SiteSettings from '../models/SiteSettings.js';

import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Auth Middleware imported centrally as adminAuth

router.get('/', async (req, res) => {
    try {
        const settings = await SiteSettings.find();
        const settingsObj = {};
        settings.forEach(s => {
            settingsObj[s.key] = s.value;
        });
        res.json(settingsObj);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', adminAuth, upload.single('image'), async (req, res) => {
    try {
        const updates = { ...req.body };
        
        if (req.file) {
            updates.about_image = req.file.path.replace(/\\/g, '/');
        }

        const keys = Object.keys(updates);
        
        for (let key of keys) {
            await SiteSettings.findOneAndUpdate(
                { key: key },
                { value: updates[key] },
                { upsert: true, new: true }
            );
        }
        
        res.json({ message: 'Settings updated successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
