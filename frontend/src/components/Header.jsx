import React, { useState, useEffect } from 'react';
import { Sun, Moon, User, Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import logo from '/assets/logo.png';

const Header = ({ isDarkMode, toggleTheme, onOpenPartnerPortal }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        {
            name: 'Products',
            href: '#products',
            dropdown: [
                {
                    name: 'CAAQMS',
                    subItems: [
                        { name: 'CAAQSM Systems', href: '#caaqms-systems' },
                        { name: 'CAAQMS Products', href: '#caaqms-products' }
                    ]
                },
                { name: 'CEMS', href: '#cems' },
                { name: 'EQMS', href: '#eqms' },
                { name: 'IoT based data logger', href: '#iot-logger' }
            ]
        },
        { name: 'Services', href: '#services' },
        { name: 'Clients', href: '#clients' },
        { name: 'Blog', href: '#blog' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${scrolled
                ? isDarkMode
                    ? 'bg-slate-900 border-b border-slate-800 py-3 shadow-xl'
                    : 'bg-white border-b border-slate-100 py-3 shadow-md'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <a href="/" className="flex items-center gap-3 group no-underline">
                    <div className="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <img
                            src={logo}
                            className="w-full h-full object-contain"
                            alt="SN ENVIRO Logo"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className={`text-xl md:text-2xl font-serif tracking-wide leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            SN ENVIRO
                        </span>
                        <span className={`text-[10px] font-bold tracking-[0.3em] uppercase ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            Solutions & Services Pvt. Ltd.
                        </span>
                    </div>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-10">
                    <ul className="flex items-center gap-8">
                        {navLinks.map((link) => (
                            <li key={link.name} className="relative group" onMouseLeave={() => setActiveSubMenu(null)}>
                                <a
                                    href={link.href}
                                    className={`text-sm font-bold uppercase tracking-widest no-underline transition-all hover:text-emerald-500 flex items-center gap-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'
                                        }`}
                                >
                                    {link.name}
                                    {link.dropdown && <ChevronDown size={14} />}
                                </a>

                                {/* Dropdown Menu */}
                                {link.dropdown && (
                                    <div className="absolute top-full left-0 pt-4 hidden group-hover:block min-w-[260px]">
                                        <div className={`p-4 rounded-xl shadow-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
                                            {link.dropdown.map((dropItem) => (
                                                <div key={dropItem.name} className="mb-2 last:mb-0">
                                                    {dropItem.subItems ? (
                                                        <div className="relative">
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setActiveSubMenu(activeSubMenu === dropItem.name ? null : dropItem.name);
                                                                }}
                                                                className={`w-full text-left text-sm font-bold py-2 px-3 rounded-lg flex justify-between items-center transition-colors ${isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-50'}`}
                                                            >
                                                                {dropItem.name}
                                                                <ChevronDown size={14} className={`transition-transform duration-300 ${activeSubMenu === dropItem.name ? 'rotate-180' : ''}`} />
                                                            </button>

                                                            {/* Nested Sub-menu */}
                                                            {activeSubMenu === dropItem.name && (
                                                                <div className={`mt-1 ml-4 pl-4 border-l-2 border-emerald-500/20 space-y-1`}>
                                                                    {dropItem.subItems.map((sub) => (
                                                                        <a
                                                                            key={sub.name}
                                                                            href={sub.href}
                                                                            className={`block text-xs font-semibold py-2 px-2 rounded-lg transition-colors ${isDarkMode ? 'text-slate-400 hover:text-emerald-500' : 'text-slate-600 hover:text-emerald-600'}`}
                                                                        >
                                                                            {sub.name}
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <a
                                                            href={dropItem.href}
                                                            className={`block text-sm font-bold py-2 px-3 rounded-lg transition-colors ${isDarkMode ? 'text-slate-300 hover:bg-slate-800 hover:text-emerald-500' : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-600'}`}
                                                        >
                                                            {dropItem.name}
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-4 pl-8 border-l border-slate-200 dark:border-slate-800">
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full transition-all hover:scale-110 ${isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-slate-100 text-slate-600'
                                }`}
                        >
                            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        <button
                            onClick={onOpenPartnerPortal}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all active:scale-95 ${isDarkMode
                                ? 'bg-slate-800 text-white border border-slate-700 hover:bg-slate-700'
                                : 'bg-slate-50 text-slate-900 border border-slate-200 hover:bg-slate-200 shadow-sm'
                                }`}
                        >
                            <User size={16} />
                            Partner Login
                        </button>

                        <a
                            href="#contact"
                            className="bg-emerald-500 text-white px-6 py-2.5 rounded-full text-sm font-bold no-underline hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2 group"
                        >
                            Get Quote
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-2 text-slate-500"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 z-[200] lg:hidden transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setMobileMenuOpen(false)}></div>
                <div className={`absolute right-0 top-0 h-full w-4/5 max-w-sm p-8 shadow-2xl transition-transform duration-500 ${isDarkMode ? 'bg-slate-900' : 'bg-white'} ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-between items-center mb-12">
                        <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Navigation</span>
                        <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <div key={link.name}>
                                {link.dropdown ? (
                                    <div className="flex flex-col gap-4">
                                        <button
                                            className={`text-2xl font-bold flex justify-between items-center group ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                                            onClick={() => setMobileMenuOpen(true)} // Keep menu open to interact
                                        >
                                            {link.name}
                                        </button>
                                        <div className="pl-4 border-l-2 border-emerald-500/30 flex flex-col gap-4">
                                            {link.dropdown.map((subLink) => (
                                                <div key={subLink.name}>
                                                    {subLink.subItems ? (
                                                        <div className="flex flex-col gap-3">
                                                            <span className={`text-lg font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                                                {subLink.name}
                                                            </span>
                                                            <div className="pl-4 flex flex-col gap-3">
                                                                {subLink.subItems.map(nested => (
                                                                    <a
                                                                        key={nested.name}
                                                                        href={nested.href}
                                                                        onClick={() => setMobileMenuOpen(false)}
                                                                        className={`text-base font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}
                                                                    >
                                                                        {nested.name}
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <a
                                                            href={subLink.href}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className={`text-lg font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}
                                                        >
                                                            {subLink.name}
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <a
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`text-2xl font-bold flex justify-between items-center group no-underline ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                                    >
                                        {link.name}
                                        <ArrowRight size={24} className="text-emerald-500 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 pt-12 border-t border-slate-100 dark:border-slate-800 space-y-4">
                        <button
                            onClick={onOpenPartnerPortal}
                            className="w-full flex items-center justify-center gap-3 py-4 bg-emerald-500/10 text-emerald-500 rounded-2xl font-bold"
                        >
                            <User size={20} />
                            Partner Access
                        </button>
                        <a
                            href="#contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-full flex items-center justify-center gap-3 py-4 bg-emerald-500 text-white rounded-2xl font-bold no-underline shadow-lg shadow-emerald-500/20"
                        >
                            Get Quote
                            <ArrowRight size={20} />
                        </a>
                        <button
                            onClick={toggleTheme}
                            className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900'}`}
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
