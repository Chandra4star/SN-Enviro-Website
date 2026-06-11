import React, { useState, useEffect } from 'react';
import { 
    MapPin, Cpu, Wifi, RefreshCw, CheckCircle2, AlertTriangle, AlertOctagon, 
    Activity, Info, BarChart3, Wind, ShieldAlert
} from 'lucide-react';
import { motion } from 'framer-motion';

const STATIONS = {
    hyderabad: {
        id: "CAAQMS-04",
        name: "Hyderabad Industrial Zone",
        baseAqi: 112,
        metrics: {
            pm25: { val: 39.5, unit: "µg/m³", min: 34, max: 46, label: "PM2.5", desc: "Fine Particles", limit: 60 },
            pm10: { val: 78.2, unit: "µg/m³", min: 68, max: 88, label: "PM10", desc: "Coarse Particles", limit: 100 },
            no2: { val: 24.1, unit: "µg/m³", min: 18, max: 30, label: "NO₂", desc: "Nitrogen Dioxide", limit: 80 },
            so2: { val: 12.4, unit: "µg/m³", min: 9, max: 16, label: "SO₂", desc: "Sulfur Dioxide", limit: 80 },
            co: { val: 0.82, unit: "mg/m³", min: 0.5, max: 1.2, label: "CO", desc: "Carbon Monoxide", limit: 4 },
            o3: { val: 46.7, unit: "µg/m³", min: 38, max: 56, label: "O₃", desc: "Ozone", limit: 180 }
        },
        status: "Active",
        operator: "Telangana SPCB",
        lastCalibrated: "May 28, 2026",
        location: "Kattedan Industrial Area, HYD"
    },
    delhi: {
        id: "CAAQMS-12",
        name: "Delhi Okhla Unit-3",
        baseAqi: 312,
        metrics: {
            pm25: { val: 262.4, unit: "µg/m³", min: 235, max: 288, label: "PM2.5", desc: "Fine Particles", limit: 60 },
            pm10: { val: 410.8, unit: "µg/m³", min: 375, max: 445, label: "PM10", desc: "Coarse Particles", limit: 100 },
            no2: { val: 82.5, unit: "µg/m³", min: 72, max: 94, label: "NO₂", desc: "Nitrogen Dioxide", limit: 80 },
            so2: { val: 28.1, unit: "µg/m³", min: 22, max: 34, label: "SO₂", desc: "Sulfur Dioxide", limit: 80 },
            co: { val: 2.45, unit: "mg/m³", min: 2.0, max: 2.9, label: "CO", desc: "Carbon Monoxide", limit: 4 },
            o3: { val: 108.3, unit: "µg/m³", min: 92, max: 122, label: "O₃", desc: "Ozone", limit: 180 }
        },
        status: "Active",
        operator: "Delhi DPCC",
        lastCalibrated: "May 30, 2026",
        location: "Okhla Phase III, NDLS"
    },
    chennai: {
        id: "CAAQMS-02",
        name: "Chennai Port Terminal",
        baseAqi: 54,
        metrics: {
            pm25: { val: 14.2, unit: "µg/m³", min: 10, max: 19, label: "PM2.5", desc: "Fine Particles", limit: 60 },
            pm10: { val: 32.5, unit: "µg/m³", min: 24, max: 39, label: "PM10", desc: "Coarse Particles", limit: 100 },
            no2: { val: 11.2, unit: "µg/m³", min: 7, max: 16, label: "NO₂", desc: "Nitrogen Dioxide", limit: 80 },
            so2: { val: 6.8, unit: "µg/m³", min: 4, max: 10, label: "SO₂", desc: "Sulfur Dioxide", limit: 80 },
            co: { val: 0.38, unit: "mg/m³", min: 0.2, max: 0.6, label: "CO", desc: "Carbon Monoxide", limit: 4 },
            o3: { val: 28.4, unit: "µg/m³", min: 21, max: 36, label: "O₃", desc: "Ozone", limit: 180 }
        },
        status: "Active",
        operator: "Tamil Nadu SPCB",
        lastCalibrated: "May 25, 2026",
        location: "Royapuram Port Zone, CHN"
    }
};

