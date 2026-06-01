import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';

// Importing Modular Components from FLAT structure
import PartnerPortal from './components/PartnerPortal';
import ErrorBoundary from './components/ErrorBoundary';

// Layouts & Routes
import PublicLayout from './layouts/PublicLayout';
import AdminRoutes from './routes/AdminRoutes';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Loading Fallback
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900">
    <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  // Sync theme with document class for Tailwind dark: modifiers
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Track visitor session (once per browser tab session)
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('visited');
    if (!hasVisited) {
      fetch('http://localhost:5000/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pagePath: window.location.pathname + window.location.hash,
          referrer: document.referrer || ''
        })
      })
      .then(res => {
        if (res.ok) {
          sessionStorage.setItem('visited', 'true');
        }
      })
      .catch(err => console.error('Error reporting visit:', err));
    }
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ErrorBoundary>
      <Router>
        <div className={`flex flex-col min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 text-slate-200' : 'bg-white text-slate-900'}`}>

          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Public Routes - Wrapped in PublicLayout */}
              <Route path="/" element={
                <PublicLayout isDarkMode={isDarkMode} toggleTheme={toggleTheme} onOpenPartnerPortal={() => setIsPortalOpen(true)}>
                  <Home isDarkMode={isDarkMode} />
                </PublicLayout>
              } />
              <Route path="/product/:id" element={
                <PublicLayout isDarkMode={isDarkMode} toggleTheme={toggleTheme} onOpenPartnerPortal={() => setIsPortalOpen(true)}>
                  <ProductDetails isDarkMode={isDarkMode} />
                </PublicLayout>
              } />
              <Route path="/dashboard" element={
                <PublicLayout isDarkMode={isDarkMode} toggleTheme={toggleTheme} onOpenPartnerPortal={() => setIsPortalOpen(true)}>
                  <Dashboard isDarkMode={isDarkMode} />
                </PublicLayout>
              } />

              {/* Admin Routes - Handled entirely by AdminRoutes */}
              <Route path="/admin/*" element={<AdminRoutes isDarkMode={isDarkMode} />} />
            </Routes>
          </Suspense>

          {/* Partner Portal Modal */}
          <PartnerPortal
            isOpen={isPortalOpen}
            onClose={() => setIsPortalOpen(false)}
            isDarkMode={isDarkMode}
          />

        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
