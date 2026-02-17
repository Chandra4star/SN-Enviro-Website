import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Send, TrendingUp, Cpu } from 'lucide-react';

const Careers = ({ isDarkMode }) => {
    return (
        <section id="careers" className={`py-20 lg:py-32 transition-colors duration-500 ${isDarkMode ? 'bg-slate-800' : 'bg-emerald-600'}`}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 text-left">
                        <span className="text-emerald-300 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Work with Us</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-white leading-tight">
                            Join our growing team and make an impact in <span className="text-emerald-300">Sustainability</span>
                        </h2>
                        <p className="text-lg mb-12 text-emerald-50/80 leading-relaxed">
                            Be part of a fast-growing, innovation-driven company. We offer opportunities to work with cutting-edge technology and gain nationwide exposure in the environmental monitoring sector.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                            <div className="flex items-start gap-4">
                                <TrendingUp className="text-emerald-300 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">Fast Growing</h4>
                                    <p className="text-sm text-emerald-50/60">Innovation-driven environment.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <Cpu className="text-emerald-300 shrink-0" />
                                <div>
                                    <h4 className="font-bold text-white mb-1">Cutting-Edge</h4>
                                    <p className="text-sm text-emerald-50/60">Work with top-tier IoT tech.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">


                        </div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/20"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"
                                alt="Careers at SN Enviro"
                                className="w-full h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-emerald-900/30"></div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Careers;
