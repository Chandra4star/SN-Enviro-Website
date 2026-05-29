import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Gallery = ({ isDarkMode }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Bypassing backend fetch to prevent 500 error map crashes
        const defaultImages = [
            { _id: '1', title: 'CEMS Installation', imageUrl: '/assets/CEMS.jpg' },
            { _id: '2', title: 'EQMS Setup', imageUrl: '/assets/EQMS.jpg' },
            { _id: '3', title: 'Smart City Node', imageUrl: '/assets/Gemini_Generated_Image_jfecovjfecovjfec.png' },
            { _id: '4', title: 'CAAQMS Station', imageUrl: '/assets/CAAQMS.png' }
        ];
        setImages(defaultImages);
    }, []);

    if (images.length === 0) return null;

    return (
        <section id="gallery" className={`py-12 md:py-20 lg:py-32 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-10 md:mb-16">
                    <span className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Work</span>
                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Project <span className="text-emerald-500">Gallery</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((img, index) => (
                        <motion.div
                            key={img._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group rounded-3xl overflow-hidden shadow-lg border border-emerald-500/10"
                        >
                            <img
                                src={img.imageUrl?.startsWith('uploads/') ? `http://localhost:5000/${img.imageUrl}` : img.imageUrl}
                                alt={img.title}
                                className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <h3 className="text-white font-bold text-xl">{img.title}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
