import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Mail, Lock, User, KeyRound, ArrowRight, Eye, EyeOff } from 'lucide-react';

const AdminAuth = ({ isDarkMode }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [adminSecret, setAdminSecret] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const endpoint = isLogin ? '/api/admin/login' : '/api/admin/signup';
        const body = isLogin 
            ? { email, password } 
            : { name, email, password, adminSecret };

        try {
            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Something went wrong. Please check your credentials.');
            }

            // Save admin token and user details to localStorage
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminUser', JSON.stringify(data.user));

            // Small delay for clean visual transition
            setTimeout(() => {
                navigate('/admin');
            }, 500);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500 ${
            isDarkMode 
                ? 'bg-slate-950 text-slate-100' 
                : 'bg-slate-50 text-slate-800'
        }`}>
            {/* Animated Background Orbs */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[100px] transition-colors duration-500 ${
                        isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-500/10'
                    }`}
                />
                <motion.div 
                    animate={{ 
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -90, 0],
                        x: [0, -50, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className={`absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-[100px] transition-colors duration-500 ${
                        isDarkMode ? 'bg-teal-500/20' : 'bg-teal-500/10'
                    }`}
                />
            </div>

            {/* Glowing Glass Card Container */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-lg z-10"
            >
                {/* Back Link to Public Site */}
                <div className="mb-6 text-center">
                    <button 
                        onClick={() => navigate('/')} 
                        className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                            isDarkMode ? 'text-slate-400 hover:text-emerald-400' : 'text-slate-500 hover:text-emerald-600'
                        }`}
                    >
                        ← Back to SN Enviro Website
                    </button>
                </div>

                <div className={`relative overflow-hidden rounded-3xl border backdrop-blur-xl shadow-2xl transition-all duration-500 ${
                    isDarkMode 
                        ? 'bg-slate-900/60 border-slate-800 shadow-slate-950/50' 
                        : 'bg-white/80 border-slate-200 shadow-slate-200/50'
                }`}>
                    
                    {/* Header Splash Bar */}
                    <div className="h-32 bg-gradient-to-r from-emerald-500 to-emerald-600 flex flex-col items-center justify-center relative p-6">
                        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-inner">
                            <ShieldCheck className="text-white w-8 h-8" />
                        </div>
                        <div className={`absolute -bottom-1 w-full h-4 rounded-t-[100%] transition-colors duration-500 ${
                            isDarkMode ? 'bg-slate-900/90' : 'bg-white'
                        }`} />
                    </div>

                    {/* Content Body */}
                    <div className="p-8 md:p-10 pt-4">
                        
                        {/* Title and Subtitle */}
                        <div className="text-center mb-8">
                            <h2 className={`text-3xl font-extrabold tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                {isLogin ? 'Admin Portal Sign In' : 'Create Administrator'}
                            </h2>
                            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                {isLogin 
                                    ? 'Authorize access to manage products, settings, and partners.' 
                                    : 'Register a secure administrator profile for SN Enviro.'}
                            </p>
                        </div>

                        {/* Slide-in Switch Tabs */}
                        <div className={`flex p-1 border rounded-2xl mb-8 relative transition-colors duration-500 ${
                            isDarkMode ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-100 border-slate-200'
                        }`}>
                            <button
                                onClick={() => { setIsLogin(true); setError(''); }}
                                className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 relative z-10 ${
                                    isLogin 
                                        ? 'text-white font-bold' 
                                        : `${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'}`
                                }`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => { setIsLogin(false); setError(''); }}
                                className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all duration-300 relative z-10 ${
                                    !isLogin 
                                        ? 'text-white font-bold' 
                                        : `${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'}`
                                }`}
                            >
                                Create Account
                            </button>
                            
                            {/* Animated Background Selector */}
                            <motion.div 
                                className="absolute top-1 bottom-1 left-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg shadow-emerald-500/20"
                                layoutId="activeTab"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                style={{
                                    width: 'calc(50% - 4px)',
                                    left: isLogin ? '4px' : 'calc(50%)'
                                }}
                            />
                        </div>

                        {/* Error Notification Alert */}
                        <AnimatePresence mode="wait">
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0, y: -10 }}
                                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                                    exit={{ opacity: 0, height: 0, y: -10 }}
                                    className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl text-center flex items-center justify-center gap-2"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping shrink-0" />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Input Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            
                            {/* Sign Up Name Field */}
                            <AnimatePresence>
                                {!isLogin && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, y: -10 }}
                                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                            Full Name
                                        </label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                            <input
                                                type="text"
                                                required={!isLogin}
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Administrator Name"
                                                className={`w-full pl-12 pr-4 py-3.5 rounded-xl border outline-none transition-all duration-300 focus:ring-2 focus:ring-emerald-500/30 ${isDarkMode ? 'bg-slate-950/40 border-slate-800 text-white placeholder-slate-600 focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-500'}`}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Email Address */}
                            <div>
                                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@snenviro.com"
                                        className={`w-full pl-12 pr-4 py-3.5 rounded-xl border outline-none transition-all duration-300 focus:ring-2 focus:ring-emerald-500/30 ${isDarkMode ? 'bg-slate-950/40 border-slate-800 text-white placeholder-slate-600 focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-500'}`}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Password
                                </label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className={`w-full pl-12 pr-12 py-3.5 rounded-xl border outline-none transition-all duration-300 focus:ring-2 focus:ring-emerald-500/30 ${isDarkMode ? 'bg-slate-950/40 border-slate-800 text-white placeholder-slate-600 focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-500'}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-500 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Sign Up Passcode Field */}
                            <AnimatePresence>
                                {!isLogin && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, y: -10 }}
                                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <label className={`block text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                                Admin Access Passcode
                                            </label>
                                            <span className="text-[10px] text-emerald-500 font-bold">Required to Authorize Role</span>
                                        </div>
                                        <div className="relative group">
                                            <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
                                            <input
                                                type="password"
                                                required={!isLogin}
                                                value={adminSecret}
                                                onChange={(e) => setAdminSecret(e.target.value)}
                                                placeholder="••••••••"
                                                className={`w-full pl-12 pr-4 py-3.5 rounded-xl border outline-none transition-all duration-300 focus:ring-2 focus:ring-emerald-500/30 ${isDarkMode ? 'bg-slate-950/40 border-slate-800 text-white placeholder-slate-600 focus:border-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-emerald-500'}`}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 mt-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/20 active:scale-[0.98] transform flex items-center justify-center gap-2 group disabled:opacity-75 cursor-pointer"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {isLogin ? 'Sign In to Dashboard' : 'Register Admin Account'}
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Bottom Signature Section */}
                    <div className={`p-4 border-t text-center transition-colors duration-500 ${
                        isDarkMode ? 'border-slate-800 bg-slate-950/20' : 'border-slate-100 bg-slate-50/50'
                    }`}>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                            © 2026 SN Enviro Solutions • Secure Admin Gateway
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminAuth;
