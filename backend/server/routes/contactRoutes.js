import express from 'express';
import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

const router = express.Router();

// Nodemailer Config (Placeholder - User needs to update .env with real credentials)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'mail@snenviro.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
    }
});

// POST a contact message
router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        // 1. Save to MongoDB
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();

        // 2. Send Auto-Reply Email
        const mailOptions = {
            from: process.env.EMAIL_USER || 'mail@snenviro.com',
            to: email,
            subject: 'Thank you for contacting SN Enviro Solutions',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
                    <div style="background-color: #10b981; color: white; padding: 30px; text-align: center;">
                        <h1 style="margin: 0;">Thank You, ${name}!</h1>
                    </div>
                    <div style="padding: 30px; line-height: 1.6; color: #333;">
                        <p>Hi <strong>${name}</strong>,</p>
                        <p>We received your inquiry regarding <strong>"${subject}"</strong>.</p>
                        <p>Our team is currently reviewing your message, and one of our experts will get back to you shortly.</p>
                        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                            <p style="margin: 0; font-style: italic;">"We are committed to providing you with the best environmental monitoring solutions."</p>
                        </div>
                        <p>Best Regards,<br><strong>SN Enviro Solutions Team</strong></p>
                    </div>
                    <div style="background-color: #f1f1f1; padding: 20px; text-align: center; font-size: 12px; color: #777;">
                        <p>© 2024 SN Enviro Solutions. All rights reserved.</p>
                        <p>6-1-279, Plot no.10, Padmarao Nagar, Hyderabad, Telangana 500020</p>
                    </div>
                </div>
            `
        };

        // We don't await the email so the response is faster, but we can if we want to ensure it sent
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log('Email Error:', error);
            else console.log('Email sent: ' + info.response);
        });

        res.status(201).json({ success: true, message: 'Message saved and email sent' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default router;
