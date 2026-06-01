import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Mail, Image as ImageIcon, Briefcase, Globe, Activity } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = ({ isDarkMode }) => {
    const [stats, setStats] = useState({
        products: 0,
        partners: 0,
        testimonials: 0,
        gallery: 0,
        visits: 0
    });
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        // Fetch visits stats & initial activity feed from backend
        axios.get('http://localhost:5000/api/visits/stats')
            .then(res => {
                setStats(prev => ({
                    ...prev,
                    visits: res.data.totalVisits
                }));
                // Map visits to activity log items
                const initialActivity = res.data.recentVisits.map(v => ({
                    type: 'new_visit',
                    payload: v,
                    timestamp: v.createdAt
                }));
                setActivity(initialActivity);
            })
            .catch(err => console.error('Failed to fetch visit stats:', err));

        // Fetch other stats or keep mocks
        setStats(prev => ({
            ...prev,
            products: 8,
            partners: 10,
            testimonials: 4,
            gallery: 2
        }));
    }, []);

    // Listen to real-time notification events dispatched by AdminLayout
    useEffect(() => {
        const handleRealTimeEvent = (e) => {
            const data = e.detail;

            // Push event into activity feed list
            setActivity(prev => [data, ...prev].slice(0, 20));

            // Dynamic count increments
            if (data.type === 'new_visit') {
                setStats(prev => ({
                    ...prev,
                    visits: (prev.visits || 0) + 1
                }));
            } else if (data.type === 'new_inquiry') {
                setStats(prev => ({
                    ...prev,
                    testimonials: (prev.testimonials || 0) + 1
                }));
            }
        };

        window.addEventListener('site-notification', handleRealTimeEvent);
        return () => window.removeEventListener('site-notification', handleRealTimeEvent);
    }, []);

    const statCards = [
        { title: 'Total Products', value: stats.products, icon: Briefcase, color: 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/10', textColor: 'text-white' },
        { title: 'Active Partners', value: stats.partners, icon: BookOpen, color: 'bg-gradient-to-br from-emerald-600 to-teal-700 shadow-lg shadow-emerald-600/10', textColor: 'text-white' },
        { title: 'Testimonials', value: stats.testimonials, icon: Mail, color: 'bg-gradient-to-br from-teal-600 to-emerald-500 shadow-lg shadow-teal-500/10', textColor: 'text-white' },
        { title: 'Gallery Images', value: stats.gallery, icon: ImageIcon, color: 'bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/10', textColor: 'text-white' },
        { title: 'Total Visits', value: stats.visits, icon: Globe, color: 'bg-gradient-to-br from-teal-500 to-emerald-600 shadow-lg shadow-teal-500/10', textColor: 'text-white' },
    ];

    return (
        <div className="space-y-6">
            {/* Stat Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {statCards.map((card, idx) => (
                    <div key={idx} className={`${card.color} ${card.textColor} p-6 rounded-2xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02]`}>
                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <p className="text-sm font-medium opacity-90 mb-1">{card.title}</p>
                                <h3 className="text-3xl font-bold flex items-center gap-2">
                                    {card.value}
                                </h3>
                            </div>
                            <div className="p-2.5 bg-white/20 rounded-xl">
                                <card.icon size={20} />
                            </div>
                        </div>
                        {/* Decorative circle */}
                        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full"></div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Admin Profile Card */}
                <div className={`col-span-1 p-8 rounded-2xl border shadow-sm text-center transition-all duration-500 flex flex-col justify-between ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100'}`}>
                    <div>
                        <div className="w-24 h-24 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                            <svg className="w-16 h-16 text-emerald-500 mt-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-1">Admin</h2>
                        <p className={`text-sm mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>SN Enviro Administrator</p>
                    </div>

                    <div className="flex justify-around border-t pt-6 dark:border-slate-800 border-slate-100">
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
                <div className={`col-span-1 p-8 rounded-2xl border shadow-sm transition-all duration-500 ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100'}`}>
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-xl font-bold mb-1">Overview</h2>
                            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Live content summary</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <span className="text-xs text-slate-500">Live</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {/* Mini Stat Cards Stacked */}
                        <div>
                            <div className="flex justify-between text-xs mb-1 font-semibold">
                                <span>Live Products</span>
                                <span>{stats.products} / 10</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500" style={{ width: `${(stats.products/10)*100}%` }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs mb-1 font-semibold">
                                <span>Global Partners</span>
                                <span>{stats.partners} / 15</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-400" style={{ width: `${(stats.partners/15)*100}%` }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs mb-1 font-semibold">
                                <span>Success Reviews</span>
                                <span>{stats.testimonials} / 8</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-300" style={{ width: `${(stats.testimonials/8)*100}%` }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs mb-1 font-semibold">
                                <span>Gallery Media</span>
                                <span>{stats.gallery} / 10</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-teal-400" style={{ width: `${(stats.gallery/10)*100}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between items-center text-[10px] pt-4 border-t dark:border-slate-800 border-slate-100 text-slate-500">
                        <span>Status: <span className="text-emerald-500 font-bold">Online</span></span>
                        <span>Synced: {new Date().toLocaleTimeString()}</span>
                    </div>
                </div>

                {/* Live Activity Feed */}
                <div className={`col-span-1 p-8 rounded-2xl border shadow-sm flex flex-col h-[380px] transition-all duration-500 ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-100'}`}>
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-xl font-bold">Live Activity Feed</h2>
                            <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Real-time visitor & inquiry alerts</p>
                        </div>
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin" style={{ maxHeight: '250px' }}>
                        {activity.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-xs text-slate-400">
                                Waiting for live events...
                            </div>
                        ) : (
                            activity.map((act, idx) => (
                                <div key={idx} className="flex gap-3 text-xs items-start">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                        act.type === 'new_visit' 
                                            ? 'bg-emerald-500/10 text-emerald-500' 
                                            : 'bg-teal-500/10 text-teal-500'
                                    }`}>
                                        {act.type === 'new_visit' ? '🌐' : '✉️'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        {act.type === 'new_visit' ? (
                                            <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} leading-snug`}>
                                                Visitor landed on page <strong className="text-emerald-500">{act.payload.pagePath}</strong>
                                            </p>
                                        ) : (
                                            <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'} leading-snug`}>
                                                <strong>{act.payload.name}</strong> submitted an inquiry regarding <strong className="text-emerald-500">"{act.payload.subject}"</strong>
                                            </p>
                                        )}
                                        <span className="text-[10px] text-slate-400 block mt-0.5">
                                            {new Date(act.timestamp).toLocaleTimeString()}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
