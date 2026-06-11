import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Star } from 'lucide-react';

const AdminTestimonials = ({ isDarkMode }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(5);
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/testimonials');
            setItems(res.data);
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
        formData.append('role', role);
        formData.append('content', content);
        formData.append('rating', rating);
        if (image) formData.append('image', image);

        try {
            if (editingItem) {
                await axios.put(`http://localhost:5000/api/testimonials/${editingItem._id}`, formData, {
                    headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post('http://localhost:5000/api/testimonials', formData, {
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
        if (!window.confirm('Are you sure you want to delete?')) return;
        const token = localStorage.getItem('adminToken');
        try {
            await axios.delete(`http://localhost:5000/api/testimonials/${id}`, {
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
        setRole(item.role);
        setContent(item.content);
        setRating(item.rating);
        setImage(null);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setEditingItem(null);
        setName('');
        setRole('');
        setContent('');
        setRating(5);
        setImage(null);
        setShowForm(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Manage Testimonials</h1>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Add client reviews</p>
                </div>
                {!showForm && (
                    <button onClick={() => setShowForm(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors cursor-pointer">
                        <Plus size={20} /> Add Review
                    </button>
                )}
            </div>

            {showForm && (
                <div className={`p-6 rounded-2xl shadow-sm border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-6 border-b pb-4 dark:border-slate-700">
                        <h2 className="text-xl font-bold">{editingItem ? 'Edit Review' : 'Add New Review'}</h2>
                        <button onClick={resetForm} className="text-slate-400 hover:text-red-500 transition-colors"><X size={24} /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium">Client Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20`} required />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Role / Company</label>
                                <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20`} required />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Review Content</label>
                            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="3" className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20`} required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium">Rating (1-5)</label>
                                <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20`} required />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Client Photo (Avatar)</label>
                                <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className={`w-full p-2 text-sm rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`} />
                            </div>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium cursor-pointer">Save Review</button>
                            <button type="button" onClick={resetForm} className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'}`}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className={`rounded-2xl shadow-sm border overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <table className="w-full text-left">
                    <thead className={`border-b ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                        <tr>
                            <th className="p-4 font-semibold text-sm">Avatar</th>
                            <th className="p-4 font-semibold text-sm">Name & Role</th>
                            <th className="p-4 font-semibold text-sm hidden md:table-cell">Review</th>
                            <th className="p-4 font-semibold text-sm">Rating</th>
                            <th className="p-4 font-semibold text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                        {items.map(item => (
                            <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                <td className="p-4">
                                    <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden">
                                        {item.avatarUrl ? (
                                            <img src={item.avatarUrl.startsWith('uploads/') ? `http://localhost:5000/${item.avatarUrl}` : item.avatarUrl} alt={item.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <span className="font-bold text-slate-500">{item.name.charAt(0)}</span>
                                        )}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-xs text-slate-500">{item.role}</p>
                                </td>
                                <td className="p-4 text-slate-500 text-sm hidden md:table-cell max-w-xs truncate">{item.content}</td>
                                <td className="p-4 text-amber-500 flex items-center gap-1 mt-2">
                                    {Array(item.rating).fill().map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
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

export default AdminTestimonials;
