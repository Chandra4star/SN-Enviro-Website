import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';

// Importing Modular Components from FLAT structure
import Header from './components/Header';
import Footer from './components/Footer';
import PartnerPortal from './components/PartnerPortal';
import ChatBotComponent from './components/ChatBotComponent';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy Load Pages
const Home = lazy(() => import('./pages/Home'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));

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

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ErrorBoundary>
      <Router>
        <div className={`flex flex-col min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 text-slate-200' : 'bg-white text-slate-900'}`}>

          <Header
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            onOpenPartnerPortal={() => setIsPortalOpen(true)}
          />

          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home isDarkMode={isDarkMode} />} />
              <Route path="/product/:id" element={<ProductDetails isDarkMode={isDarkMode} />} />
            </Routes>
          </Suspense>

          <Footer isDarkMode={isDarkMode} />

          {/* Partner Portal Modal */}
          <PartnerPortal
            isOpen={isPortalOpen}
            onClose={() => setIsPortalOpen(false)}
            isDarkMode={isDarkMode}
          />

          <ChatBotComponent />

        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
