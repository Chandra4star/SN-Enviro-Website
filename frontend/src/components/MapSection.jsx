import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Navigation, Building2, ChevronRight } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

// Custom Signature Blue Marker
const createCustomIcon = (color = "#10b981") => {
    return L.divIcon({
        html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 15px ${color}88;"></div>`,
        className: 'custom-map-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
};

const locations = [
    {
        id: 1,
        name: "Corporate Head Office",
        city: "Hyderabad",
        coords: [17.42735, 78.5080124],
        address: "H.no.6-1-279, Plot no.10, Mantri Mansion, Walker Town, Padmarao Nagar, Hyderabad, 500020",
        phone: "+91 73309 33306"
    }
];

// Helper to pan map
function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

const MapSection = ({ isDarkMode }) => {
    const [activeLocation, setActiveLocation] = useState(locations[0]);
    const [zoom, setZoom] = useState(13);

    return (
        <section className={`relative transition-colors duration-500 overflow-hidden ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
            {/* Header Content */}
            <div className="container mx-auto px-4 py-10 md:py-16 relative z-10">
                <div className="max-w-xl mb-8 md:mb-12">
                    <span className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">National Presence</span>
                    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Visit Our <span className="text-emerald-500">Facility</span>
                    </h2>
                    <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
                        Strategically located branches to provide rapid environmental support across India.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row h-[600px] rounded-[3rem] overflow-hidden border shadow-2xl border-transparent group">
                    {/* Sidebar */}
                    <div className={`w-full lg:w-96 overflow-y-auto z-10 p-6 flex flex-col gap-4 border-r transition-colors duration-500 ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'} backdrop-blur-md`}>
                        <h3 className={`text-xl font-bold mb-2 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            <Building2 size={20} className="text-emerald-500" />
                            Branch Locations
                        </h3>

                        <div className="space-y-3">
                            {locations.map((loc) => (
                                <motion.div
                                    key={loc.id}
                                    whileHover={{ x: 5 }}
                                    onClick={() => {
                                        setActiveLocation(loc);
                                        setZoom(15);
                                    }}
                                    className={`p-5 rounded-2xl cursor-pointer transition-all border ${activeLocation.id === loc.id
                                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-xl shadow-emerald-500/20'
                                        : isDarkMode
                                            ? 'bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 text-slate-300'
                                            : 'bg-slate-50 border-slate-100 hover:border-emerald-500/50 text-slate-700 shadow-sm'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-lg">{loc.city}</h4>
                                        <ChevronRight size={16} className={activeLocation.id === loc.id ? 'opacity-100' : 'opacity-30'} />
                                    </div>
                                    <p className={`text-xs mb-3 font-medium opacity-80 ${activeLocation.id === loc.id ? 'text-white' : ''}`}>
                                        {loc.name}
                                    </p>

                                    {activeLocation.id === loc.id && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="space-y-3 pt-3 border-t border-white/20"
                                        >
                                            <div className="flex gap-3 text-[11px] leading-relaxed">
                                                <MapPin size={14} className="shrink-0" />
                                                <span>{loc.address}</span>
                                            </div>
                                            <div className="flex gap-3 text-[11px]">
                                                <Phone size={14} className="shrink-0" />
                                                <span>{loc.phone}</span>
                                            </div>
                                            <a
                                                href={`https://www.google.com/maps/dir/?api=1&destination=${loc.coords[0]},${loc.coords[1]}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2 w-full py-2 bg-white text-emerald-600 rounded-xl font-bold text-xs"
                                            >
                                                <Navigation size={14} />
                                                Get Directions
                                            </a>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Map Container */}
                    <div className="flex-grow relative bg-slate-200">
                        <MapContainer
                            center={activeLocation.coords}
                            zoom={zoom}
                            style={{ height: '100%', width: '100%' }}
                            zoomControl={false}
                        >
                            <ChangeView center={activeLocation.coords} zoom={zoom} />
                            <TileLayer
                                url={isDarkMode
                                    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                                    : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'}
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                            />

                            {locations.map((loc) => (
                                <Marker
                                    key={loc.id}
                                    position={loc.coords}
                                    icon={createCustomIcon(loc.id === activeLocation.id ? "#10b981" : isDarkMode ? "#ffffff" : "#0f172a")}
                                    eventHandlers={{
                                        click: () => {
                                            setActiveLocation(loc);
                                            setZoom(15);
                                        },
                                    }}
                                >
                                    <Popup className="custom-popup">
                                        <div className="p-2">
                                            <h5 className="font-bold text-slate-900">{loc.name}</h5>
                                            <p className="text-xs text-slate-600">{loc.city}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>

                        {/* Map Overlay Button */}
                        <div className="absolute top-6 right-6 z-[400] flex flex-col gap-2">
                            <div className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border ${isDarkMode ? 'bg-slate-900/50 border-slate-700 text-white' : 'bg-white/50 border-slate-200 text-slate-900'}`}>
                                {activeLocation.city} Facility Active
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decorative Pattern */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/5 pointer-events-none skew-x-12 translate-x-1/2"></div>
        </section>
    );
};

export default MapSection;
