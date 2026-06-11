import express from 'express';
import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';
import { broadcastNotification } from './notificationRoutes.js';

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

        // 2. Send Auto-Reply Email to Visitor
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

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log('Visitor Email Auto-Reply Error:', error);
            else console.log('Visitor Email Auto-Reply sent: ' + info.response);
        });

        // 3. Send Email Notification Alert to Admin
        const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'mail@snenviro.com';
        const adminMailOptions = {
            from: process.env.EMAIL_USER || 'mail@snenviro.com',
            to: adminEmail,
            subject: `🚨 [New Inquiry] SN Enviro Site: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
                    <div style="background-color: #10b981; color: white; padding: 20px; text-align: center;">
                        <h2 style="margin: 0; font-size: 20px;">New Contact Submission</h2>
                    </div>
                    <div style="padding: 25px; line-height: 1.6; color: #333;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <p><strong>Message:</strong></p>
                        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981; margin-top: 10px; font-style: italic;">
                            ${message.replace(/\n/g, '<br/>')}
                        </div>
                    </div>
                    <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 11px; color: #777;">
                        <p>This is an automated notification from the SN Enviro Website backend.</p>
                    </div>
                </div>
            `
        };

        transporter.sendMail(adminMailOptions, (error, info) => {
            if (error) console.log('Admin Email Alert Error:', error);
            else console.log('Admin Email Alert sent: ' + info.response);
        });

        // 4. Send Twilio SMS Notification Alert to Admin (If configured)
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromPhone = process.env.TWILIO_FROM_PHONE;
        const adminPhone = process.env.ADMIN_PHONE;

        if (accountSid && authToken && fromPhone && adminPhone) {
            const smsBody = `SN Enviro Alert! New Inquiry from ${name}. Subject: ${subject}. Message: ${message.substring(0, 80)}...`;
            const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
            const authHeader = 'Basic ' + Buffer.from(`${accountSid}:${authToken}`).toString('base64');
            
            fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    To: adminPhone,
                    From: fromPhone,
                    Body: smsBody
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.error_message) {
                    console.error('Twilio SMS Error:', data.error_message);
                } else {
                    console.log('Twilio SMS sent SID:', data.sid);
                }
            })
            .catch(err => console.error('Twilio SMS Fetch Error:', err));
        }

        // 5. Broadcast real-time SSE notification
        broadcastNotification('new_inquiry', {
            _id: newContact._id,
            name,
            email,
            subject,
            message,
            timestamp: newContact.createdAt
        });

        res.status(201).json({ success: true, message: 'Message saved, email notifications triggered' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

export default router;
