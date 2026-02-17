import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Maximize2, ArrowUpRight, Cpu, ShieldCheck, Activity, BarChart } from 'lucide-react';

// Fallback products (initial state)
// Core Portfolio Categories based on SN Enviro solutions
const initialProducts = [
    {
        id: "698da53e5bff466e7fbecc37",
        title: "Continuous Ambient Air Quality Monitoring Stations (CAAQMS)",
        category: "Ambient Monitoring",
        desc: "Complete self-contained stations for precise urban air quality management.",
        detail: "Monitors SO2, NOx, CO, Ozone, PM10, and PM2.5 with reference method analyzers.",
        imageUrl: "/assets/model_2030.png",
        icon: "Activity"
    },
    {
        id: "698da53e5bff466e7fbecc39",
        title: "Continuous Emission Monitoring Systems (CEMS)",
        category: "Emission Monitoring",
        desc: "Regulatory compliance solutions for industrial stack emissions.",
        detail: "Measures SO2, NOx, CO, CO2, and O2 using UV-DOAS or NDIR technologies.",
        imageUrl: "/assets/scs_900uv.png",
        icon: "BarChart"
    },
    {
        id: "698da53e5bff466e7fbecc40",
        title: "Effluent Quality Monitoring Systems (EQMS)",
        category: "Water Quality",
        desc: "Real-time water quality analysis for industrial discharge compliance.",
        detail: "Continuous monitoring of pH, COD, BOD, TSS, and Flow parameters.",
        imageUrl: "/assets/model_1080.png",
        icon: "Activity"
    },
    {
        id: "698da53e5bff466e7fbecc41",
        title: "Weather Monitoring Systems (WMS)",
        category: "Meteorology",
        desc: "High-precision meteorological sensors for environmental data analysis.",
        detail: "Tracks Wind Speed, Direction, Temperature, Humidity, Rainfall, and Solar Radiation.",
        imageUrl: "/assets/Gemini_Generated_Image_srgh2jsrgh2jsrgh.png",
        icon: "Maximize2"
    },
    {
        id: "698da53e5bff466e7fbecc42",
        title: "Smart City Environmental Monitoring Solutions",
        category: "Urban IoT",
        desc: "Compact, low-cost sensor networks for hyper-local pollution mapping.",
        detail: "IoT-enabled nodes for real-time air quality visualization across smart cities.",
        imageUrl: "/assets/Gemini_Generated_Image_jfecovjfecovjfec.png",
        icon: "Cpu"
    },
    {
        id: "698da53e5bff466e7fbecc38",
        title: "IIoT-based Data Loggers & Remote Calibration Units",
        category: "Data Acquisition",
        desc: "Cloud-connected telemetry for remote system health and data integrity.",
        detail: "Secure data transmission to central authorities with remote diagnostic capabilities.",
        imageUrl: "/assets/scs_900c.png",
        icon: "ShieldCheck"
    }
];

const ProductPortfolio = ({ isDarkMode }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                if (data && data.length > 0) {
                    setProducts(data);
                } else {
                    setProducts(initialProducts);
                }
            } catch (err) {
                // console.error('Error fetching products:', err);
                setProducts(initialProducts);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const getIcon = (iconName) => {
        switch (iconName) {
            case 'Cpu': return <Cpu size={16} />;
            case 'ShieldCheck': return <ShieldCheck size={16} />;
            case 'Maximize2': return <Maximize2 size={16} />;
            case 'Activity': return <Activity size={16} />;
            case 'BarChart': return <BarChart size={16} />;
            default: return <Maximize2 size={16} />;
        }
    };

    const [expandedProduct, setExpandedProduct] = useState(null);

    return (
        <section id="solutions" className={`py-12 md:py-24 lg:py-32 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900' : 'bg-[#f8f9fa]'}`}>
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
                    <span className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Portfolio</span>
                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black mb-6 tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Technically Superior <span className="text-emerald-500">Systems</span>
                    </h2>
                    <p className={`text-lg leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Precision monitoring and engineering services for diverse industrial needs.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id || product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative rounded-[2.5rem] overflow-hidden border transition-all duration-500 cursor-pointer ${isDarkMode
                                ? 'bg-slate-800 border-slate-700'
                                : 'bg-white border-slate-200 hover:shadow-2xl hover:shadow-emerald-500/10'
                                } ${expandedProduct === product.id ? ' ring-2 ring-emerald-500' : ''}`}
                            onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                        >
                            {/* Image Container */}
                            <div className="relative aspect-square w-full p-10 flex items-center justify-center transition-all duration-700 bg-white/50 dark:bg-slate-900/20 group-hover:scale-105">
                                <img
                                    src={product.imageUrl || product.image || "/assets/logo.png"}
                                    alt={product.title}
                                    className="max-h-full max-w-full object-contain filter transition-all duration-700 hover:scale-110"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/400?text=Product+Image';
                                    }}
                                />
                                <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-all duration-500"></div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-emerald-500 text-[10px] font-extrabold uppercase tracking-widest block mb-1">
                                            {product.category}
                                        </span>
                                        <h3 className={`text-xl font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                            {product.title}
                                        </h3>
                                    </div>
                                    <div className={`w-10 h-10 rounded-full border border-emerald-500 flex items-center justify-center text-emerald-500 transition-all ${expandedProduct === product.id ? 'bg-emerald-500 text-white rotate-45' : ''}`}>
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>
                                <p className={`text-sm leading-relaxed mb-6 transition-all duration-500 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'} ${expandedProduct === product.id ? 'opacity-0 h-0 hidden' : 'opacity-100'}`}>
                                    {product.desc || product.detail}
                                </p>

                                {/* Expanded Detail */}
                                <motion.div
                                    initial={false}
                                    animate={{ height: expandedProduct === product.id ? 'auto' : 0, opacity: expandedProduct === product.id ? 1 : 0 }}
                                    className="overflow-hidden"
                                >
                                    <p className={`text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>
                                        {product.detail}
                                    </p>
                                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                                        <Link
                                            to={`/product/${product._id || product.id}`}
                                            className="w-full block text-center py-3 bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 no-underline"
                                        >
                                            Know about {product.title}
                                        </Link>
                                    </div>
                                </motion.div>

                                {!expandedProduct && (
                                    <button className="w-full py-3 bg-emerald-500/10 text-emerald-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-colors">
                                        View Details
                                    </button>
                                )}
                            </div>

                            {/* Corner Icon */}
                            <div className="absolute top-6 right-6 p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-400 opacity-50 group-hover:opacity-100 transition-opacity">
                                {getIcon(product.icon)}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stats Footer */}
                <div className="mt-20 flex flex-wrap justify-center gap-12">
                    <div className="text-center">
                        <p className={`text-4xl font-black text-emerald-500 mb-1`}>300+</p>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Projects Done</p>
                    </div>
                    <div className="text-center">
                        <p className={`text-4xl font-black text-emerald-500 mb-1`}>100+</p>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Years Experience</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductPortfolio;
