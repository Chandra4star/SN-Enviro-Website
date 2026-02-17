import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String },
    desc: { type: String, required: true },
    details: { type: String },
    longDescription: { type: String }, // For blog-like detailed content
    features: { type: [String], default: [] },
    pros: { type: [String], default: [] },
    cons: { type: [String], default: [] },
    gallery: { type: [String], default: [] }, // Additional images
    icon: { type: String }, // Name of Lucide icon
    imageUrl: { type: String },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
