import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// @route   POST api/admin/signup
// @desc    Register a new administrator
router.post('/signup', async (req, res) => {
    const { name, email, password, adminSecret } = req.body;

    try {
        // Enforce admin authorization passcode
        const expectedSecret = process.env.ADMIN_SECRET_KEY || 'SNEnviroAdminSecret2026';
        if (adminSecret !== expectedSecret) {
            return res.status(403).json({ msg: 'Unauthorized: Invalid Admin Secret Passcode' });
        }

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists with this email' });
        }

        user = new User({
            name,
            email,
            password,
            isAdmin: true
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
                isAdmin: true
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
            (err, token) => {
                if (err) {
                    console.error('JWT Signing Error:', err);
                    return res.status(500).json({ msg: 'Token generation failed' });
                }
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        isAdmin: true
                    }
                });
            }
        );
    } catch (err) {
        console.error('Admin Signup Error:', err.message);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// @route   POST api/admin/login
// @desc    Authenticate administrator & get token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Verify user is registered as administrator
        if (!user.isAdmin) {
            return res.status(403).json({ msg: 'Access Denied: Account does not have administrator privileges' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id,
                isAdmin: true
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '30d' },
            (err, token) => {
                if (err) {
                    console.error('JWT Signing Error:', err);
                    return res.status(500).json({ msg: 'Token generation failed' });
                }
                res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        isAdmin: true
                    }
                });
            }
        );
    } catch (err) {
        console.error('Admin Login Error:', err.message);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

export default router;
