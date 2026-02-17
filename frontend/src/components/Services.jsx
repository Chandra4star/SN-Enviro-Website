import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Droplets, FlaskConical, FileCheck, Headset, HardHat, Cpu, ChevronRight, ChevronDown } from 'lucide-react';

const Services = ({ isDarkMode }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);


    const defaultServices = [
        {
            title: "After Sales Support",
            desc: "Dedicated team ensuring uninterrupted operations of all installed systems.",
            details: "Our commitment doesn't end with installation. We provide continuous technical support, troubleshooting, and field assistance to ensure your monitoring systems stay compliant and operational 24/7.",
            icon: Headset
        },
        {
            title: "Installation & Commissioning",
            desc: "Expert end-to-end setup and stabilization of complex monitoring stations.",
            details: "From site survey to final handover, our trained experts handle the complete installation and commissioning process, ensuring that systems are calibrated and integrated with regulatory servers.",
            icon: HardHat
        },
        {
            title: "AMC & CMC",
            desc: "Reliable maintenance contracts tailored to your industrial requirements.",
            details: "We offer Annual Maintenance Contracts (AMC) and Comprehensive Maintenance Contracts (CMC) that include preventive maintenance, spare parts management, and emergency repair services to minimize downtime.",
            icon: FileCheck
        },
        {
            title: "Operation & Maintenance",
            desc: "Full-service management for long-term environmental compliance.",
            details: "Our O&M services provide on-site manpower and expert management to run monitoring stations, ensuring high data availability and strict adherence to CPCB/SPCB norms.",
            icon: Cpu
        },
        {
            title: "Remote Calibration",
            desc: "Advanced digital calibration support for precision and convenience.",
            details: "Utilizing our proprietary IIoT solutions, we support remote calibration of analyzers, reducing the need for site visits and ensuring constant accuracy of recorded data.",
            icon: Wind
        },
        {
            title: "Data Services",
            desc: "Cloud-based environmental data management and reporting.",
            details: "We provide secure cloud platforms for storing and analyzing environmental data, with automated reporting features for seamless submission to regulatory authorities.",
            icon: Droplets
        }
    ];



    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <section id="services" className={`py-12 md:py-20 lg:py-32 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-slate-50 border-t border-slate-100'}`}>
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-16"
                >
                    <span className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Services</span>
                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Support & <span className="text-emerald-500">Maintenance</span>
                    </h2>
                    <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>Comprehensive engineering support ensuring your environmental compliance 24/7.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {defaultServices.map((service, index) => {
                        const Icon = service.icon;
                        const isExpanded = expandedIndex === index;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-8 rounded-[2.5rem] border transition-all duration-300 transform ${isExpanded ? 'h-auto' : 'h-full'} ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:border-emerald-500/50' : 'bg-white border-slate-100 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/50'}`}
                            >
                                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-8">
                                    <Icon size={30} />
                                </div>
                                <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{service.title}</h3>
                                <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{service.desc}</p>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <p className={`text-sm py-4 border-t ${isDarkMode ? 'text-slate-300 border-slate-700' : 'text-slate-500 border-slate-100'}`}>
                                                {service.details}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    onClick={() => toggleExpand(index)}
                                    className={`mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${isDarkMode ? 'text-slate-400 hover:text-emerald-500' : 'text-emerald-600 hover:text-emerald-700'}`}
                                >
                                    {isExpanded ? (
                                        <>Show Less <ChevronDown size={16} /></>
                                    ) : (
                                        <>Read More <ChevronRight size={16} /></>
                                    )}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
