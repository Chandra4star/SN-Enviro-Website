import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Image as ImageIcon, Briefcase, MessageSquare, Users, Settings, LogOut, Menu, X, Globe, User } from 'lucide-react';
import logo from '/assets/logo.png';

const AdminLayout = ({ children, isDarkMode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Products', path: '/admin/products', icon: Briefcase },
        { name: 'Gallery', path: '/admin/gallery', icon: ImageIcon },
        { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
        { name: 'Partners', path: '/admin/partners', icon: Users },
        { name: 'About', path: '/admin/about', icon: Users }, // Using Users icon as a placeholder, or we can use another
        { name: 'Site Settings', path: '/admin/settings', icon: Settings },
    ];

    return (
        <div className={`flex h-screen overflow-hidden ${isDarkMode ? 'bg-slate-900 text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-r shadow-lg flex flex-col`}>
                
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
                                    ? 'bg-[#5f41e4] text-white shadow-md shadow-indigo-500/30' 
                                    : `${isDarkMode ? 'text-slate-400 hover:bg-slate-700 hover:text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`
                                }`
                            }
                        >
                            <item.icon size={20} />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                    <a href="/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 mb-2 ${isDarkMode ? 'text-slate-400 hover:bg-slate-700 hover:text-emerald-400' : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-600'}`}>
                        <Globe size={20} />
                        View Website
                    </a>
                    <button onClick={handleLogout} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${isDarkMode ? 'text-slate-400 hover:bg-slate-700 hover:text-red-400' : 'text-slate-600 hover:bg-red-50 hover:text-red-600'}`}>
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className={`flex items-center justify-between p-4 lg:p-6 border-b ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} shadow-sm z-40`}>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-2 rounded-lg lg:hidden ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}>
                            <Menu size={24} />
                        </button>
                        <div>
                            <h2 className="text-xl font-bold">Good Afternoon, Admin</h2>
                            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Website Dashboard & Management</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className={`hidden sm:flex items-center gap-3 p-2 rounded-full border pr-4 ${isDarkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-200 bg-slate-50'}`}>
                            <div className="bg-emerald-500 w-8 h-8 rounded-full flex items-center justify-center text-white">
                                <User size={16} />
                            </div>
                            <div className="text-sm">
                                <p className="font-bold leading-tight">Admin</p>
                                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Super User</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 dark:bg-slate-900/50 p-4 lg:p-8">
                    {children}
                </main>
            </div>

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
