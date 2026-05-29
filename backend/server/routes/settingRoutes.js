import express from 'express';
import jwt from 'jsonwebtoken';
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

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

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

router.post('/', auth, upload.single('image'), async (req, res) => {
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
