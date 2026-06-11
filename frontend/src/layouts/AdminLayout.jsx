import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Image as ImageIcon, Briefcase, MessageSquare, Users, Settings, LogOut, Menu, X, Globe, User, Bell } from 'lucide-react';
import logo from '/assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = ({ children, isDarkMode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [bellOpen, setBellOpen] = useState(false);
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    const [adminUser] = useState(() => {
        try {
            const userStr = localStorage.getItem('adminUser');
            return userStr ? JSON.parse(userStr) : null;
        } catch {
            return null;
        }
    });

    const playNotificationSound = () => {
        try {
            const context = new (window.AudioContext || window.webkitAudioContext)();
            const osc = context.createOscillator();
            const gain = context.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, context.currentTime); // D5
            osc.frequency.exponentialRampToValueAtTime(880.00, context.currentTime + 0.15); // A5
            
            gain.gain.setValueAtTime(0.08, context.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.25);
            
            osc.connect(gain);
            gain.connect(context.destination);
            
            osc.start();
            osc.stop(context.currentTime + 0.3);
        } catch (err) {
            // Context might be blocked by browser user interaction policy
        }
    };

    // SSE connection listener
    useEffect(() => {
        const eventSource = new EventSource('http://localhost:5000/api/notifications/stream');

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'system') return; // Ignore system connection ping

                // Play notification chime
                playNotificationSound();

                // Dispatch event to update Dashboard components dynamically
                window.dispatchEvent(new CustomEvent('site-notification', { detail: data }));

                // Add to active notifications
                setNotifications((prev) => [data, ...prev].slice(0, 50));
                setUnreadCount((prev) => prev + 1);

                // Show toast alert
                setToast(data);

                // Auto dismiss toast
                setTimeout(() => {
                    setToast((currentToast) => 
                        currentToast && currentToast.timestamp === data.timestamp ? null : currentToast
                    );
                }, 6000);
            } catch (err) {
                console.error('Error parsing SSE message:', err);
            }
        };

        eventSource.onerror = (err) => {
            console.error('SSE Connection failed. Will retry...', err);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Products', path: '/admin/products', icon: Briefcase },
        { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
        { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
        { name: 'Partners', path: '/admin/partners', icon: Users },
        { name: 'About', path: '/admin/about', icon: Users },
        { name: 'Site Settings', path: '/admin/settings', icon: Settings },
    ];

    return (
        <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-slate-200' : 'bg-white text-slate-800'}`}>
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} border-r shadow-lg flex flex-col`}>
                
                {/* Logo Area */}
                <div className="flex items-center justify-between p-6">
                    <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 no-underline cursor-pointer group">
                        <img src={logo} alt="Logo" className="h-10 w-10 object-contain group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-lg leading-tight">SN ENVIRO<br/><span className="text-[10px] text-emerald-500 tracking-widest uppercase">Admin Panel</span></span>
                    </a>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500 hover:text-emerald-500">
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 space-y-2 overflow-y-auto mt-6">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === '/admin'}
                            onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                            className={({ isActive }) => 
                                `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                                    isActive 
                                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
                                    : `${isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-600 hover:bg-emerald-50/50 hover:text-emerald-600'}`
                                }`
                            }
                        >
                            <item.icon size={20} />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <a href="/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 mb-2 ${isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-emerald-400' : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-600'}`}>
                        <Globe size={20} />
                        View Website
                    </a>
                    <button onClick={handleLogout} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-red-400' : 'text-slate-600 hover:bg-red-50 hover:text-red-600'}`}>
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className={`flex items-center justify-between p-4 lg:p-6 border-b ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} shadow-sm z-40`}>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-2 rounded-lg lg:hidden ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}>
                            <Menu size={24} />
                        </button>
                        <div>
                            <h2 className="text-xl font-bold">Good Afternoon, {adminUser?.name || 'Admin'}</h2>
                            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Website Dashboard & Management</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Notifications Bell Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => {
                                    setBellOpen(!bellOpen);
                                    setUnreadCount(0);
                                }}
                                className={`p-2.5 rounded-full border relative transition-colors cursor-pointer ${
                                    isDarkMode 
                                        ? 'border-slate-800 bg-slate-950/50 text-slate-400 hover:text-white hover:bg-slate-800' 
                                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                }`}
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse shadow-md shadow-red-500/20">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Dropdown panel */}
                            <AnimatePresence>
                                {bellOpen && (
                                    <>
                                        {/* Click overlay to close */}
                                        <div className="fixed inset-0 z-40" onClick={() => setBellOpen(false)} />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className={`absolute right-0 mt-3 w-80 rounded-2xl border shadow-xl z-50 overflow-hidden ${
                                                isDarkMode 
                                                    ? 'bg-slate-900 border-slate-800 text-slate-200' 
                                                    : 'bg-white border-slate-100 text-slate-800'
                                            }`}
                                        >
                                            <div className={`p-4 border-b font-bold flex justify-between items-center ${
                                                isDarkMode ? 'border-slate-800 bg-slate-950/20' : 'border-slate-50 bg-slate-50/50'
                                            }`}>
                                                <span>Recent Activity</span>
                                                {notifications.length > 0 && (
                                                    <button 
                                                        onClick={() => setNotifications([])}
                                                        className="text-xs text-red-500 font-bold hover:underline cursor-pointer"
                                                    >
                                                        Clear
                                                    </button>
                                                )}
                                            </div>
                                            <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                                                {notifications.length === 0 ? (
                                                    <div className="p-8 text-center text-xs text-slate-500">
                                                        No new activity
                                                    </div>
                                                ) : (
                                                    notifications.map((n, idx) => (
                                                        <div key={idx} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors text-xs">
                                                            {n.type === 'new_visit' ? (
                                                                <p className="leading-relaxed">
                                                                    🌐 Visitor landed on page <strong className="text-emerald-500">{n.payload.pagePath}</strong>
                                                                </p>
                                                            ) : (
                                                                <p className="leading-relaxed">
                                                                    ✉️ <strong>{n.payload.name}</strong> submitted an inquiry: <strong className="text-emerald-500">"{n.payload.subject}"</strong>
                                                                </p>
                                                            )}
                                                            <span className="text-[10px] text-slate-400 block mt-1">
                                                                {new Date(n.timestamp).toLocaleTimeString()}
                                                            </span>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Profile Info block */}
                        <div className={`hidden sm:flex items-center gap-3 p-2 rounded-full border pr-4 ${isDarkMode ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50'}`}>
                            <div className="bg-emerald-500 w-8 h-8 rounded-full flex items-center justify-center text-white">
                                <User size={16} />
                            </div>
                            <div className="text-sm">
                                <p className="font-bold leading-tight">{adminUser?.name || 'Admin'}</p>
                                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Super User</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50/50 dark:bg-slate-900/20 p-4 lg:p-8">
                    {children}
                </main>
            </div>

            {/* Live Notification Toast Alert */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, x: 100, y: 0, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 100, scale: 0.9 }}
                        className="fixed bottom-6 right-6 z-[100] max-w-sm w-80 p-5 rounded-2xl border backdrop-blur-xl shadow-2xl flex gap-4 transition-all"
                        style={{
                            backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.85)' : 'rgba(255, 255, 255, 0.9)',
                            borderColor: isDarkMode ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.2)'
                        }}
                    >
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
                            {toast.type === 'new_visit' ? '🌐' : '✉️'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs uppercase tracking-widest text-emerald-500 mb-1">
                                {toast.type === 'new_visit' ? 'Visitor Alert' : 'New Service Request'}
                            </h4>
                            <p className={`text-xs font-semibold leading-relaxed truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                {toast.type === 'new_visit' 
                                    ? `Visitor landed on: ${toast.payload.pagePath}` 
                                    : `${toast.payload.name} sent an inquiry`}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-1">
                                {toast.type === 'new_visit' 
                                    ? 'A user is exploring the website' 
                                    : `Subject: ${toast.payload.subject}`}
                            </p>
                        </div>
                        <button onClick={() => setToast(null)} className="text-slate-400 hover:text-emerald-500 self-start cursor-pointer">
                            <X size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default AdminLayout;
