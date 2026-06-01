import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save } from 'lucide-react';

const AdminAbout = ({ isDarkMode }) => {
    const [aboutText, setAboutText] = useState('');
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/settings');
            if (res.data.about_text) setAboutText(res.data.about_text);
            if (res.data.about_image) setCurrentImage(res.data.about_image);
        } catch (error) {
            console.error('Error fetching settings', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('adminToken');
        
        const formData = new FormData();
        formData.append('about_text', aboutText);
        if (image) {
            formData.append('image', image);
        }

        try {
            await axios.post('http://localhost:5000/api/settings', formData, {
                headers: { 
                    'x-auth-token': token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('About settings updated successfully!');
            fetchSettings();
        } catch (error) {
            console.error('Error saving settings', error);
            alert('Failed to save settings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Manage About Section</h1>
                <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Update the About SN Enviro description and image</p>
            </div>

            <form onSubmit={handleSubmit} className={`p-6 rounded-2xl shadow-sm border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} space-y-6`}>
                <div>
                    <label className="block mb-2 text-sm font-medium">About Text</label>
                    <textarea 
                        value={aboutText} 
                        onChange={(e) => setAboutText(e.target.value)} 
                        rows={6}
                        className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20`} 
                        placeholder="Founded in January 2017 by a team of seasoned technocrats..."
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">About Image</label>
                    {currentImage && (
                        <div className="mb-4">
                            <p className="text-sm mb-2">Current Image:</p>
                            <img 
                                src={currentImage.startsWith('http') ? currentImage : `http://localhost:5000/${currentImage}`} 
                                alt="Current About" 
                                className="h-40 rounded-xl object-cover"
                            />
                        </div>
                    )}
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setImage(e.target.files[0])} 
                        className={`w-full p-2 text-sm rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`} 
                    />
                </div>

                <div className="pt-4 border-t dark:border-slate-700">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        <Save size={18} /> {loading ? 'Saving...' : 'Save About Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminAbout;
