import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const AdminProducts = ({ isDarkMode }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [details, setDetails] = useState('');
    const [icon, setIcon] = useState('Activity');
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/products');
            setProducts(res.data);
        } catch (error) {
            console.error('Error fetching products', error);
            // alert('Failed to fetch products. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('desc', desc);
        formData.append('details', details);
        formData.append('icon', icon);
        if (image) formData.append('image', image);

        try {
            if (editingProduct) {
                await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, formData, {
                    headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post('http://localhost:5000/api/products', formData, {
                    headers: { 'x-auth-token': token, 'Content-Type': 'multipart/form-data' }
                });
            }
            fetchProducts();
            resetForm();
        } catch (error) {
            console.error('Error saving product', error);
            alert('Failed to save product');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        const token = localStorage.getItem('adminToken');
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`, {
                headers: { 'x-auth-token': token }
            });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product', error);
            alert('Failed to delete product');
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setTitle(product.title);
        setDesc(product.desc);
        setDetails(product.details || '');
        setIcon(product.icon || 'Activity');
        setImage(null);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const resetForm = () => {
        setEditingProduct(null);
        setTitle('');
        setDesc('');
        setDetails('');
        setIcon('Activity');
        setImage(null);
        setShowForm(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Manage Products</h1>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Add, edit, or remove website products</p>
                </div>
                {!showForm && (
                    <button 
                        onClick={() => setShowForm(true)}
                        className="bg-[#5f41e4] hover:bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
                    >
                        <Plus size={20} />
                        Add New Product
                    </button>
                )}
            </div>

            {/* Add/Edit Form */}
            {showForm && (
                <div className={`p-6 rounded-2xl shadow-sm border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-6 border-b pb-4 dark:border-slate-700">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            {editingProduct ? <Edit2 size={20} className="text-[#5f41e4]" /> : <Plus size={20} className="text-[#5f41e4]" />}
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <button onClick={resetForm} className="text-slate-400 hover:text-red-500 transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1 text-sm font-medium">Title</label>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none focus:border-[#5f41e4]`} required />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-medium">Icon Name (lucide-react)</label>
                                <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none focus:border-[#5f41e4]`} placeholder="e.g., Activity, Cpu" />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-medium">Short Description (for cards)</label>
                            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows="2" className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none focus:border-[#5f41e4]`} required />
                        </div>
                        
                        <div>
                            <label className="block mb-1 text-sm font-medium">Detailed Description (for product page)</label>
                            <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows="4" className={`w-full p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'} outline-none focus:border-[#5f41e4]`} />
                        </div>
                        
                        <div>
                            <label className="block mb-1 text-sm font-medium">Product Image</label>
                            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className={`w-full p-2 text-sm rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`} />
                            {editingProduct && editingProduct.imageUrl && (
                                <p className="text-xs mt-2 text-[#5f41e4]">Current image exists. Upload new to replace.</p>
                            )}
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                            <button type="submit" className="bg-[#5f41e4] hover:bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium transition-colors">
                                {editingProduct ? 'Save Changes' : 'Create Product'}
                            </button>
                            <button type="button" onClick={resetForm} className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${isDarkMode ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'}`}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Product List */}
            <div className={`rounded-2xl shadow-sm border overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className={`border-b ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                            <tr>
                                <th className="p-4 font-semibold text-sm">Image</th>
                                <th className="p-4 font-semibold text-sm">Title</th>
                                <th className="p-4 font-semibold text-sm hidden md:table-cell">Description</th>
                                <th className="p-4 font-semibold text-sm">Category</th>
                                <th className="p-4 font-semibold text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">Loading products...</td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">No products found. Click "Add New Product" to get started.</td>
                                </tr>
                            ) : (
                                products.map(product => (
                                    <tr key={product._id} className={`hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors`}>
                                        <td className="p-4">
                                            <div className="w-12 h-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-white flex items-center justify-center overflow-hidden">
                                                <img 
                                                    src={(product.imageUrl && product.imageUrl.startsWith('uploads/')) ? `http://localhost:5000/${product.imageUrl}` : (product.imageUrl || product.image || "/assets/logo.png")} 
                                                    alt={product.title} 
                                                    className="max-w-full max-h-full object-contain"
                                                    onError={(e) => { e.target.src = '/assets/logo.png'; }}
                                                />
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium">{product.title}</td>
                                        <td className="p-4 text-sm text-slate-500 hidden md:table-cell max-w-xs truncate">{product.desc}</td>
                                        <td className="p-4 text-sm">
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#5f41e4]/10 text-[#5f41e4]">
                                                {product.category || 'General'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => handleEdit(product)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                                    <Edit2 size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(product._id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminProducts;
