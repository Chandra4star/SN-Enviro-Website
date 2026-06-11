import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryStack = ({ images = [], isDarkMode }) => {
    const [cards, setCards] = useState(images);
    const [slidingOut, setSlidingOut] = useState(false);

    if (!cards || cards.length === 0) return null;

    const handleRotate = () => {
        if (slidingOut) return;
        setSlidingOut(true);
        
        // Short delay to allow the slide-out animation to play
        setTimeout(() => {
            setCards((prev) => {
                const newCards = [...prev];
                const topCard = newCards.shift();
                newCards.push(topCard);
                return newCards;
            });
            setSlidingOut(false);
        }, 300); 
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] flex items-center justify-center perspective-[1000px]">
            <AnimatePresence initial={false}>
                {cards.map((card, index) => {
                    const isTop = index === 0;
                    
                    // We only show first 4-5 items for performance and clarity
                    const isVisible = index < 5;
                    
                    let scale = 1 - index * 0.06;
                    let yOffset = index * 35; // cascading down
                    let zIndex = cards.length - index;
                    let opacity = isVisible ? 1 - index * 0.15 : 0;
                    
                    // Subtle rotation for layers behind
                    let rotate = isTop ? 0 : (index % 2 === 0 ? 1.5 : -1.5) * Math.min(index, 3);
                    let xOffset = 0;

                    // The fluid slide-out motion
                    if (isTop && slidingOut) {
                        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                        xOffset = isMobile ? 150 : 300; 
                        rotate = 15;
                        opacity = 0;
                        scale = 0.9;
                        yOffset = -50;
                    }

                    return (
                        <motion.div
                            key={card._id}
                            layout
                            initial={false}
                            animate={{
                                x: xOffset,
                                y: yOffset,
                                scale,
                                zIndex,
                                opacity,
                                rotate,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: slidingOut && isTop ? 400 : 260,
                                damping: slidingOut && isTop ? 40 : 25,
                                mass: 0.8
                            }}
                            onClick={isTop ? handleRotate : undefined}
                            className={`absolute top-0 w-full max-w-[95%] md:max-w-[85%] lg:max-w-[850px] h-[95%] md:h-full rounded-[2rem] overflow-hidden shadow-2xl border ${isDarkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'} ${isTop ? 'cursor-pointer hover:shadow-emerald-500/30 hover:border-emerald-500/50' : 'pointer-events-none'}`}
                            style={{ transformOrigin: "top center" }}
                        >
                            {/* Image */}
                            <div className="w-full h-full bg-white flex items-center justify-center p-8">
                                <img
                                    src={card.imageUrl?.startsWith('uploads/') ? `http://localhost:5000/${card.imageUrl}` : card.imageUrl}
                                    alt={card.title}
                                    className="w-full h-full object-contain select-none pointer-events-none drop-shadow-xl"
                                />
                            </div>
                            
                            {/* Title Overlay */}
                            <motion.div 
                                animate={{ opacity: isTop && !slidingOut ? 1 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="absolute bottom-0 left-0 w-full p-6 md:p-10 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent flex flex-col justify-end"
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase">Project Showcase</span>
                                </div>
                                <h3 className="text-white text-2xl md:text-4xl font-extrabold drop-shadow-lg">{card.title}</h3>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
};

export default GalleryStack;
