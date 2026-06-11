import React, { useState, useEffect } from 'react';
import { Sun, Moon, User, Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import logo from '/assets/logo.png';

const Header = ({ isDarkMode, toggleTheme, onOpenPartnerPortal }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [activeNestedMenu, setActiveNestedMenu] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Live Dashboard', href: '/dashboard' },
        {
            name: 'Products',
            href: '/#products',
            dropdown: [
                { 
                    name: 'Continuous Ambient Air Quality Monitoring Stations', 
                    href: '/product/698da53e5bff466e7fbecc3b',
                    subItems: [
                        { name: 'System', href: '/product/698da53e5bff466e7fbecc3b?tab=system' },
                        { 
                            name: 'Product', 
                            href: '/product/698da53e5bff466e7fbecc3b?tab=product',
                            nestedItems: [
                                { name: 'SO2 Analyzer', href: '/product/698da53e5bff466e7fbecc3b?tab=product&item=so2' },
                                { name: 'NO-NO2-NOx Analyzer', href: '/product/698da53e5bff466e7fbecc3b?tab=product&item=nox' },
                                { name: 'CO Analyzer', href: '/product/698da53e5bff466e7fbecc3b?tab=product&item=co' },
                                { name: 'O3 Analyzer', href: '/product/698da53e5bff466e7fbecc3b?tab=product&item=o3' },
                                { name: 'PM Monitor', href: '/product/698da53e5bff466e7fbecc3b?tab=product&item=pm' }
                            ]
                        }
                    ]
                },
                { 
                    name: 'Continuous Emission Monitoring Systems', 
                    href: '/product/698da53e5bff466e7fbecc39',
                    subItems: [
                        { name: 'System', href: '/product/698da53e5bff466e7fbecc39?tab=system' },
                        { 
                            name: 'Product', 
                            href: '/product/698da53e5bff466e7fbecc39?tab=product',
                            nestedItems: [
                                { name: 'SO2-NO-NO2 Analyzer', href: '/product/698da53e5bff466e7fbecc39?tab=product&item=so2' },
                                { name: 'CO / CO2 Analyzer', href: '/product/698da53e5bff466e7fbecc39?tab=product&item=co' },
                                { name: 'Oxygen Analyzer', href: '/product/698da53e5bff466e7fbecc39?tab=product&item=o2' },
                                { name: 'PM Opacity Monitor', href: '/product/698da53e5bff466e7fbecc39?tab=product&item=pm' },
                                { name: 'Flow Monitor', href: '/product/698da53e5bff466e7fbecc39?tab=product&item=flow' }
                            ]
                        }
                    ]
                },
                { 
                    name: 'Effluent Quality Monitoring Systems', 
                    href: '/product/698da53e5bff466e7fbecc40',
                    subItems: [
                        { name: 'System', href: '/product/698da53e5bff466e7fbecc40?tab=system' },
                        { 
                            name: 'Product', 
                            href: '/product/698da53e5bff466e7fbecc40?tab=product',
                            nestedItems: [
                                { name: 'pH/ORP Sensor', href: '/product/698da53e5bff466e7fbecc40?tab=product&item=ph' },
                                { name: 'COD/BOD Analyzer', href: '/product/698da53e5bff466e7fbecc40?tab=product&item=cod' },
                                { name: 'TSS Sensor', href: '/product/698da53e5bff466e7fbecc40?tab=product&item=tss' },
                                { name: 'Electromagnetic Flow Meter', href: '/product/698da53e5bff466e7fbecc40?tab=product&item=flow' }
                            ]
                        }
                    ]
                },
                { 
                    name: 'IIoT-based Data Loggers & Remote Calibration Units', 
                    href: '/product/698da53e5bff466e7fbecc38',
                    subItems: [
                        { name: 'System', href: '/product/698da53e5bff466e7fbecc38?tab=system' },
                        { 
                            name: 'Product', 
                            href: '/product/698da53e5bff466e7fbecc38?tab=product',
                            nestedItems: [
                                { name: 'Modbus/Analog Gateway', href: '/product/698da53e5bff466e7fbecc38?tab=product&item=gateway' },
                                { name: 'Remote Calibration Module', href: '/product/698da53e5bff466e7fbecc38?tab=product&item=cal_module' },
                                { name: 'MQTT Encryption Server Link', href: '/product/698da53e5bff466e7fbecc38?tab=product&item=mqtt_link' }
                            ]
                        }
                    ]
                },
                { 
                    name: 'Weather Monitoring Systems (WMS)', 
                    href: '/product/698da53e5bff466e7fbecc41',
                    subItems: [
                        { name: 'System', href: '/product/698da53e5bff466e7fbecc41?tab=system' },
                        { 
                            name: 'Product', 
                            href: '/product/698da53e5bff466e7fbecc41?tab=product',
                            nestedItems: [
                                { name: 'Ultrasonic Wind Sensor', href: '/product/698da53e5bff466e7fbecc41?tab=product&item=wind' },
                                { name: 'Temp/Humidity Sensor', href: '/product/698da53e5bff466e7fbecc41?tab=product&item=temp_hum' },
                                { name: 'Rain Gauge', href: '/product/698da53e5bff466e7fbecc41?tab=product&item=rain' },
                                { name: 'Pyranometer', href: '/product/698da53e5bff466e7fbecc41?tab=product&item=pyrano' },
                                { name: 'Barometric Pressure Sensor', href: '/product/698da53e5bff466e7fbecc41?tab=product&item=baro' }
                            ]
                        }
                    ]
                },
                { 
                    name: 'Smart City Environmental Monitoring', 
                    href: '/product/698da53e5bff466e7fbecc42',
                    subItems: [
                        { name: 'System', href: '/product/698da53e5bff466e7fbecc42?tab=system' },
                        { 
                            name: 'Product', 
                            href: '/product/698da53e5bff466e7fbecc42?tab=product',
                            nestedItems: [
                                { name: 'Compact Gas Node', href: '/product/698da53e5bff466e7fbecc42?tab=product&item=gas_node' },
                                { name: 'Compact PM Node', href: '/product/698da53e5bff466e7fbecc42?tab=product&item=pm_node' },
                                { name: 'Noise Level Sensor', href: '/product/698da53e5bff466e7fbecc42?tab=product&item=noise' }
                            ]
                        }
                    ]
                },
                { 
                    name: 'Advanced Instrumentation', 
                    href: '/product/698da53e5bff466e7fbecc43',
                    subItems: [
                        { name: 'System', href: '/product/698da53e5bff466e7fbecc43?tab=system' },
                        { 
                            name: 'Product', 
                            href: '/product/698da53e5bff466e7fbecc43?tab=product',
                            nestedItems: [
                                { name: 'Electromagnetic Flow Meter', href: '/product/698da53e5bff466e7fbecc43?tab=product&item=flow_meter' },
                                { name: 'Radar Level Transmitter', href: '/product/698da53e5bff466e7fbecc43?tab=product&item=radar_level' },
                                { name: 'Pressure Transmitter', href: '/product/698da53e5bff466e7fbecc43?tab=product&item=pressure' },
                                { name: 'Analytical Electrodes', href: '/product/698da53e5bff466e7fbecc43?tab=product&item=electrodes' }
                            ]
                        }
                    ]
                }
            ]
        },
        { name: 'Services', href: '/#services' },
        { name: 'Clients', href: '/#clients' },
        { name: 'About', href: '/#about' },
        { name: 'Contact', href: '/#contact' },
        { name: 'Admin Portal', href: '/admin' },
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
                    <div className="flex flex-col justify-center">
                        <span className={`text-xl md:text-2xl font-serif tracking-wide leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            SN ENVIRO
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
                                                        <div 
                                                            className="relative"
                                                            onMouseEnter={() => setActiveSubMenu(dropItem.name)}
                                                            onMouseLeave={() => {setActiveSubMenu(null); setActiveNestedMenu(null);}}
                                                        >
                                                            <button
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setActiveSubMenu(activeSubMenu === dropItem.name ? null : dropItem.name);
                                                                }}
                                                                className={`w-full text-left text-sm font-bold py-2 px-3 rounded-lg flex justify-between items-center transition-colors ${isDarkMode ? 'text-slate-300 hover:bg-slate-800 hover:text-emerald-500' : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-600'}`}
                                                            >
                                                                {dropItem.name}
                                                                <ChevronDown size={14} className={`transition-transform duration-300 ${activeSubMenu === dropItem.name ? 'rotate-180' : ''}`} />
                                                            </button>

                                                            {/* Nested Sub-menu */}
                                                            {activeSubMenu === dropItem.name && (
                                                                <div className={`mt-1 ml-4 pl-4 border-l-2 border-emerald-500/20 space-y-1`}>
                                                                    {dropItem.subItems.map((sub) => (
                                                                        <div key={sub.name} className="relative">
                                                                            {sub.nestedItems ? (
                                                                                <div 
                                                                                    className="relative"
                                                                                    onMouseEnter={() => setActiveNestedMenu(sub.name)}
                                                                                    onMouseLeave={() => setActiveNestedMenu(null)}
                                                                                >
                                                                                    <button
                                                                                        onClick={(e) => {
                                                                                            e.preventDefault();
                                                                                            setActiveNestedMenu(activeNestedMenu === sub.name ? null : sub.name);
                                                                                        }}
                                                                                        className={`w-full text-left text-xs font-semibold py-2 px-2 rounded-lg flex justify-between items-center transition-colors cursor-pointer ${
                                                                                            isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-emerald-500' : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-600'
                                                                                        }`}
                                                                                    >
                                                                                        {sub.name}
                                                                                        <ChevronDown size={12} className="rotate-270 transform -rotate-90" />
                                                                                    </button>
                                                                                    
                                                                                    {/* Nested Fly-out (Side Dropdown) */}
                                                                                    {activeNestedMenu === sub.name && (
                                                                                        <div className="absolute left-full top-0 ml-2 pt-0 min-w-[200px] z-[120]">
                                                                                            <div className={`p-3 rounded-xl shadow-2xl border space-y-1 ${
                                                                                                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                                                                                            }`}>
                                                                                                {sub.nestedItems.map((nested) => (
                                                                                                    <a
                                                                                                        key={nested.name}
                                                                                                        href={nested.href}
                                                                                                        className={`block text-[11px] font-medium py-1.5 px-2 rounded-lg transition-colors no-underline ${
                                                                                                            isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-emerald-500' : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-600'
                                                                                                        }`}
                                                                                                    >
                                                                                                        {nested.name}
                                                                                                    </a>
                                                                                                ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                            ) : (
                                                                                <a
                                                                                    href={sub.href}
                                                                                    className={`block text-xs font-semibold py-2 px-2 rounded-lg transition-colors no-underline ${
                                                                                        isDarkMode ? 'text-slate-400 hover:text-emerald-500' : 'text-slate-600 hover:text-emerald-600'
                                                                                    }`}
                                                                                >
                                                                                    {sub.name}
                                                                                </a>
                                                                            )}
                                                                        </div>
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
                                                                    <div key={nested.name} className="flex flex-col gap-2">
                                                                        {nested.nestedItems ? (
                                                                            <>
                                                                                <span className={`text-base font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                                                                    {nested.name}
                                                                                </span>
                                                                                <div className="pl-4 flex flex-col gap-2">
                                                                                    {nested.nestedItems.map(subNested => (
                                                                                        <a
                                                                                            key={subNested.name}
                                                                                            href={subNested.href}
                                                                                            onClick={() => setMobileMenuOpen(false)}
                                                                                            className={`text-sm font-semibold no-underline transition-colors ${isDarkMode ? 'text-slate-400 hover:text-emerald-500' : 'text-slate-600 hover:text-emerald-600'}`}
                                                                                        >
                                                                                            {subNested.name}
                                                                                        </a>
                                                                                    ))}
                                                                                </div>
                                                                            </>
                                                                        ) : (
                                                                            <a
                                                                                href={nested.href}
                                                                                onClick={() => setMobileMenuOpen(false)}
                                                                                className={`text-base font-medium no-underline transition-colors ${isDarkMode ? 'text-slate-400 hover:text-emerald-500' : 'text-slate-600 hover:text-emerald-600'}`}
                                                                            >
                                                                                {nested.name}
                                                                            </a>
                                                                        )}
                                                                    </div>
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
