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
        const fetchSettings = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/settings');
                const data = await response.json();
                setSettings(data);
            } catch (error) {
                console.error("Failed to fetch settings:", error);
            }
        };
        fetchSettings();
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

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-16"
                >
                    <span className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Get In touch</span>
                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Contact <span className="text-emerald-500">Us</span>
                    </h2>
                    <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Have a project in mind or need technical support? Our experts are ready to assist you with environmental compliance solutions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1 space-y-6"
                    >
                        <div className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 h-full ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'}`}>
                            <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Office Info</h3>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Address</h4>
                                        <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                            {settings.contact_address || '6-1-279, Plot no.10, Mantri Mansion, Walker Town, Padmarao Nagar, Hyderabad, Telangana 500020'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Phone</h4>
                                        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{settings.contact_phone || '+91 73309 33306'}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Email</h4>
                                        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{settings.contact_email || 'mail@snenviro.com'}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h4 className={`font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Working Hours</h4>
                                        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Mon - Sat: 9:00 AM - 7:00 PM</p>
                                        <p className="text-xs text-emerald-500 font-bold mt-1 uppercase tracking-tighter">Support available 24/7</p>
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
                        <div className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'}`}>
                            <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Send a Message</h3>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className={`w-full px-6 py-4 rounded-2xl border outline-none transition-all focus:ring-2 focus:ring-emerald-500/50 ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        className={`w-full px-6 py-4 rounded-2xl border outline-none transition-all focus:ring-2 focus:ring-emerald-500/50 ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Inquiry about CAAQMS"
                                        className={`w-full px-6 py-4 rounded-2xl border outline-none transition-all focus:ring-2 focus:ring-emerald-500/50 ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your requirements..."
                                        rows="6"
                                        className={`w-full px-6 py-4 rounded-2xl border outline-none transition-all focus:ring-2 focus:ring-emerald-500/50 resize-none ${isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                                        required
                                    ></textarea>
                                </div>
                                <div className="md:col-span-2 pt-4">
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="w-full px-8 py-3 bg-emerald-500 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70"
                                    >
                                        {status === 'loading' ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        ) : (
                                            <Send size={20} />
                                        )}
                                        {status === 'loading' ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                                {status === 'error' && (
                                    <div className="md:col-span-2 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-center font-bold">
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
