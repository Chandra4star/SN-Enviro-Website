import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Products = ({ isDarkMode }) => {
    const [products, setProducts] = useState([]);

    const defaultProductList = [
        {
            _id: "698da53e5bff466e7fbecc3b",
            title: "Continuous Ambient Air Quality Monitoring Stations (CAAQMS)",
            category: "Ambient Monitoring",
            desc: "Complete self-contained stations for precise urban air quality management.",
            details: "Monitors SO2, NOx, CO, Ozone, PM10, and PM2.5 with reference method analyzers.",
            imageUrl: "/assets/model_2030.png"
        },
        {
            _id: "698da53e5bff466e7fbecc39",
            title: "Continuous Emission Monitoring Systems (CEMS)",
            category: "Emission Monitoring",
            desc: "Regulatory compliance solutions for industrial stack emissions.",
            details: "Measures SO2, NOx, CO, CO2, and O2 using UV-DOAS or NDIR technologies.",
            imageUrl: "/assets/scs_900uv.png"
        },
        {
            _id: "698da53e5bff466e7fbecc40",
            title: "Effluent Quality Monitoring Systems (EQMS)",
            category: "Water Quality",
            desc: "Real-time water quality analysis for industrial discharge compliance.",
            details: "Continuous monitoring of pH, COD, BOD, TSS, and Flow parameters.",
            imageUrl: "/assets/model_1080.png"
        },
        {
            _id: "698da53e5bff466e7fbecc41",
            title: "Weather Monitoring Systems (WMS)",
            category: "Meteorology",
            desc: "High-precision meteorological sensors for environmental data analysis.",
            details: "Tracks Wind Speed, Direction, Temperature, Humidity, Rainfall, and Solar Radiation.",
            imageUrl: "/assets/Gemini_Generated_Image_srgh2jsrgh2jsrgh.png"
        },
        {
            _id: "698da53e5bff466e7fbecc42",
            title: "Smart City Environmental Monitoring Solutions",
            category: "Urban IoT",
            desc: "Compact, low-cost sensor networks for hyper-local pollution mapping.",
            details: "IoT-enabled nodes for real-time air quality visualization across smart cities.",
            imageUrl: "/assets/Gemini_Generated_Image_jfecovjfecovjfec.png"
        },
        {
            _id: "698da53e5bff466e7fbecc38",
            title: "IIoT-based Data Loggers & Remote Calibration Units",
            category: "Data Acquisition",
            desc: "Cloud-connected telemetry for remote system health and data integrity.",
            details: "Secure data transmission to central authorities with remote diagnostic capabilities.",
            imageUrl: "/assets/scs_900c.png"
        }
    ];

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    setProducts(data);
                } else {
                    setProducts(defaultProductList);
                }
            })
            .catch((err) => {
                console.log(err);
                setProducts(defaultProductList);
            });
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="products" className={`py-12 md:py-20 lg:py-32 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-white border-t border-slate-100'}`}>
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 md:mb-16"
                >
                    <span className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Our Portfolio</span>
                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Advanced <span className="text-emerald-500">Instrumentation</span>
                    </h2>
                    <p className={`max-w-2xl ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Cutting-edge hardware and software for critical environmental intelligence.</p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id || index}
                            variants={itemVariants}
                            whileHover={{ y: -10 }}
                            className={`group rounded-[2rem] overflow-hidden border transition-all duration-300 ${isDarkMode ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800' : 'bg-white border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50'}`}
                        >
                            <Link to={`/product/${product._id}`} className="block h-full">
                                <div className={`relative h-64 overflow-hidden flex items-center justify-center p-6 ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                                    <img
                                        src={product.imageUrl || product.img}
                                        alt={product.title || product.name}
                                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/400?text=Product+Image';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-emerald-500"></div>
                                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                                        <span className="text-white text-xs font-bold uppercase tracking-widest bg-emerald-500 px-4 py-2 rounded-full shadow-lg">View Details</span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <h3 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{product.title || product.name}</h3>
                                    <p className={`text-sm leading-relaxed line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{product.desc}</p>
                                    <div className="mt-6 flex items-center text-emerald-500 text-xs font-bold uppercase tracking-[0.2em] group">
                                        Learn More <ArrowRight size={14} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Products;
