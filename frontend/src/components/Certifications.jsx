import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, BadgeCheck } from 'lucide-react';

const Certifications = ({ isDarkMode }) => {
    const certs = [
        { title: "USEPA Certified", desc: "Our analyzers comply with United States Environmental Protection Agency standards.", icon: ShieldCheck },
        { title: "MCERTS Certified", desc: "Compliance with SIRA's MCERTS performance standards for continuous monitoring.", icon: Award },
        { title: "TUV Certified", desc: "Certified for performance and safety by the Technical Inspection Association.", icon: BadgeCheck },
        { title: "CPCB Compliant", desc: "Fully integrated solutions meeting Central Pollution Control Board guidelines.", icon: ShieldCheck }
    ];

    return (
        <section id="certifications" className={`py-20 lg:py-32 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-white border-t border-slate-100'}`}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="lg:w-1/3 text-left">
                        <span className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Quality Assurance</span>
                        <h2 className={`text-4xl font-extrabold mb-6 leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            Global Compliance <br />
                            <span className="text-emerald-500">Standards</span>
                        </h2>
                        <p className={`text-lg mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            We partner with world-class technology providers to ensure every system we deliver meets the most stringent international certifications including USEPA, MCERTS, and TUV.
                        </p>
                    </div>

                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {certs.map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-8 rounded-3xl border transition-all duration-300 ${isDarkMode ? 'bg-slate-800/50 border-slate-700 hover:bg-emerald-500/5' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-xl'}`}
                            >
                                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 mb-6">
                                    <cert.icon size={24} />
                                </div>
                                <h4 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{cert.title}</h4>
                                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{cert.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certifications;
