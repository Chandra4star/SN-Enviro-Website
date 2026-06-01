import express from 'express';
import multer from 'multer';
import path from 'path';
import { adminAuth } from '../middleware/auth.js';
import Testimonial from '../models/Testimonial.js';

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
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', adminAuth, upload.single('image'), async (req, res) => {
    try {
        const { name, role, content, rating } = req.body;
        const newTestimonial = new Testimonial({
            name, role, content, rating,
            avatarUrl: req.file ? req.file.path.replace(/\\/g, '/') : ''
        });
        const saved = await newTestimonial.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', adminAuth, upload.single('image'), async (req, res) => {
    try {
        const { name, role, content, rating } = req.body;
        const updateData = { name, role, content, rating };
        if (req.file) updateData.avatarUrl = req.file.path.replace(/\\/g, '/');
        const updated = await Testimonial.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', adminAuth, async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
