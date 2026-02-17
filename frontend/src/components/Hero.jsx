import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = ({ isDarkMode }) => {
    const images = [
        "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=70&w=1600", // Forest/Wind Turbine
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=70&w=1600", // Wind Energy
        "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&q=70&w=1600", // Forest/Mist
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=70&w=1600"  // Nature/Landscape
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    const nextSlide = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="home" className="relative h-screen flex items-center overflow-hidden">
            {/* Background Carousel */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentImage}
                        src={images[currentImage]}
                        alt="Hero Background"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading={currentImage === 0 ? "eager" : "lazy"}
                        fetchPriority={currentImage === 0 ? "high" : "auto"}
                    />
                </AnimatePresence>
                {/* 20% White Overlay for Text Visibility */}
                <div className={`absolute inset-0 ${isDarkMode ? 'bg-slate-900/20' : 'bg-white/40'}`}></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 pt-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl"
                >
                    <motion.h1
                        variants={itemVariants}
                        className={`text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-2xl ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                    >
                        Your Trusted Partner in <br />
                        <span className="text-emerald-500">Environmental Monitoring Solutions</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className={`text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-2xl font-normal leading-relaxed drop-shadow-md ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
                    >
                        Delivering cutting-edge online monitoring systems for air, water, and emissions since 2017. SN Enviro Solutions is a leading system integrator, manufacturer, and supplier.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href="#products"
                            className="px-10 py-4 bg-emerald-500 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/30 text-center no-underline"
                        >
                            Our Products
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href="#contact"
                            className={`px-10 py-4 border-2 border-emerald-500 text-emerald-500 rounded-2xl font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all text-center no-underline ${isDarkMode ? '' : ''}`}
                        >
                            Connect with US
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>

        </section>
    );
};

export default Hero;
