import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/AdminDashboard';
import AdminProducts from '../pages/AdminProducts';
import AdminPartners from '../pages/AdminPartners';
import AdminTestimonials from '../pages/AdminTestimonials';
import AdminGallery from '../pages/AdminGallery';
import AdminAbout from '../pages/AdminAbout';
import AdminSettings from '../pages/AdminSettings';

const AdminRoutes = ({ isDarkMode }) => {
    return (
        <AdminLayout isDarkMode={isDarkMode}>
            <Routes>
                <Route path="/" element={<AdminDashboard isDarkMode={isDarkMode} />} />
                <Route path="/products" element={<AdminProducts isDarkMode={isDarkMode} />} />
                <Route path="/partners" element={<AdminPartners isDarkMode={isDarkMode} />} />
                <Route path="/testimonials" element={<AdminTestimonials isDarkMode={isDarkMode} />} />
                <Route path="/gallery" element={<AdminGallery isDarkMode={isDarkMode} />} />
                <Route path="/about" element={<AdminAbout isDarkMode={isDarkMode} />} />
                <Route path="/settings" element={<AdminSettings isDarkMode={isDarkMode} />} />
            </Routes>
        </AdminLayout>
    );
};

export default AdminRoutes;
