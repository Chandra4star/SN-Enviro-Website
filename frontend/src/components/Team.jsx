import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, HardHat, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

const TeamCard = ({ team, index, isDarkMode }) => {
    const divRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current || isFocused) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleFocus = () => {
        setIsFocused(true);
        setOpacity(1);
    };

    const handleBlur = () => {
        setIsFocused(false);
        setOpacity(0);
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    return (
        <motion.div
            ref={divRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
            onMouseMove={handleMouseMove}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden rounded-[2rem] p-8 md:p-10 transition-all duration-500 border group cursor-default ${isDarkMode ? 'bg-slate-900/40 border-slate-800/60 hover:border-emerald-500/30' : 'bg-white border-slate-200 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10'}`}
        >
            {/* Spotlight Effect */}
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${isDarkMode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.05)'}, transparent 40%)`,
                }}
            />

            {/* Inner Content */}
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-lg ${team.bg} ${team.color}`}>
                        <team.icon size={32} />
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ${isDarkMode ? 'border-slate-700 bg-slate-800 text-emerald-500' : 'border-slate-200 bg-slate-50 text-emerald-500'}`}>
                        <ArrowRight size={20} />
                    </div>
                </div>
                
                <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 group-hover:text-emerald-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {team.title}
                </h3>
                <p className={`text-base leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {team.description}
                </p>
            </div>
        </motion.div>
    );
};

const Team = ({ isDarkMode }) => {
    const teams = [
        {
            title: "Software Engineering Team",
            description: "Our enthusiastic software developers build the robust IIoT platforms, cloud dashboards, and seamless APIs that power real-time environmental data visualization.",
            icon: Code,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Site Engineering Team",
            description: "Our dedicated on-ground site engineers ensure flawless installation, precise calibration, and continuous maintenance of sophisticated monitoring stations.",
            icon: HardHat,
            color: "text-amber-500",
            bg: "bg-amber-500/10"
        },
        {
            title: "Quality & Compliance",
            description: "Experts committed to maintaining the highest regulatory standards, verifying data integrity, and ensuring our instruments meet EPA and CPCB guidelines.",
            icon: ShieldCheck,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        },
        {
            title: "R&D Innovators",
            description: "Forward-thinking technocrats who continuously explore next-generation sensor technologies to keep us at the forefront of environmental intelligence.",
            icon: Zap,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        }
    ];

    return (
        <section id="team" className={`py-16 md:py-24 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-slate-50 border-t border-slate-200'}`}>
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our People</span>
                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        The <span className="text-emerald-500">Minds</span> Behind the Tech
                    </h2>
                    <p className={`max-w-2xl mx-auto text-lg ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        We are a dynamic, enthusiastic team combining deep domain expertise in environmental science with cutting-edge software engineering.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {teams.map((team, index) => (
                        <TeamCard key={index} team={team} index={index} isDarkMode={isDarkMode} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;