const getAqiDetails = (aqi) => {
    if (aqi <= 50) return { label: 'Good', color: 'text-emerald-500 dark:text-emerald-450 border-emerald-500/20', bg: 'bg-emerald-500/10', barColor: '#10b981', ringColor: 'stroke-emerald-500', desc: 'Minimal health impact. Air quality is ideal.', icon: CheckCircle2 };
    if (aqi <= 100) return { label: 'Satisfactory', color: 'text-green-500 dark:text-green-455 border-green-500/20', bg: 'bg-green-500/10', barColor: '#22c55e', ringColor: 'stroke-green-500', desc: 'Minor breathing discomfort to sensitive people.', icon: CheckCircle2 };
    if (aqi <= 200) return { label: 'Moderate', color: 'text-amber-500 dark:text-amber-455 border-amber-500/20', bg: 'bg-amber-500/10', barColor: '#f59e0b', ringColor: 'stroke-amber-500', desc: 'Breathing discomfort to asthma, lung, and heart patients.', icon: AlertTriangle };
    if (aqi <= 300) return { label: 'Poor', color: 'text-orange-500 dark:text-orange-455 border-orange-500/20', bg: 'bg-orange-500/10', barColor: '#f97316', ringColor: 'stroke-orange-500', desc: 'Breathing discomfort to most on prolonged exposure.', icon: AlertTriangle };
    if (aqi <= 400) return { label: 'Very Poor', color: 'text-red-500 dark:text-red-455 border-red-500/20', bg: 'bg-red-500/10', barColor: '#ef4444', ringColor: 'stroke-red-500', desc: 'Respiratory illness on prolonged exposure.', icon: AlertOctagon };
    return { label: 'Severe', color: 'text-purple-600 dark:text-purple-455 border-purple-600/20', bg: 'bg-purple-600/10', barColor: '#9333ea', ringColor: 'stroke-purple-600', desc: 'Seriously impacts healthy people and existing patients.', icon: AlertOctagon };
};

