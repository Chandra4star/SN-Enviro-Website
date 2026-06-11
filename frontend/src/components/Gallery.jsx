import React, { useState, useEffect } from 'react';
import GalleryStack from './GalleryStack';

const Gallery = ({ isDarkMode }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        // Bypassing backend fetch to prevent 500 error map crashes
        const defaultImages = [
            { _id: '1', title: 'MODEL 2030', imageUrl: '/assets/equipment1.png' },
            { _id: '2', title: 'SCS-900C System', imageUrl: '/assets/equipment2.png' },
            { _id: '3', title: 'SCS-900UV Analyzer', imageUrl: '/assets/equipment3.png' },
            { _id: '4', title: 'CEMS Installation Facility', imageUrl: '/assets/CEMS.jpg' },
            { _id: '5', title: 'EQMS Setup & Calibration', imageUrl: '/assets/EQMS.jpg' },
            { _id: '6', title: 'Smart City Weather Node', imageUrl: '/assets/Gemini_Generated_Image_jfecovjfecovjfec.png' },
            { _id: '7', title: 'CAAQMS Station Deployment', imageUrl: '/assets/CAAQMS.png' },
            { _id: '8', title: 'Industrial Emission Monitoring', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070' }
        ];
        setImages(defaultImages);
    }, []);

    if (images.length === 0) return null;

    return (
        <section id="gallery" className={`py-16 md:py-24 lg:py-32 overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 border-t border-slate-900' : 'bg-slate-50 border-t border-slate-100'}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Work</span>
                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Project <span className="text-emerald-500">Gallery</span>
                    </h2>
                    <p className={`max-w-2xl mx-auto text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Click on the image stack to explore our recent installations and cutting-edge environmental monitoring deployments.
                    </p>
                </div>

                <div className="mt-8">
                    <GalleryStack images={images} isDarkMode={isDarkMode} />
                </div>
            </div>
        </section>
    );
};

export default Gallery;
