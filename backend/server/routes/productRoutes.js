import express from 'express';
import multer from 'multer';
import Product from '../models/Product.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

import path from 'path';
import fs from 'fs';

// Ensure uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Auth Middleware
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

// GET all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST new product (Protected)
router.post('/', [auth, upload.single('image')], async (req, res) => {
    const product = new Product({
        title: req.body.title,
        desc: req.body.desc,
        details: req.body.details,
        icon: req.body.icon,
        imageUrl: req.file ? req.file.path : ''
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update product (Protected)
router.put('/:id', [auth, upload.single('image')], async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        const updatedFields = {
            title: req.body.title || product.title,
            desc: req.body.desc || product.desc,
            details: req.body.details || product.details,
            icon: req.body.icon || product.icon,
        };

        if (req.file) {
            updatedFields.imageUrl = req.file.path.replace(/\\/g, '/');
        }

        product = await Product.findByIdAndUpdate(req.params.id, { $set: updatedFields }, { new: true });
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE product (Protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ msg: 'Product not found' });

        await product.remove();
        res.json({ msg: 'Product removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
