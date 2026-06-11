import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RollingText = ({ 
    texts = [], 
    rollDuration = 1.0, 
    staggerDelay = 0.05, 
    pauseDuration = 5000,
    className = "",
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!texts || texts.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % texts.length);
        }, pauseDuration);
        return () => clearInterval(interval);
    }, [texts, pauseDuration]);

    if (!texts || texts.length === 0) return null;

    const currentItem = typeof texts[currentIndex] === 'string' 
        ? { text: texts[currentIndex], className: "" }
        : texts[currentIndex];
        
    const words = currentItem.text.split(" ");

    return (
        <div className={`relative flex flex-wrap justify-center md:justify-start ${className}`}>
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIndex}
                    className={`flex flex-wrap justify-center md:justify-start gap-x-[0.3em] gap-y-[0.2em] w-full ${currentItem.className || ""}`}
                >
                    {words.map((word, i) => (
                        <motion.span 
                            key={`${currentIndex}-${i}`} 
                            custom={i}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={{
                                hidden: { 
                                    opacity: 0, 
                                    y: 50,
                                    rotateX: -45,
                                    filter: "blur(12px)",
                                    transformOrigin: "bottom"
                                },
                                visible: (i) => ({ 
                                    opacity: 1, 
                                    y: 0,
                                    rotateX: 0,
                                    filter: "blur(0px)",
                                    transition: { 
                                        duration: rollDuration, 
                                        delay: i * staggerDelay,
                                        ease: [0.16, 1, 0.3, 1]
                                    } 
                                }),
                                exit: (i) => ({
                                    opacity: 0,
                                    y: -50,
                                    rotateX: 45,
                                    filter: "blur(12px)",
                                    transition: {
                                        duration: rollDuration * 0.8,
                                        delay: i * staggerDelay * 0.3,
                                        ease: [0.7, 0, 0.84, 0]
                                    }
                                })
                            }}
                            className="inline-block perspective-[1000px] leading-tight"
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default RollingText;
