import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Mail, Image as ImageIcon, Briefcase, Star } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = ({ isDarkMode }) => {
    const [stats, setStats] = useState({
        products: 0,
        partners: 0,
        testimonials: 0,
        gallery: 0
    });

    useEffect(() => {
        // Mock fetching stats for now, later we'll fetch from backend
        // This is to replicate the UI immediately
        setStats({
            products: 8,
            partners: 10,
            testimonials: 4,
            gallery: 2
        });
    }, []);

    const statCards = [
        { title: 'Total Products', value: stats.products, icon: Briefcase, color: 'bg-[#5f41e4]', textColor: 'text-white' },
        { title: 'Active Partners', value: stats.partners, icon: BookOpen, color: 'bg-[#5a8bf7]', textColor: 'text-white' },
        { title: 'Testimonials', value: stats.testimonials, icon: Mail, color: 'bg-[#73c896]', textColor: 'text-white' },
        { title: 'Gallery Images', value: stats.gallery, icon: ImageIcon, color: 'bg-[#f7b751]', textColor: 'text-white' },
    ];

    return (
        <div className="space-y-6">
            {/* Stat Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, idx) => (
                    <div key={idx} className={`${card.color} ${card.textColor} p-6 rounded-2xl shadow-sm relative overflow-hidden`}>
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-sm font-medium opacity-90 mb-1">{card.title}</p>
                                <h3 className="text-4xl font-bold flex items-center gap-2">
                                    {card.value}
                                    <span className="text-sm opacity-50 cursor-pointer hover:opacity-100">✏️</span>
                                </h3>
                            </div>
                            <div className="p-3 bg-white/20 rounded-xl">
                                <card.icon size={24} />
                            </div>
                        </div>
                        {/* Decorative circle */}
                        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full"></div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Admin Profile Card */}
                <div className={`col-span-1 p-8 rounded-2xl shadow-sm text-center ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                    <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                        <svg className="w-16 h-16 text-slate-400 mt-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-1">Admin</h2>
                    <p className={`text-sm mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>SN Enviro Administrator</p>

                    <div className="flex justify-around border-t pt-6 dark:border-slate-700">
                        <div>
                            <p className="text-xl font-bold">{stats.products}</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Products</p>
                        </div>
                        <div>
                            <p className="text-xl font-bold">{stats.partners}</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Partners</p>
                        </div>
                        <div>
                            <p className="text-xl font-bold">{stats.testimonials}</p>
                            <p className="text-xs text-slate-500 uppercase tracking-wider">Reviews</p>
                        </div>
                    </div>
                </div>

                {/* Platform Content Overview Card */}
                <div className={`col-span-1 lg:col-span-2 p-8 rounded-2xl shadow-sm ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-xl font-bold mb-1">Platform Content Overview</h2>
                            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Real-time data from the current website</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-[#5f41e4] rounded-full"></div>
                            <span className="text-sm text-slate-500">Active Items</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {/* Mini Stat Cards */}
                        <div className={`p-6 rounded-2xl text-center border ${isDarkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-100 bg-slate-50/50'}`}>
                            <h3 className="text-3xl font-black mb-2">{stats.products}</h3>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Live Products</p>
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-[#5f41e4] w-3/4"></div>
                            </div>
                        </div>

                        <div className={`p-6 rounded-2xl text-center border ${isDarkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-100 bg-slate-50/50'}`}>
                            <h3 className="text-3xl font-black mb-2">{stats.partners}</h3>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Global Partners</p>
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-[#5a8bf7] w-5/6"></div>
                            </div>
                        </div>

                        <div className={`p-6 rounded-2xl text-center border ${isDarkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-100 bg-slate-50/50'}`}>
                            <h3 className="text-3xl font-black mb-2">{stats.testimonials}</h3>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Success Stories</p>
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-[#73c896] w-1/2"></div>
                            </div>
                        </div>

                        <div className={`p-6 rounded-2xl text-center border ${isDarkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-100 bg-slate-50/50'}`}>
                            <h3 className="text-3xl font-black mb-2">{stats.gallery}</h3>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Gallery Media</p>
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-[#f7b751] w-1/4"></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between items-center text-sm pt-6 border-t dark:border-slate-700">
                        <span className="text-slate-500">System status: <span className="text-emerald-500 font-medium">Online</span></span>
                        <span className="text-slate-500">Last synced: {new Date().toLocaleTimeString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
