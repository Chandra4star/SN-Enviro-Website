import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

const About = ({ isDarkMode }) => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        setSettings({});
    }, []);

    const aboutText = settings?.about_text || "Founded in January 2017 by a team of seasoned technocrats with over **100 years of combined experience**, SN Enviro Solutions has become a trusted name in online environmental monitoring solutions.";
    const aboutImage = settings?.about_image 
        ? (settings.about_image.startsWith('http') ? settings.about_image : `http://localhost:5000/${settings.about_image}`)
        : "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=2070";

    return (
        <section id="about" className={`py-12 md:py-20 lg:py-32 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative group"
                    >
                        <div className="absolute -inset-4 bg-emerald-500/10 rounded-3xl blur-2xl group-hover:bg-emerald-500/20 transition-all duration-500"></div>
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/10 grayscale hover:grayscale-0 transition-all duration-700">
                            <img
                                src={aboutImage}
                                alt="Environmental Monitoring Team"
                                className="w-full h-[350px] md:h-[500px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        {/* Stats Floating box */}
                        <div className={`absolute -bottom-8 -right-8 p-8 rounded-2xl shadow-2xl hidden md:block border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-4xl font-extrabold text-emerald-500"><AnimatedCounter from={0} to={300} duration={2.5} />+</span>
                                <span className={`text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Projects <br /> Executed</span>
                            </div>
                            <div className="h-1 w-full bg-emerald-500/20 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '100%' }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className="h-full bg-emerald-500"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-8"
                        >
                            <span className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">About SN Enviro</span>
                            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                Engineering a <span className="text-emerald-500">Sustainable</span> Future
                            </h2>
                            <p className={`text-lg mb-6 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`} dangerouslySetInnerHTML={{ __html: aboutText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />

                            <div className="space-y-6 mb-8">
                                <div>
                                    <h4 className="text-emerald-500 font-bold uppercase tracking-wider text-sm mb-2">Our Mission</h4>
                                    <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                        To enable industries, cities, and governments to achieve strict environmental compliance through advanced monitoring technologies.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-emerald-500 font-bold uppercase tracking-wider text-sm mb-2">Our Vision</h4>
                                    <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                        To be the most reliable partner for industries across the globe in creating a cleaner, safer, and sustainable environment.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className={`p-6 rounded-2xl transition-all duration-300 border ${isDarkMode ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-xl'}`}>
                                <h4 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}><AnimatedCounter from={0} to={100} duration={2.5} />+ Years</h4>
                                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Combined team experience in environmental technocracy.</p>
                            </div>
                            <div className={`p-6 rounded-2xl transition-all duration-300 border ${isDarkMode ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800' : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-xl'}`}>
                                <h4 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>High Tech</h4>
                                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Integrating IIoT and remote calibration for precision.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
