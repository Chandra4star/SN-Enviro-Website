import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save } from 'lucide-react';

const AdminSettings = ({ isDarkMode }) => {
    const [settings, setSettings] = useState({
        hero_title: 'Precision Environmental Monitoring',
        hero_subtitle: 'Technologically Advanced Systems for Real-Time Analysis',
        contact_email: 'info@sn-enviro.com',
        contact_phone: '+91 9876543210',
        contact_address: '123 Tech Park, Innovation City'
    });
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            try {
                const res = await axios.get('http://localhost:5000/api/settings');
                // Merge fetched settings over default settings
                setSettings(prev => ({ ...prev, ...res.data }));
            } catch (err) {
                console.error('Error fetching settings', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (e) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        const token = localStorage.getItem('adminToken');
        try {
            await axios.post('http://localhost:5000/api/settings', settings, {
                headers: { 'x-auth-token': token }
            });
            alert('Settings saved successfully!');
        } catch (err) {
            console.error('Error saving settings', err);
            alert('Failed to save settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8">Loading settings...</div>;

    return (
        <div className="space-y-6 max-w-4xl">
            <div>
                <h1 className="text-2xl font-bold">Site Settings</h1>
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Manage global text and contact information</p>
            </div>

            <form onSubmit={handleSave} className={`p-8 rounded-2xl shadow-sm border space-y-8 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                
                {/* Hero Section Info */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold border-b pb-2 dark:border-slate-700">Home Page Hero Section</h2>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Hero Title</label>
                        <input type="text" name="hero_title" value={settings.hero_title || ''} onChange={handleChange} className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20`} />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Hero Subtitle</label>
                        <textarea name="hero_subtitle" value={settings.hero_subtitle || ''} onChange={handleChange} rows="2" className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20`} />
                    </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold border-b pb-2 dark:border-slate-700">Global Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">Contact Email</label>
                            <input type="email" name="contact_email" value={settings.contact_email || ''} onChange={handleChange} className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20`} />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Contact Phone</label>
                            <input type="text" name="contact_phone" value={settings.contact_phone || ''} onChange={handleChange} className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20`} />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium">Office Address</label>
                        <textarea name="contact_address" value={settings.contact_address || ''} onChange={handleChange} rows="2" className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20`} />
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button type="submit" disabled={saving} className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer">
                        <Save size={20} />
                        {saving ? 'Saving...' : 'Save All Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminSettings;
