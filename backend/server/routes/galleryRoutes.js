import express from 'express';
import multer from 'multer';
import path from 'path';
import { adminAuth } from '../middleware/auth.js';
import Gallery from '../models/Gallery.js';

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
        const items = await Gallery.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', adminAuth, upload.single('image'), async (req, res) => {
    try {
        const { title, category } = req.body;
        const newItem = new Gallery({
            title, category,
            imageUrl: req.file ? req.file.path.replace(/\\/g, '/') : ''
        });
        const saved = await newItem.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', adminAuth, upload.single('image'), async (req, res) => {
    try {
        const { title, category } = req.body;
        const updateData = { title, category };
        if (req.file) updateData.imageUrl = req.file.path.replace(/\\/g, '/');
        const updated = await Gallery.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', adminAuth, async (req, res) => {
    try {
        await Gallery.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
