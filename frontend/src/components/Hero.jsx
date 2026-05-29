import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero = ({ isDarkMode }) => {
    const images = [
        "/assets/hero1.jpg",
        "/assets/hero2.jpg",
        "/assets/hero3.jpg",
        "/assets/hero4.jpg"
    ];

    const [currentImage, setCurrentImage] = useState(0);
    const [settings, setSettings] = useState({});

    useEffect(() => {
        // Bypassing settings fetch due to DB issues
        setSettings({
            hero_title: 'Your Trusted Partner in Environmental Monitoring Solutions',
            hero_subtitle: 'Delivering cutting-edge online monitoring systems for air, water, and emissions since 2017. SN Enviro Solutions is a leading system integrator, manufacturer, and supplier.'
        });

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
                {/* Responsive overlay: Stronger gradient on mobile for better text contrast */}
                <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r ${isDarkMode ? 'from-slate-900/90 via-slate-900/50 to-transparent' : 'from-white/90 via-white/50 to-transparent'} md:opacity-100 opacity-90`}></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 relative z-10 pt-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={`max-w-4xl mx-auto md:mx-0 text-center md:text-left p-6 md:p-0 rounded-3xl md:bg-transparent backdrop-blur-sm md:backdrop-blur-none ${isDarkMode ? 'bg-slate-900/40 shadow-2xl md:shadow-none border border-slate-800/50 md:border-none' : 'bg-white/40 shadow-2xl md:shadow-none border border-white/50 md:border-none'}`}
                >
                    <motion.h1
                        variants={itemVariants}
                        className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-2xl ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                    >
                        {settings.hero_title || 'Your Trusted Partner in Environmental Monitoring Solutions'}
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 max-w-2xl mx-auto md:mx-0 font-medium leading-relaxed drop-shadow-md ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}
                    >
                        {settings.hero_subtitle || 'Delivering cutting-edge online monitoring systems for air, water, and emissions since 2017. SN Enviro Solutions is a leading system integrator, manufacturer, and supplier.'}
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 sm:gap-6">
                        <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href="#products"
                            className="px-10 py-4 bg-emerald-500 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/30 text-center no-underline w-full sm:w-auto"
                        >
                            Our Products
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href="#contact"
                            className={`px-10 py-4 border-2 border-emerald-500 text-emerald-500 rounded-2xl font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-xl text-center no-underline w-full sm:w-auto ${isDarkMode ? 'bg-slate-900/50' : 'bg-white/50'}`}
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
