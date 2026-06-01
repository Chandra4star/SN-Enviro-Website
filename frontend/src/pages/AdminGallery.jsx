import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const AdminGallery = ({ isDarkMode }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('General');
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/gallery');
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
        formData.append('title', title);
        formData.append('category', category);
        if (image) formData.append('image', image);

        try {
            if (editingItem) {
                await axios.put(`http://localhost:5000/api/gallery/${editingItem._id}`, formData, {
                    headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post('http://localhost:5000/api/gallery', formData, {
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
            await axios.delete(`http://localhost:5000/api/gallery/${id}`, {
                headers: { 'x-auth-token': token }
            });
            fetchData();
        } catch (error) {
            console.error('Error deleting', error);
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setTitle(item.title);
        setCategory(item.category || 'General');
        setImage(null);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setEditingItem(null);
        setTitle('');
        setCategory('General');
        setImage(null);
        setShowForm(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Gallery Images</h1>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Manage website media</p>
                </div>
                {!showForm && (
                    <button onClick={() => setShowForm(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors cursor-pointer">
                        <Plus size={20} /> Add Image
                    </button>
                )}
            </div>

            {showForm && (
                <div className={`p-6 rounded-2xl shadow-sm border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-6 border-b pb-4 dark:border-slate-700">
                        <h2 className="text-xl font-bold">{editingItem ? 'Edit Image' : 'Add New Image'}</h2>
                        <button onClick={resetForm} className="text-slate-400 hover:text-red-500 transition-colors"><X size={24} /></button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium">Image Title</label>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20`} required />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Category</label>
                                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20`} />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Upload Image</label>
                            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className={`w-full p-2 text-sm rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`} />
                        </div>
                        <div className="flex gap-3 pt-4">
                            <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium cursor-pointer">Save Image</button>
                            <button type="button" onClick={resetForm} className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'}`}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map(item => (
                    <div key={item._id} className={`rounded-xl border overflow-hidden shadow-sm group relative ${isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'}`}>
                        <div className="aspect-video bg-slate-100 flex items-center justify-center overflow-hidden relative">
                            <img src={item.imageUrl?.startsWith('uploads/') ? `http://localhost:5000/${item.imageUrl}` : item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                            {/* Actions Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button onClick={() => handleEdit(item)} className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(item._id)} className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"><Trash2 size={16} /></button>
                            </div>
                        </div>
                        <div className="p-3">
                            <p className="font-medium text-sm truncate">{item.title}</p>
                            <span className="text-[10px] uppercase font-bold text-slate-400">{item.category}</span>
                        </div>
                    </div>
                ))}
                {items.length === 0 && !loading && (
                    <div className="col-span-full p-12 text-center text-slate-500 border border-dashed rounded-2xl dark:border-slate-700">
                        No images found. Upload some to build your gallery.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminGallery;
