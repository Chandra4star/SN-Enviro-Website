import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

const Blog = ({ isDarkMode }) => {
    const posts = [
        {
            title: "How IIoT is Transforming Environmental Compliance in India",
            category: "IIOT",
            date: "Feb 10, 2024",
            img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
            url: "https://www.google.com/search?q=How+IIoT+is+Transforming+Environmental+Compliance+in+India"
        },
        {
            title: "CAAQMS: A Critical Tool for Smart Cities",
            category: "Urban Planning",
            date: "Jan 25, 2024",
            img: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=800",
            url: "https://www.google.com/search?q=CAAQMS+Smart+Cities"
        },
        {
            title: "CPCB Guidelines 2025 – What Industries Must Know",
            category: "Compliance",
            date: "Jan 12, 2024",
            img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
            url: "https://www.google.com/search?q=CPCB+Guidelines+2025"
        }
    ];

    return (
        <section id="blog" className={`py-20 lg:py-32 transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 border-t border-slate-800' : 'bg-[#f8f9fa] border-t border-slate-100'}`}>
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Knowledge Hub</span>
                    <h2 className={`text-4xl md:text-5xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Latest <span className="text-emerald-500">News & Insights</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <motion.article
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={`group cursor-pointer rounded-[2.5rem] overflow-hidden border transition-all duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100 hover:shadow-2xl'}`}
                        >
                            <div className="relative h-60 overflow-hidden">
                                <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute top-6 left-6 px-4 py-2 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-2 text-slate-400 text-xs mb-4">
                                    <Calendar size={14} /> {post.date}
                                </div>
                                <h3 className={`text-xl font-bold mb-6 leading-tight group-hover:text-emerald-500 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                    {post.title}
                                </h3>
                                <a
                                    href={post.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-emerald-500 text-xs font-bold uppercase tracking-widest no-underline hover:text-emerald-600"
                                >
                                    Read Article <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform" />
                                </a>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
