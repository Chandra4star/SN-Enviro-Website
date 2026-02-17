import React from 'react';
import { motion } from 'framer-motion';
import { Target, Factory, ShieldCheck } from 'lucide-react';

const ProductOverview = ({ isDarkMode }) => {
    const categories = [
        {
            title: "How They Are Used",
            icon: Target,
            points: [
                "Real-time stack emission monitoring",
                "Ambient air quality analysis in cities",
                "Effluent treatment plant efficiency",
                "Hazardous gas zone detection"
            ]
        },
        {
            title: "Industries Served",
            icon: Factory,
            points: [
                "Power Plants & Steel Mills",
                "Chemical & Refineries",
                "Municipal Sewage Treatment",
                "Pharmaceutical & Labs"
            ]
        },
        {
            title: "Compliance Benefits",
            icon: ShieldCheck,
            points: [
                "CPCB/SPCB regulatory norms",
                "Automated reporting systems",
                "Avoiding penalties via detection",
                "Sustainability audit support"
            ]
        }
    ];

    return (
        <section className={`py-20 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className={`rounded-[3rem] overflow-hidden p-8 md:p-16 border shadow-2xl ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}
                >
                    <div className="text-center mb-16">
                        <span className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Ecosystem</span>
                        <h2 className={`text-4xl md:text-5xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            Product <span className="text-emerald-500">Intelligence</span>
                        </h2>
                        <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Empowering industries with data-driven environmental compliance.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                        {categories.map((cat, i) => {
                            const Icon = cat.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="relative"
                                >
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                            <Icon size={24} />
                                        </div>
                                        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{cat.title}</h3>
                                    </div>

                                    <ul className="space-y-4">
                                        {cat.points.map((point, pi) => (
                                            <li key={pi} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                                                <span className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProductOverview;
