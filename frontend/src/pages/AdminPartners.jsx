import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Link as LinkIcon } from 'lucide-react';

const AdminPartners = ({ isDarkMode }) => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [websiteLink, setWebsiteLink] = useState('');
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/partners');
            setPartners(res.data);
        } catch (error) {
            console.error('Error fetching data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('websiteLink', websiteLink);
        if (image) formData.append('image', image);

        try {
            if (editingItem) {
                await axios.put(`http://localhost:5000/api/partners/${editingItem._id}`, formData, {
                    headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post('http://localhost:5000/api/partners', formData, {
                    headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' }
                });
            }
            fetchData();
            resetForm();
        } catch (error) {
            console.error('Error saving', error);
            alert('Failed to save');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this partner?')) return;
        const token = localStorage.getItem('adminToken');
        try {
            await axios.delete(`http://localhost:5000/api/partners/${id}`, {
                headers: { 'x-auth-token': token }
            });
            fetchData();
        } catch (error) {
            console.error('Error deleting', error);
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setName(item.name);
        setWebsiteLink(item.websiteLink || '');
        setImage(null);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setEditingItem(null);
        setName('');
        setWebsiteLink('');
        setImage(null);
        setShowForm(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Manage Partners</h1>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Add or remove partner logos</p>
                </div>
                {!showForm && (
                    <button onClick={() => setShowForm(true)} className="bg-[#5a8bf7] hover:bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
                        <Plus size={20} /> Add Partner
                    </button>
                )}
            </div>

            {showForm && (
                <div className={`p-6 rounded-2xl shadow-sm border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-6 border-b pb-4 dark:border-slate-700">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            {editingItem ? 'Edit Partner' : 'Add New Partner'}
                        </h2>
                        <button onClick={resetForm} className="text-slate-400 hover:text-red-500 transition-colors"><X size={24} /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium">Company Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none focus:border-[#5a8bf7]`} required />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Website Link (Optional)</label>
                                <input type="url" value={websiteLink} onChange={(e) => setWebsiteLink(e.target.value)} className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none focus:border-[#5a8bf7]`} placeholder="https://..." />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Partner Logo</label>
                            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className={`w-full p-2 text-sm rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`} />
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button type="submit" className="bg-[#5a8bf7] hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium">Save Partner</button>
                            <button type="button" onClick={resetForm} className={`px-6 py-2.5 rounded-xl font-medium ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className={`rounded-2xl shadow-sm border overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <table className="w-full text-left">
                    <thead className={`border-b ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                        <tr>
                            <th className="p-4 font-semibold text-sm">Logo</th>
                            <th className="p-4 font-semibold text-sm">Name</th>
                            <th className="p-4 font-semibold text-sm">Website</th>
                            <th className="p-4 font-semibold text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {partners.map(item => (
                            <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                <td className="p-4">
                                    <div className="h-12 w-24 bg-white rounded border flex items-center justify-center p-2">
                                        <img src={item.logoUrl?.startsWith('uploads/') ? `http://localhost:5000/${item.logoUrl}` : item.logoUrl} alt={item.name} className="max-h-full max-w-full object-contain" />
                                    </div>
                                </td>
                                <td className="p-4 font-medium">{item.name}</td>
                                <td className="p-4 text-slate-500 text-sm">
                                    {item.websiteLink ? <a href={item.websiteLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-500 hover:underline"><LinkIcon size={14}/> Link</a> : '-'}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"><Edit2 size={18} /></button>
                                        <button onClick={() => handleDelete(item._id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPartners;
