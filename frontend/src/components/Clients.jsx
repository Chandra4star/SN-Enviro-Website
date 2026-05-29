import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Clients = ({ isDarkMode }) => {
    const [clients, setClients] = useState([]);
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const defaultClients = [
            { name: "Ultratech", logoUrl: "/assets/logos/ultratech.png" },
            { name: "Grasim Industries", logoUrl: "/assets/logos/grasim.png" },
            { name: "Godavari Power", logoUrl: "/assets/logos/godavari.png" },
            { name: "Star Cement", logoUrl: "/assets/logos/star.png" },
            { name: "Adani Mines", logoUrl: "/assets/logos/adani.png" },
            { name: "Vedanta (Balco)", logoUrl: "/assets/logos/vedanta.png" },
            { name: "Cipla", logoUrl: "/assets/logos/cipla.png" },
            { name: "Saint Gobain", logoUrl: "/assets/logos/saint.png" },
            { name: "Nuvoco Group", logoUrl: "/assets/logos/nuvoco.png" },
            { name: "Sree Cements", logoUrl: "/assets/logos/sree.png" }
        ];

        // Bypassing backend fetch due to DB inconsistencies
        setClients(defaultClients);

        setTestimonials([
            { name: "John Doe", role: "Plant Manager", content: "SN Enviro's CEMS solutions transformed our compliance workflow. Highly recommended." },
            { name: "Sarah Smith", role: "Environmental Officer", content: "The CAAQMS installation was seamless, and the data accuracy is outstanding." }
        ]);
    }, []);

    // Duplicate clients for seamless loop
    const duplicatedClients = [...clients, ...clients, ...clients];

    return (
        <section id="clients" className={`py-12 md:py-20 lg:py-32 transition-colors duration-500 overflow-hidden ${isDarkMode ? 'bg-slate-900' : 'bg-[#f0f2f5]'}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-10 md:mb-16">
                    <span className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Trusted by Leaders</span>
                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Our Global <span className="text-emerald-500">Clients</span>
                    </h2>
                    <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Delivering excellence to 300+ project sites across India's most reputed industrial corporations.
                    </p>
                </div>

                {/* Infinite Loop Slider */}
                <div className="relative w-full overflow-hidden mask-gradient-to-r from-transparent via-black to-transparent mb-24">
                    <motion.div
                        className="flex items-center gap-12 w-max"
                        animate={{ x: ["0%", "-33.33%"] }}
                        transition={{
                            repeat: Infinity,
                            ease: "linear",
                            duration: 20
                        }}
                    >
                        {duplicatedClients.map((client, index) => (
                            <div
                                key={index}
                                className={`flex flex-col items-center justify-center p-6 w-48 h-40 rounded-2xl grayscale hover:grayscale-0 transition-all duration-500 border shrink-0 gap-4 ${isDarkMode ? 'bg-slate-800/30 border-slate-700' : 'bg-white/50 border-slate-100 hover:shadow-xl'}`}
                            >
                                <img src={client.logoUrl?.startsWith('uploads/') ? `http://localhost:5000/${client.logoUrl}` : client.logoUrl} alt={client.name} className="max-w-full h-16 object-contain opacity-70 hover:opacity-100 transition-opacity drop-shadow-md" />
                                <span className={`text-center font-bold tracking-wide text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{client.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Testimonials */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`relative p-10 rounded-[3rem] border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-xl'}`}
                        >
                            <Quote className="text-emerald-500/20 absolute top-10 right-10 w-20 h-20" />
                            <p className={`text-lg italic leading-relaxed mb-8 relative z-10 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                "{t.content}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold overflow-hidden">
                                    {t.avatarUrl ? (
                                        <img src={t.avatarUrl?.startsWith('uploads/') ? `http://localhost:5000/${t.avatarUrl}` : t.avatarUrl} alt={t.name} className="w-full h-full object-cover" />
                                    ) : (
                                        t.name[0]
                                    )}
                                </div>
                                <div>
                                    <h5 className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.name}</h5>
                                    <p className="text-xs text-emerald-500 font-bold uppercase tracking-wider">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Clients;
