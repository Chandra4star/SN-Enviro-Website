import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Twitter, ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';

const Footer = ({ isDarkMode }) => {
    const footerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <footer className={`relative overflow-hidden pt-8 md:pt-16 pb-6 md:pb-8 transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-900 text-white'}`}>

            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <img
                    src="https://images.pexels.com/photos/12699770/pexels-photo-12699770.jpeg"
                    alt="Footer Background"
                    className="w-full h-full object-cover opacity-80 blur-[3px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-950/30"></div>
            </div>

            <motion.div
                className="container mx-auto px-6 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={footerVariants}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-10">
                    {/* Brand Section */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <div className="flex flex-col drop-shadow-xl">
                            <h2 className="text-3xl font-black tracking-tighter leading-none text-white">SN ENVIRO</h2>
                            <span className="text-emerald-400 text-xs font-bold uppercase tracking-[0.3em] mt-1">Solutions Pvt. Ltd.</span>
                        </div>
                        <p className="text-slate-100 font-medium text-sm leading-relaxed max-w-xs drop-shadow-md">
                            Pioneering environmental intelligence through advanced monitoring systems and nationwide engineering expertise since 2017.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Linkedin, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-900/80 text-slate-200 border border-slate-700 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg backdrop-blur-sm">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-bold mb-5 text-white drop-shadow-md">Company</h3>
                        <ul className="space-y-3">
                            {['Home', 'About Us', 'Services', 'Products', 'Blog', 'Contact'].map((item) => {
                                const sectionId = item === 'Home' ? '' : item === 'About Us' ? 'about' : item.toLowerCase();
                                return (
                                    <li key={item}>
                                        <Link to={`/#${sectionId}`} className="text-slate-200 font-medium hover:text-emerald-400 text-sm flex items-center gap-2 group transition-colors no-underline w-fit drop-shadow-md">
                                            <ArrowUpRight size={14} className="text-emerald-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                            {item}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </motion.div>

                    {/* Solutions */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-bold mb-5 text-white drop-shadow-md">Solutions</h3>
                        <ul className="space-y-3">
                            {['CAAQMS (Air)', 'CEMS (Stack)', 'EQMS (Effluent)', 'WMS (Weather)', 'IIoT Data Loggers'].map((item) => (
                                <li key={item}>
                                    <Link to="/#products" className="text-slate-200 font-medium text-sm hover:text-emerald-400 transition-colors flex items-center gap-2 group w-fit no-underline drop-shadow-md">
                                        <ArrowUpRight size={14} className="text-emerald-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-bold mb-5 text-white drop-shadow-md">Contact</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 text-slate-100 drop-shadow-md font-medium">
                                <MapPin size={20} className="text-emerald-400 shrink-0 mt-1" />
                                <p className="text-sm">6-1-279, Plot no.10, Mantri Mansion, Hyderabad - 500020</p>
                            </div>
                            <div className="flex items-center gap-4 text-slate-100 drop-shadow-md">
                                <Phone size={20} className="text-emerald-400 shrink-0" />
                                <p className="text-sm font-bold text-white">+91 73309 33306</p>
                            </div>
                            <div className="flex items-center gap-4 text-slate-100 drop-shadow-md font-medium">
                                <Mail size={20} className="text-emerald-400 shrink-0" />
                                <p className="text-sm">mail@snenviro.com</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    variants={itemVariants}
                    className="pt-6 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-xs text-slate-300 drop-shadow-md font-medium">
                        © 2024 SN Enviro Solutions. All Rights Reserved.
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-xs text-slate-300 font-medium hover:text-emerald-400 drop-shadow-md transition-colors no-underline">Privacy Policy</a>
                        <a href="#" className="text-xs text-slate-300 font-medium hover:text-emerald-400 drop-shadow-md transition-colors no-underline">Terms of Service</a>
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
};

export default Footer;
