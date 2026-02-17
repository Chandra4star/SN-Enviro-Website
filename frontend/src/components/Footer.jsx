import React from 'react';
import { motion } from 'framer-motion';
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
        <footer className={`relative overflow-hidden pt-12 md:pt-24 pb-8 md:pb-12 transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-900 text-white'}`}>

            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <img
                    src="/assets/Gemini_Generated_Image_srgh2jsrgh2jsrgh.png"
                    alt="Footer Background"
                    className="w-full h-full object-cover filter grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
            </div>

            <motion.div
                className="container mx-auto px-6 relative z-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={footerVariants}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
                    {/* Brand Section */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <div className="flex flex-col">
                            <h2 className="text-3xl font-black tracking-tighter leading-none text-white">SN ENVIRO</h2>
                            <span className="text-emerald-500 text-xs font-bold uppercase tracking-[0.3em] mt-1">Solutions Pvt. Ltd.</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                            Pioneering environmental intelligence through advanced monitoring systems and nationwide engineering expertise since 2017.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Linkedin, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:-translate-y-1">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-bold mb-8 text-white">Company</h3>
                        <ul className="space-y-4">
                            {['Home', 'About Us', 'Services', 'Products', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase().replace(' ', '')}`} className="text-slate-400 hover:text-emerald-500 text-sm flex items-center gap-2 group transition-colors no-underline w-fit">
                                        <ArrowUpRight size={14} className="text-emerald-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Solutions */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-bold mb-8 text-white">Solutions</h3>
                        <ul className="space-y-4">
                            {['CAAQMS (Air)', 'CEMS (Stack)', 'EQMS (Effluent)', 'WMS (Weather)', 'IIoT Data Loggers'].map((item) => (
                                <li key={item} className="text-slate-400 text-sm hover:text-white transition-colors cursor-pointer">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-bold mb-8 text-white">Contact</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 text-slate-400">
                                <MapPin size={20} className="text-emerald-500 shrink-0 mt-1" />
                                <p className="text-sm">6-1-279, Plot no.10, Mantri Mansion, Hyderabad - 500020</p>
                            </div>
                            <div className="flex items-center gap-4 text-slate-400">
                                <Phone size={20} className="text-emerald-500 shrink-0" />
                                <p className="text-sm font-bold text-white">+91 73309 33306</p>
                            </div>
                            <div className="flex items-center gap-4 text-slate-400">
                                <Mail size={20} className="text-emerald-500 shrink-0" />
                                <p className="text-sm">mail@snenviro.com</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    variants={itemVariants}
                    className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-xs text-slate-500">
                        © 2024 SN Enviro Solutions. All Rights Reserved.
                    </p>
                    <div className="flex gap-8">
                        <a href="#" className="text-xs text-slate-500 hover:text-emerald-500 transition-colors no-underline">Privacy Policy</a>
                        <a href="#" className="text-xs text-slate-500 hover:text-emerald-500 transition-colors no-underline">Terms of Service</a>
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
};

export default Footer;