const Dashboard = ({ isDarkMode }) => {
    const [selectedStation, setSelectedStation] = useState('hyderabad');
    const [telemetry, setTelemetry] = useState(STATIONS.hyderabad);
    const [calibrating, setCalibrating] = useState(false);
    const [prevMetrics, setPrevMetrics] = useState({});

    // Reset to the base telemetry profile when station changes
    useEffect(() => {
        setTelemetry(JSON.parse(JSON.stringify(STATIONS[selectedStation])));
        setPrevMetrics({});
    }, [selectedStation]);

    // Simulated real-time telemetry fluctuations (every 4s)
    useEffect(() => {
        const interval = setInterval(() => {
            if (calibrating) return;

            setTelemetry(prev => {
                // Save current as previous before modifying
                const currentMetrics = {};
                Object.keys(prev.metrics).forEach(k => {
                    currentMetrics[k] = prev.metrics[k].val;
                });
                setPrevMetrics(currentMetrics);

                const next = JSON.parse(JSON.stringify(prev));
                let totalAqiShift = 0;

                Object.keys(next.metrics).forEach(key => {
                    const metric = next.metrics[key];
                    const changePercent = (Math.random() * 0.04 - 0.02); // -2% to +2%
                    let change = changePercent * metric.val;
                    
                    if (Math.abs(change) < 0.01) {
                        change = (Math.random() * 0.2 - 0.1);
                    }

                    let newVal = metric.val + change;
                    if (newVal < metric.min) newVal = metric.min;
                    if (newVal > metric.max) newVal = metric.max;
                    
                    metric.val = Math.round(newVal * 100) / 100;
                    
                    const baseVal = STATIONS[selectedStation].metrics[key].val;
                    totalAqiShift += (newVal - baseVal) / baseVal;
                });

                const aqiShift = Math.round((totalAqiShift / 6) * STATIONS[selectedStation].baseAqi);
                let nextAqi = STATIONS[selectedStation].baseAqi + aqiShift;
                const maxDeviation = 20;
                if (nextAqi < STATIONS[selectedStation].baseAqi - maxDeviation) {
                    nextAqi = STATIONS[selectedStation].baseAqi - maxDeviation;
                }
                if (nextAqi > STATIONS[selectedStation].baseAqi + maxDeviation) {
                    nextAqi = STATIONS[selectedStation].baseAqi + maxDeviation;
                }
                next.baseAqi = Math.max(1, Math.min(500, nextAqi));

                return next;
            });
        }, 4000);

        return () => clearInterval(interval);
    }, [selectedStation, calibrating]);

    const runSelfTest = () => {
        if (calibrating) return;
        setCalibrating(true);
        setTimeout(() => {
            setCalibrating(false);
            setTelemetry(JSON.parse(JSON.stringify(STATIONS[selectedStation])));
            setPrevMetrics({});
        }, 2500);
    };

    return (
        <div className={`pt-24 min-h-screen relative overflow-hidden pb-16 ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

            <div className="container mx-auto px-6 py-8">
                
                {/* Hero Section */}
                <div className="max-w-4xl mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-emerald-500 font-bold uppercase tracking-widest text-xs mb-2 block">
                            National Telemetry Services
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-black mb-4 leading-tight tracking-tight">
                            Live Environment <span className="text-emerald-500">Dashboard</span>
                        </h1>
                        <p className={`text-base md:text-lg max-w-3xl leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            Continuous Ambient Air Quality Monitoring Station (CAAQMS) real-time telemetric streams. 
                            Select a regional station to monitor live air metrics, particulate densities, and regulatory limits.
                        </p>
                    </motion.div>
                </div>

                {/* Main CAAQMS Monitor Panel */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`p-8 rounded-3xl border shadow-lg transition-all duration-500 ${
                        isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-slate-100'
                    }`}
                >
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-2xl font-bold tracking-tight">CAAQMS Live Telemetry Monitor</h2>
                                <span className="flex h-2.5 w-2.5 relative">
                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${calibrating ? 'bg-amber-400' : 'bg-rose-500'}`}></span>
                                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${calibrating ? 'bg-amber-500' : 'bg-rose-600'}`}></span>
                                </span>
                                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-rose-500/10 text-rose-500 rounded-full border border-rose-500/20">
                                    {calibrating ? 'Calibrating...' : 'Live Stream'}
                                </span>
                            </div>
                            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                Live telemetry updates simulated every 4 seconds. Compliant with CPCB guidelines.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative flex-1 md:flex-initial">
                                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-500" />
                                <select
                                    value={selectedStation}
                                    onChange={(e) => setSelectedStation(e.target.value)}
                                    className={`w-full md:w-64 pl-10 pr-4 py-2 text-sm font-semibold rounded-xl border appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300 ${
                                        isDarkMode 
                                            ? 'bg-slate-800 border-slate-700 text-slate-200 focus:bg-slate-850' 
                                            : 'bg-slate-50 border-slate-200 text-slate-700 focus:bg-white'
                                    }`}
                                >
                                    <option value="hyderabad">Hyderabad Industrial Zone</option>
                                    <option value="delhi">Delhi Okhla Unit-3</option>
                                    <option value="chennai">Chennai Port Terminal</option>
                                </select>
                                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    ▼
                                </div>
                            </div>

                            <button
                                onClick={runSelfTest}
                                disabled={calibrating}
                                className={`p-2.5 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                                    calibrating
                                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 cursor-not-allowed'
                                        : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 hover:bg-emerald-500 hover:text-white cursor-pointer'
                                }`}
                                title="Sensor Self-Test & Calibration"
                            >
                                <RefreshCw size={16} className={calibrating ? 'animate-spin' : ''} />
                            </button>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Circle AQI Gauge Panel */}
                        <div className={`p-6 rounded-2xl flex flex-col items-center justify-center text-center border relative overflow-hidden transition-all duration-300 ${
                            isDarkMode ? 'bg-slate-900/40 border-slate-800/80' : 'bg-slate-50/50 border-slate-100/50'
                        }`}>
                            <div className="absolute top-4 left-4 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                                <Cpu size={14} className="text-emerald-500" />
                                <span>Station Index</span>
                            </div>

                            {/* Circular Progress Gauge */}
                            {(() => {
                                const aqi = telemetry.baseAqi;
                                const details = getAqiDetails(aqi);
                                const IconComponent = details.icon;
                                
                                // SVG dimensions
                                const sqSize = 180;
                                const strokeWidth = 14;
                                const radius = (sqSize - strokeWidth) / 2;
                                const viewBox = `0 0 ${sqSize} ${sqSize}`;
                                const dashArray = radius * Math.PI * 2;
                                const dashOffset = dashArray - (dashArray * Math.min(aqi, 500)) / 500;

                                return (
                                    <div className="flex flex-col items-center mt-4">
                                        <div className="relative" style={{ width: sqSize, height: sqSize }}>
                                            <svg width={sqSize} height={sqSize} viewBox={viewBox} className="rotate-[-90deg]">
                                                {/* Background circle */}
                                                <circle
                                                    className={isDarkMode ? 'stroke-slate-800' : 'stroke-slate-200'}
                                                    cx={sqSize / 2}
                                                    cy={sqSize / 2}
                                                    r={radius}
                                                    strokeWidth={`${strokeWidth}px`}
                                                    fill="transparent"
                                                />
                                                {/* Foreground progress circle */}
                                                <circle
                                                    className="transition-all duration-1005 ease-out"
                                                    cx={sqSize / 2}
                                                    cy={sqSize / 2}
                                                    r={radius}
                                                    strokeWidth={`${strokeWidth}px`}
                                                    fill="transparent"
                                                    stroke={details.barColor}
                                                    strokeDasharray={dashArray}
                                                    strokeDashoffset={dashOffset}
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            
                                            {/* Value Display Overlay */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-4xl font-extrabold tracking-tight">{aqi}</span>
                                                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-0.5">AQI VALUE</span>
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <div className={`mt-6 px-4 py-1.5 rounded-full border text-xs font-bold flex items-center gap-1.5 ${details.color} ${details.bg}`}>
                                            <IconComponent size={14} />
                                            <span>{details.label}</span>
                                        </div>

                                        <p className={`text-xs mt-3 max-w-[220px] leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                            {details.desc}
                                        </p>
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Pollutants Telemetric Grid */}
                        <div className="lg:col-span-2 flex flex-col justify-between">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {Object.keys(telemetry.metrics).map((key) => {
                                    const metric = telemetry.metrics[key];
                                    const limit = metric.limit;
                                    const val = metric.val;
                                    
                                    // Calculate trend
                                    const prevVal = prevMetrics[key];
                                    let trend = 'stable';
                                    let trendDiff = 0;
                                    if (prevVal !== undefined && prevVal !== val) {
                                        trendDiff = val - prevVal;
                                        trend = trendDiff > 0 ? 'up' : 'down';
                                    }

                                    // Status relative to limit
                                    const ratio = val / limit;
                                    let metricColor = 'text-slate-700 dark:text-slate-300';
                                    let progressColor = 'bg-emerald-500';
                                    if (ratio > 1.0) {
                                        metricColor = 'text-rose-500 font-semibold';
                                        progressColor = 'bg-rose-500';
                                    } else if (ratio > 0.8) {
                                        metricColor = 'text-amber-500 font-semibold';
                                        progressColor = 'bg-amber-500';
                                    } else {
                                        progressColor = 'bg-emerald-500';
                                    }

                                    return (
                                        <div 
                                            key={key} 
                                            className={`p-4 rounded-2xl border transition-all duration-300 hover:shadow-md ${
                                                isDarkMode 
                                                    ? 'bg-slate-900/30 border-slate-800/80 hover:border-slate-700' 
                                                    : 'bg-white border-slate-100 hover:border-slate-200'
                                            }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="text-sm font-bold tracking-wide">{metric.label}</h4>
                                                    <p className="text-[10px] text-slate-400 font-medium">{metric.desc}</p>
                                                </div>
                                                
                                                {/* Trend indicator */}
                                                {trend !== 'stable' && (
                                                    <span className={`text-[10px] font-bold flex items-center ${
                                                        trend === 'up' ? 'text-rose-500 animate-pulse' : 'text-emerald-500 animate-pulse'
                                                    }`}>
                                                        {trend === 'up' ? '▲' : '▼'} {Math.abs(trendDiff).toFixed(trendDiff % 1 === 0 ? 0 : 2)}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mt-3 flex items-baseline gap-1">
                                                <span className={`text-2xl font-bold tracking-tight ${metricColor}`}>
                                                    {val}
                                                </span>
                                                <span className="text-xs text-slate-400 font-semibold">{metric.unit}</span>
                                            </div>

                                            {/* Progress Bar towards regulatory limit */}
                                            <div className="mt-3">
                                                <div className="flex justify-between text-[9px] text-slate-400 font-bold mb-1">
                                                    <span>LIMIT: {limit} {metric.unit}</span>
                                                    <span>{Math.round((val / limit) * 100)}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div 
                                                        className={`h-full transition-all duration-1000 ${progressColor}`} 
                                                        style={{ width: `${Math.min(100, (val / limit) * 100)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Station Diagnostics Footer */}
                            <div className={`mt-6 p-4 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs ${
                                isDarkMode ? 'bg-slate-950/40 border-slate-800/80' : 'bg-slate-50/50 border-slate-100'
                            }`}>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full">
                                    <div>
                                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Operator Authority</span>
                                        <span className="font-semibold text-slate-700 dark:text-slate-350">{telemetry.operator}</span>
                                    </div>
                                    <div>
                                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Station Location</span>
                                        <span className="font-semibold text-slate-700 dark:text-slate-350 truncate max-w-[150px] block" title={telemetry.location}>
                                            {telemetry.location}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Signal Quality</span>
                                        <span className="font-semibold text-emerald-500 flex items-center gap-1">
                                            <Wifi size={12} />
                                            <span>{calibrating ? 'Reconnecting...' : '98% (Excellent)'}</span>
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Last Calibration</span>
                                        <span className="font-semibold text-slate-700 dark:text-slate-350">{telemetry.lastCalibrated}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Additional Info Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-950/40 border-slate-800/80' : 'bg-white border-slate-100'}`}
                    >
                        <Wind className="text-emerald-500 mb-3" size={24} />
                        <h3 className="font-bold text-base mb-2">Continuous CAAQMS Integration</h3>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            Our systems feed data using encrypted industrial protocols (Modbus, MQTT) directly to State and Central Pollution Control Boards (SPCB/CPCB) servers.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-950/40 border-slate-800/80' : 'bg-white border-slate-100'}`}
                    >
                        <BarChart3 className="text-emerald-500 mb-3" size={24} />
                        <h3 className="font-bold text-base mb-2">Automatic Web Calibration</h3>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            Supports real-time diagnostics and automatic dilution adjustments. Remote calibration routines can be triggered to verify zero-span stability.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className={`p-6 rounded-2xl border ${isDarkMode ? 'bg-slate-950/40 border-slate-800/80' : 'bg-white border-slate-100'}`}
                    >
                        <ShieldAlert className="text-emerald-500 mb-3" size={24} />
                        <h3 className="font-bold text-base mb-2">Exceedance Alerts</h3>
                        <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            Automated trigger boundaries send immediate email/SMS alerts to plant administrators the moment any metric exceeds localized regulatory limits.
                        </p>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
