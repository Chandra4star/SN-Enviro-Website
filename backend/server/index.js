import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import morgan from 'morgan';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import visitRoutes from './routes/visitRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config({ path: './server/.env' });


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

// Security Headers
app.use(helmet());

// Data Sanitization againt NoSQL query injection - Moved after body parser

// Data Sanitization against XSS - Moved after body parser

// Compress responses
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

app.use(cors());
app.use(express.json({ limit: '10kb' })); // Limit body size

// Data Sanitization againt NoSQL query injection
// Custom middleware to avoid "Cannot set property query" error in Express 5
app.use((req, res, next) => {
    // console.log('Sanitizing request...');
    if (req.body) mongoSanitize.sanitize(req.body);
    if (req.params) mongoSanitize.sanitize(req.params);
    if (req.query) mongoSanitize.sanitize(req.query);
    next();
});

// Data Sanitization against XSS
// app.use(xss()); // disabling due to Express 5 compatibility issues

// MongoDB Connection
const MONGODB_URI = process.env.MONGO_URI;

mongoose.set('bufferCommands', false);

mongoose.connect(MONGODB_URI, { family: 4 })
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/notifications', notificationRoutes);

// Serve static uploads
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('SN Enviro Backend is running... API at /api/products');
});

// Admin routes are now mounted centrally in /api/admin

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`🚀 Server v2 is running on port ${PORT}`);
});
