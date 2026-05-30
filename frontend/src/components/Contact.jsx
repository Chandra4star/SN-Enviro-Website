import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, Send, CheckCircle, X } from 'lucide-react';

const Contact = ({ isDarkMode }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [settings, setSettings] = useState({});

    React.useEffect(() => {
        setSettings({});
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="contact" className={`relative py-12 md:py-20 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
            {/* Success Popup */}
            <AnimatePresence>
                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.5, y: 100, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.5, y: 100, opacity: 0 }}
                            className={`relative w-full max-w-sm p-10 rounded-[3rem] shadow-2xl text-center border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}
                        >
                            <button
                                onClick={() => setStatus('idle')}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                            >
                                <X size={20} className={isDarkMode ? 'text-slate-400' : 'text-slate-500'} />
                            </button>

                            <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-emerald-500/20 rotate-12">
                                <CheckCircle size={40} />
                            </div>

                            <h3 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Success!</h3>
                            <p className={`mb-8 font-medium leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                Thanks for reaching out! We will be in touch shortly. Please check your email for a confirmation.
                            </p>

                            <button
                                onClick={() => setStatus('idle')}
                                className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
                            >
                                Got it
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8 md:mb-12"
                >
                    <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-3 block">Get In touch</span>
                    <h2 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Contact <span className="text-emerald-500">Us</span>
                    </h2>
                    <p className={`max-w-xl mx-auto text-sm md:text-base ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Have a project in mind or need technical support? Our experts are ready to assist you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1 space-y-4"
                    >
                        <div className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 h-full ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-lg shadow-slate-200/40'}`}>
                            <h3 className={`text-lg font-bold mb-5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Office Info</h3>

                            <div className="space-y-5">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <h4 className={`text-sm font-bold mb-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Address</h4>
                                        <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                            {settings.contact_address || '6-1-279, Plot no.10, Mantri Mansion, Walker Town, Padmarao Nagar, Hyderabad, Telangana 500020'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <h4 className={`text-sm font-bold mb-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Phone</h4>
                                        <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{settings.contact_phone || '+91 73309 33306'}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <h4 className={`text-sm font-bold mb-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Email</h4>
                                        <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{settings.contact_email || 'mail.snenviro@gmail.com'}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                        <Clock size={18} />
                                    </div>
                                    <div>
                                        <h4 className={`text-sm font-bold mb-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Working Hours</h4>
                                        <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Mon - Sat: 9:00 AM - 7:00 PM</p>
                                        <p className="text-[10px] text-emerald-500 font-bold mt-0.5 uppercase tracking-wide">Support available 24/7</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2"
                    >
                        <div className={`p-5 md:p-6 rounded-2xl border transition-all duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-lg shadow-slate-200/40'}`}>
                            <h3 className={`text-lg font-bold mb-5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Send a Message</h3>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className={`w-full px-4 py-2.5 text-sm rounded-xl border outline-none transition-all focus:ring-2 focus:ring-emerald-500/50 ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className={`w-full px-4 py-2.5 text-sm rounded-xl border outline-none transition-all focus:ring-2 focus:ring-emerald-500/50 ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-1">
                                    <label className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Inquiry about CAAQMS"
                                        className={`w-full px-4 py-2.5 text-sm rounded-xl border outline-none transition-all focus:ring-2 focus:ring-emerald-500/50 ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-1">
                                    <label className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your requirements..."
                                        rows="4"
                                        className={`w-full px-4 py-2.5 text-sm rounded-xl border outline-none transition-all focus:ring-2 focus:ring-emerald-500/50 resize-none ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                                        required
                                    ></textarea>
                                </div>
                                <div className="md:col-span-2 pt-2">
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full px-6 py-2.5 text-sm bg-emerald-500 text-white rounded-xl font-bold uppercase tracking-wider hover:bg-emerald-600 transition-all shadow-md shadow-emerald-500/30 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70"
                                    >
                                        {status === 'loading' ? (
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <Send size={16} />
                                        )}
                                        {status === 'loading' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                                {status === 'error' && (
                                    <div className="md:col-span-2 p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-center font-bold">
                                        Something went wrong. Please try again later.
                                    </div>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
