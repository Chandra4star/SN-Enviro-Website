import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PublicLayout = ({ children, isDarkMode, toggleTheme, onOpenPartnerPortal }) => {
    return (
        <>
            <Header
                isDarkMode={isDarkMode}
                toggleTheme={toggleTheme}
                onOpenPartnerPortal={onOpenPartnerPortal}
            />
            <main>
                {children}
            </main>
            <Footer isDarkMode={isDarkMode} />
        </>
    );
};

export default PublicLayout;
