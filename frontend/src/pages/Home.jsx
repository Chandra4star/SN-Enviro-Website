import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Products from '../components/Products';
import Services from '../components/Services';
import Clients from '../components/Clients';
import Certifications from '../components/Certifications';
import Careers from '../components/Careers';
import Blog from '../components/Blog';
import MapSection from '../components/MapSection';
import Contact from '../components/Contact';

const Home = ({ isDarkMode }) => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location]);

    return (
        <main className="flex-grow">
            <Hero isDarkMode={isDarkMode} />
            <About isDarkMode={isDarkMode} />
            <Products isDarkMode={isDarkMode} />
            <Services isDarkMode={isDarkMode} />
            <Clients isDarkMode={isDarkMode} />
            <Certifications isDarkMode={isDarkMode} />
            <Careers isDarkMode={isDarkMode} />
            <Blog isDarkMode={isDarkMode} />
            <Contact isDarkMode={isDarkMode} />
            <MapSection isDarkMode={isDarkMode} />
        </main>
    );
};

export default Home;
