import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
    ip: { type: String, default: 'unknown' },
    userAgent: { type: String, default: 'unknown' },
    pagePath: { type: String, default: '/' },
    referrer: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Visit', visitSchema);
