import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, XCircle, Activity, Info, FileText, Settings, Layers, Zap, Wrench, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const ProductDetails = ({ isDarkMode }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const tabs = [
        { id: 'overview', label: 'Overview', icon: FileText },
        { id: 'specs', label: 'Specs & Compliance', icon: Settings },
        { id: 'applications', label: 'Applications', icon: Layers },
        { id: 'faqs', label: 'FAQs & More', icon: HelpCircle }
    ];

    const defaultProductList = [
        {
            _id: "698da53e5bff466e7fbecc3b",
            title: "Continuous Ambient Air Quality Monitoring Stations (CAAQMS)",
            category: "Ambient Monitor",
            desc: "Complete self-contained stations for precise urban air quality management.",
            details: "The S.N. Enviro CAAQMS is a state-of-the-art solution for monitoring ambient air quality. It integrates multiple gas analyzers (SO2, NOx, CO) and particulate monitors.",
            longDescription: "Continuous Ambient Air Quality Monitoring Systems (CAAQMS) are vital tools for urban air quality management. Unlike stack monitoring, which measures high concentrations at the source, CAAQMS measures trace levels of pollutants in the ambient air we breathe. This requires high-sensitivity analyzers often operating in the low parts-per-billion (ppb) range.\n\nOur CAAQMS station is a self-contained, climate-controlled shelter housing a suite of reference-method analyzers. These typically include Pulsed UV Fluorescence for SO2, Chemiluminescence for NOx, Gas Filter Correlation (GFC) for CO, and UV Photometry for Ozone. Additionally, Beta Attenuation Monitors (BAM) are employed for the precise mass measurement of Particulate Matter (PM10 and PM2.5).",
            operatingPrinciple: "Each pollutant is measured using its specific US EPA approved reference method:\n- SO2: Pulsed UV Fluorescence (Excitation at 214nm)\n- NOx: Chemiluminescence (Reaction with Ozone)\n- CO: Gas Filter Correlation Non-Dispersive Infrared (GFC-NDIR)\n- O3: UV Photometry (Absorption at 254nm)\n- PM10/2.5: Beta Ray Attenuation (BAM) or Light Scattering",
            applications: [
                "Urban Air Quality Networks (Smart Cities)",
                "Industrial Perimeter Monitoring",
                "Roadside Traffic Pollution Monitoring",
                "Environmental Impact Assessment Studies",
                "Research Institutes and Universities"
            ],
            installation: "The installation of a CAAQMS requires a scientifically selected site free from direct obstructions. A concrete plinth (typically 1.5ft high) is constructed to support the shelter. The sampling inlet is positioned at a height of 3-10 meters from the ground level with a 120-degree open arc. The station requires a stable 230V AC power supply (5kW load) and a dedicated earthing pit.",
            faqs: [
                {
                    question: "What is the full form of CAAQMS data?",
                    answer: "CAAQMS stands for Continuous Ambient Air Quality Monitoring Station. The data generated is real-time, time-stamped concentration values of various pollutants."
                },
                {
                    question: "Which pollutants are commonly monitored in CAAQMS?",
                    answer: "The pollutants commonly monitored include Particulate Matter (PM10 and PM2.5), Sulfur Dioxide (SO2), Nitrogen Oxides (NOx), Carbon Monoxide (CO), Ozone (O3), Ammonia (NH3), and Volatile Organic Compounds (Benzene, Toluene, Xylene)."
                },
                {
                    question: "What are the 5 indicators of air quality?",
                    answer: "The five major air pollutants regulated by the Clean Air Act and used to calculate the Air Quality Index (AQI) are: 1. Ground-level Ozone, 2. Particle Pollution (PM2.5 and PM10), 3. Carbon Monoxide, 4. Sulfur Dioxide, and 5. Nitrogen Dioxide."
                },
                {
                    question: "How does regulatory monitoring work in real-time?",
                    answer: "In regulatory monitoring, data from the analyzers is collected every second, averaged over 15-minute or 1-hour intervals, and transmitted via a secure server to the Central Pollution Control Board (CPCB) or SPCB servers. This allows regulators and the public to view air quality status instantly."
                }
            ],
            technicalSpecs: [
                { label: "Shelter Type", value: "Insulated Container with Climate Control (25°C ± 1°C)" },
                { label: "SO2 LDL", value: "< 0.5 ppb" },
                { label: "NOx LDL", value: "< 0.4 ppb" },
                { label: "Ozone LDL", value: "< 0.5 ppb" },
                { label: "CO LDL", value: "< 0.04 ppm" },
                { label: "PM Measurement", value: "0-1000 µg/m³ (Beta Attenuation)" },
                { label: "Met Sensors", value: "Wind Speed, Direction, Temp, RH, Solar Radiation, Rainfall" },
                { label: "Calibration", value: "Built-in Dynamic Gas Dilution System" }
            ],
            compliance: "US EPA Designated Reference Methods, EU Directive 2008/50/EC.",
            imageUrl: "/assets/CAAQMS.png",
            features: ["Multi-gas analysis (SO2, NOx, CO, O3)", "PM-10 and PM-2.5 monitoring", "Meteorological sensors integration", "Real-time data logging and display"],
            pros: ["High precision sensors for accurate readings", "Comprehensive monitoring of multiple pollutants", "Remote monitoring capabilities via internet"],
            cons: ["Requires regular maintenance and calibration"]
        },
        {
            _id: "698da53e5bff466e7fbecc39",
            title: "Continuous Emission Monitoring Systems (CEMS)",
            category: "Emission Monitor",
            desc: "Regulatory compliance solutions for industrial stack emissions.",
            details: "Our SCS-900UV CEMS is a comprehensive solution specifically designed for stack gas applications. It utilizes direct extract or dilution extractive methods.",
            longDescription: `The SCS-900UV is a turnkey CEMS solution designed for the most demanding compliance monitoring applications. It integrates the precision of UV-DOAS analysis with a robust sampling system engineered to handle high-temperature, high-dust, and corrosive gas streams.\n\nThe system employs a heated sampling probe and line to transport the flue gas to the analyzer cabinet, maintaining the temperature above the acid dew point to prevent condensation and corrosion. This 'hot-wet' approach ensures that the sample remains representative of the stack conditions.`,
            operatingPrinciple: "The system extracts flue gas via a heated probe with a specialized filter. The gas travels through a heated sample line (maintained at 180°C) to the analysis cabinet. There, it may undergo conditioning (water removal for cold-dry measurement) or be measured hot-wet depending on the target gases. The UV analyzer determines concentrations using differential optical absorption. Periodic zero and span gases are automatically injected at the probe tip to verify system integrity.",
            applications: [
                "Thermal Power Plants (Coal, Gas, Biomass)",
                "Cement Manufacturing Kilns",
                "Waste-to-Energy Plants",
                "Metal Purification & Smelting",
                "Paper and Pulp Industry Boilers"
            ],
            installation: "CEMS installation requires mounting a sampling probe on the stack/duct through a standard DN100 flange. A safe working platform with ladder access must be provided at the sampling location. The analyzer cabinet is installed in a vibration-free, weather-protected room (or shelter) at the base of the stack. A heated sample line connects the probe to the cabinet.",
            faqs: [
                {
                    question: "What is CEMS?",
                    answer: "CEMS stands for Continuous Emission Monitoring System. It represents the total equipment necessary for the determination of a gas or particulate matter concentration or emission rate using pollutant analyzer measurements."
                },
                {
                    question: "Why is CEMS required?",
                    answer: "CEMS is mandatory for 17 categories of highly polluting industries by the CPCB to demonstrate continuous compliance with environmental emission standards."
                },
                {
                    question: "What is the difference between In-Situ and Extractive CEMS?",
                    answer: "In-Situ CEMS measures gases directly inside the stack using a cross-stack laser or probe. Extractive CEMS draws a gas sample out of the stack, conditions it, and measures it in a climate-controlled cabinet. Extractive systems are generally more easier to maintain and calibrate."
                }
            ],
            technicalSpecs: [
                { label: "Measurement Method", value: "Hot-Wet Extractive or Cold-Dry Extractive" },
                { label: "Gases Measured", value: "SO2, NO, NO2, CO, CO2, O2, HCl, HF, NH3" },
                { label: "Sample Temperature", value: "Maintained > 180°C throughout sampling path" },
                { label: "Dust Load Handling", value: "Up to 20 g/m³ (with pre-separator)" },
                { label: "Probe Material", value: "SS316L, Hastelloy C276, or PTFE Coated" },
                { label: "Calibration", value: "Automatic Zero/Span via Solenoid Control" },
                { label: "Cabinet Dimensions", value: "2000mm (H) x 800mm (W) x 800mm (D)" },
                { label: "Cabinet Climate Control", value: "Integrated AC Unit (1500W Cooling)" }
            ],
            compliance: "Fully compliant with EN 14181 (QAL1, QAL2, QAL3) and US EPA 40 CFR 60/75.",
            imageUrl: "/assets/CEMS.jpg",
            features: ["Continuous stack gas emission monitoring", "Compliance with environmental regulations", "Integrated data acquisition system", "Automated calibration routines"],
            pros: ["Direct measurement of gases without heavy conditioning", "High reliability in harsh stack environments", "Low operational costs due to robust design"],
            cons: ["Requires regular filter cleaning in high-dust applications"]
        },
        {
            _id: "698da53e5bff466e7fbecc40",
            title: "Effluent Quality Monitoring Systems (EQMS)",
            category: "Water Quality",
            desc: "Real-time water quality analysis for industrial discharge compliance.",
            details: "Our EQMS solutions provide continuous, real-time measurement of critical water quality parameters in effluent discharge, ensuring compliance with CPCB and SPCB norms.",
            longDescription: "The Effluent Quality Monitoring System (EQMS) is designed to monitor the quality of treated water discharged from manufacturing units, STP, and ETP plants. Real-time monitoring of effluent ensures that industries meet the statutory requirements set by environmental control boards. Our systems are rugged, reliable, and designed for harsh industrial environments.\n\nThe system typically comprises a sampling extraction pump, a multi-parameter controller, and a suite of digital sensors. Unlike traditional wet-chemistry analyzers, our optical and electrochemical sensors require no reagents, significantly reducing operating costs and maintenance requirements.",
            operatingPrinciple: "The system uses specific sensor technologies for each parameter:\n- pH: Electrochemical glass electrode with reference junction.\n- COD/BOD: UV-Visible Spectrophotometry (sac method @ 254nm/550nm).\n- TSS: IR Nephelometry (90° scattered light).\n- Flow: Electromagnetic or Ultrasonic flow measurement.",
            applications: [
                "Common Effluent Treatment Plants (CETP)",
                "Sewage Treatment Plants (STP)",
                "Textile Dyeing & Printing Units",
                "Pharmaceutical Manufacturing",
                "Pulp & Paper Industry",
                "Chemical Processing Plants"
            ],
            installation: "The sensors are typically mounted directly into the open channel or final discharge tank using a mounting stand. For pressurized lines, flow cells are used. The controller is mounted on a nearby wall or stand. It requires a stable power supply and an internet connection (or GPRS signal) for data transmission.",
            faqs: [
                {
                    question: "What parameters are mandatory for EQMS?",
                    answer: "Typically, pH, COD (Chemical Oxygen Demand), BOD (Biological Oxygen Demand), TSS (Total Suspended Solids), and Flow are mandatory for most industries."
                },
                {
                    question: "Do these sensors require reagents?",
                    answer: "No, our optical (COD/BOD/TSS) and electrochemical (pH) sensors are reagent-free, meaning they don't consume chemicals during operation, reducing running costs."
                },
                {
                    question: "How often is calibration needed?",
                    answer: "Standard calibration intervals are 1-3 months depending on the effluent quality, although automatic cleaning mechanisms significantly extend maintenance cycles."
                }
            ],
            technicalSpecs: [
                { label: "pH Range", value: "0 - 14 pH (Accuracy ± 0.1 pH)" },
                { label: "COD Range", value: "0 - 1000 / 5000 mg/L (Optical)" },
                { label: "BOD Range", value: "0 - 500 / 1000 mg/L (Derived)" },
                { label: "TSS Range", value: "0 - 1000 / 4000 mg/L" },
                { label: "Flow Measurement", value: "m³/hr with Totalizer" },
                { label: "Cleaning", value: "Automatic Air/Water cleaning wiper" },
                { label: "Communication", value: "RS-485 Modbus, 4-20mA" },
                { label: "Power Supply", value: "220V AC / 24V DC" }
            ],
            compliance: "Meets CPCB & SPCB guidelines for Real-time Online Effluent Monitoring.",
            imageUrl: "/assets/EQMS.jpg",
            features: ["Reagent-free optical measurement statistics", "Automatic sensor cleaning mechanism", "Real-time data transmission to central server", "Rugged IP68 submersible sensors"],
            pros: ["Low maintenance (No chemical reagents)", "Instantaneous response time", "Long sensor life (> 3 years)"],
            cons: ["Periodic calibration required against lab samples"]
        },
        {
            _id: "698da53e5bff466e7fbecc41",
            title: "Weather Monitoring Systems (WMS)",
            category: "Meteorology",
            desc: "High-precision meteorological sensors for environmental data analysis.",
            details: "An integrated Automatic Weather Station (AWS) for measuring local meteorological conditions critical for dispersion modeling and environmental analysis.",
            longDescription: "Our Weather Monitoring Systems are compact, robust, and highly accurate Automatic Weather Stations (AWS) designed for industrial and environmental applications. These systems provide critical data for air quality dispersion modeling, allowing industries to understand how emissions will spread based on wind and atmospheric stability.\n\nThe station typically includes sensors for Wind Speed, Wind Direction, Ambient Temperature, Relative Humidity, Rainfall, and Solar Radiation. The data is logged and integrated with Air Quality data to provide pollution roses and wind roses.",
            operatingPrinciple: "Wind speed and direction are measured using ultra-sonic technology which has no moving parts, ensuring high durability. Temperature and Humidity are measured using capacitive MEMS sensors. Rainfall is measured using a tipping bucket mechanism or optical drop counters.",
            applications: [
                "Industrial Complexes",
                "Solar and Wind Power Plants",
                "Agricultural Research",
                "Airports and Aviation",
                "Disaster Management Services"
            ],
            installation: "The WMS is installed on a 3-meter to 10-meter meteorological mast, which must be guy-wired for stability. The wind sensors must be aligned to True North. The site should be away from tall buildings or trees that could cause wind turbulence.",
            faqs: [
                {
                    question: "Why is weather monitoring important for air quality?",
                    answer: "Weather data, specifically wind speed and direction, helps in creating 'Pollution Roses' which indicate the source of pollution. It is essential for dispersion modeling."
                },
                {
                    question: "What maintenance does the system require?",
                    answer: "Ultrasonic sensors are solid-state and require very little maintenance. Standard checks include cleaning the rain gauge filter and verifying sensor alignment annually."
                }
            ],
            technicalSpecs: [
                { label: "Wind Speed", value: "0 - 60 m/s (Ultrasonic)" },
                { label: "Wind Direction", value: "0 - 359 degrees" },
                { label: "Temperature", value: "-40°C to +60°C" },
                { label: "Humidity", value: "0 - 100% RH" },
                { label: "Solar Radiation", value: "0 - 2000 W/m² (Pyranometer)" },
                { label: "Data Logger", value: "Multi-channel with SD Card Storage" },
                { label: "Mast Height", value: "3 meters / 6 meters / 10 meters (Guy wired)" }
            ],
            compliance: "WMO (World Meteorological Organization) standards compliant.",
            imageUrl: "/assets/Gemini_Generated_Image_srgh2jsrgh2jsrgh.png",
            features: ["Ultrasonic sensors (No moving parts)", "All-in-one compact design available", "Solar power compatibility", "Seamless integration with CEMS/CAAQMS"],
            pros: ["High durability and no mechanical wear", "Low power consumption", "Easy to install and maintain"],
            cons: ["Ultrasonic sensors sensitive to heavy bird fouling"]
        },
        {
            _id: "698da53e5bff466e7fbecc42",
            title: "Smart City Environmental Monitoring Solutions",
            category: "Urban IoT",
            desc: "Compact, low-cost sensor networks for hyper-local pollution mapping.",
            details: "A dense network of compact, IoT-enabled environmental nodes designed to visualize air quality at a street level across smart cities.",
            longDescription: "Traditional CAAQMS stations are highly accurate but expensive and large, limiting the number of locations that can be monitored. Our Smart City Environmental Monitoring Solution bridges this gap by deploying networks of compact, cost-effective sensor nodes. By installing these on street poles, traffic lights, and bus stops, cities can generate a hyper-local map of pollution hotspots.\n\nThese nodes utilize advanced Laser Scattering for particulate matter (PM2.5/PM10) and Electrochemical sensors for gases. While not reference grade, they provide excellent relative trends and actionable insights for traffic management and public health warnings.",
            operatingPrinciple: "The node uses Laser Scattering to count particles and estimate mass concentration. Electrochemical fuel cells generate small currents proportional to gas concentrations (NO2, CO, O3, SO2). An on-board MCU processes signals, applies temperature/humidity compensation algorithms, and transmits data via 4G/LTE or LoRaWAN.",
            applications: [
                "Smart City Infrastructure",
                "Traffic Intersection Management",
                "School and Hospital Campuses",
                "Construction Site Monitoring",
                "Public Parks and Jogging Tracks"
            ],
            installation: "The compact nodes can be clamped onto existing infrastructure like utility poles or streetlights at a height of 3-4 meters. They can be powered via a solar panel or directly from the streetlight power supply.",
            faqs: [
                {
                    question: "How accurate are these compared to reference stations?",
                    answer: "These are 'indicative' monitors. While they correlate well with reference stations (R² > 0.8), they are intended for identifying trends and hotspots rather than regulatory compliance."
                },
                {
                    question: "What is the expected sensor life?",
                    answer: "Electrochemical sensors typically last 18-24 months depending on the pollution levels and environmental conditions."
                }
            ],
            technicalSpecs: [
                { label: "Parameters", value: "PM2.5, PM10, NO2, CO, O3, SO2, Temp, RH" },
                { label: "Sensor Technology", value: "Laser Scattering & Electrochemical" },
                { label: "Connectivity", value: "GSM / 4G / NB-IoT / LoRaWAN / Wi-Fi" },
                { label: "Power", value: "12V DC or Solar Panel + Battery" },
                { label: "Enclosure", value: "IP65 Polycarbonate / ABS" },
                { label: "Sampling Interval", value: "Configurable (1 min to 60 mins)" },
                { label: "Dimensions", value: "Compact (< 30cm x 20cm x 15cm)" }
            ],
            compliance: "Indicative monitoring correlated with Reference Stations.",
            imageUrl: "/assets/Gemini_Generated_Image_jfecovjfecovjfec.png",
            features: ["Cost-effective high-density deployment", "Wireless plug-and-play installation", "Cloud-based dashboard and analytics", "Real-time public information display"],
            pros: ["Massively scalable coverage", "Low deployment cost", "Identifies local pollution hotspots"],
            cons: ["Lower accuracy than reference grade analyzers", "Sensor replacement required every 1-2 years"]
        },
        {
            _id: "698da53e5bff466e7fbecc38",
            title: "IIoT-based Data Loggers & Remote Calibration Units",
            category: "Data Acquisition",
            desc: "Cloud-connected telemetry for remote system health and data integrity.",
            details: "Advanced Industrial IoT gateways that ensure seamless, clear, and secure transmission of environmental data to regulators and cloud platforms.",
            longDescription: "Data integrity is the backbone of environmental compliance. Our IIoT-based Data Loggers remove the gap between field analyzers and central servers. They act as secure gateways that collect analog and digital signals from analyzers, buffer the data locally to prevent loss during network outages, and push it to CPCB/SPCB servers using approved protocols.\n\nBeyond simple logging, the Remote Calibration Unit (RCU) feature allows operators to trigger zero and span calibration cycles remotely from the cloud. This reduces site visits and ensures analyzer drift is corrected immediately. The system also monitors instrument health tags, predicting failures before they happen.",
            operatingPrinciple: "The device polls connected instruments via Modbus (RS485/TCP) or 4-20mA channels. Data is timestamped and stored in non-volatile memory. Validated data is packetized and transmitted via MQTT/HTTPs/FTP over cellular or ethernet networks. It supports bi-directional communication for remote commands.",
            applications: [
                "Remote access to CEMS/CAAQMS",
                "Central Pollution Control Board Data transmission",
                "Pollution Control Board Surveillance Centers",
                "Predictive Maintenance of Assets",
                "Third-party Data Verification"
            ],
            installation: "The unit is DIN-rail mounted inside the existing CEMS/CAAQMS cabinet. It requires 24V DC power. An external 4G/LTE antenna is routed outside the cabinet to ensure good signal reception.",
            faqs: [
                {
                    question: "Is the data transmission secure?",
                    answer: "Yes, data is transmitted using encrypted protocols (SSL/TLS) to ensure that it cannot be tampered with during transit."
                },
                {
                    question: "What happens if the internet goes down?",
                    answer: "The device has internal storage (SD Card) to buffer data for weeks. Once connectivity is restored, it automatically uploads the backlog (Historical Data) to the server."
                }
            ],
            technicalSpecs: [
                { label: "Inputs", value: "8x Analog (AI), 8x Digital (DI), 2x RS485" },
                { label: "Storage", value: "On-board SD Card (Up to 32GB)" },
                { label: "Protocols Supported", value: "Modbus RTU/TCP, MQTT, JSON, FTP, TCP/IP" },
                { label: "Telemetry", value: "4G LTE / Ethernet / Wi-Fi" },
                { label: "Security", value: "SSL/TLS Encryption" },
                { label: "Remote Access", value: "VPN / Static IP / Cloud Portal" },
                { label: "Power", value: "24V DC DIN Rail Mount" }
            ],
            compliance: "CPCB Guidelines for Online Data Transmission.",
            imageUrl: "/assets/scs_900c.png",
            features: ["Secure real-time data transmission", "Remote calibration and diagnostics", "Automatic data buffering and backfilling", "Multi-protocol conversion"],
            pros: ["Ensures 100% data availability", "Reduces need for site visits", "Secure and encrypted communication"],
            cons: ["Requires reliable cellular signal or internet"]
        },
        {
            _id: "698da53e5bff466e7fbecc43",
            title: "Advanced Instrumentation",
            category: "Process Control",
            desc: "High-precision advanced instrumentation for process control and analytics.",
            details: "Comprehensive advanced instrumentation solutions including flow meters, level transmitters, pressure sensors, and analytical instruments for industrial automation.",
            longDescription: "Advanced Instrumentation forms the core of industrial automation and process control. Our portfolio covers a wide range of high-precision sensors and transmitters that ensure the safe, efficient, and reliable operation of manufacturing processes. From accurately measuring fluid flows in pipelines to maintaining critical pressures in boilers, our instruments deliver unparalleled accuracy and longevity.\n\nWe partner with global leaders in sensor technology to provide solutions tailored to specific industry needs, including hazardous area approvals (ATEX/IECEx) and hygienic certifications for food and beverage applications.",
            operatingPrinciple: "Operating principles vary by instrument type:\n- Flow: Electromagnetic, Coriolis Mass, or Ultrasonic transit-time.\n- Level: Radar (FMCW/Guided Wave), Ultrasonic, or Capacitance.\n- Pressure: Piezoresistive or Capacitive ceramic cells.\n- Analytics: Optical, Electrochemical, or Paramagnetic sensors.",
            applications: [
                "Oil & Gas Refineries",
                "Chemical and Petrochemical Plants",
                "Food & Beverage Processing",
                "Water and Wastewater Treatment",
                "Pharmaceutical Manufacturing"
            ],
            installation: "Installation depends on the specific instrument. Flow meters typically require flanged pipeline integration with specific upstream/downstream straight pipe runs. Level transmitters are mounted on tank roofs via standard nozzles. All instruments require proper grounding and shielded signal cables (usually 4-20mA HART or Profibus/Foundation Fieldbus).",
            faqs: [
                {
                    question: "What communication protocols are supported?",
                    answer: "Our instruments support standard 4-20mA with HART protocol, as well as digital fieldbuses like Profibus PA/DP, Foundation Fieldbus, and Modbus RTU/TCP."
                },
                {
                    question: "Are these instruments suitable for hazardous areas?",
                    answer: "Yes, many of our instruments come with intrinsically safe (Ex ia) or explosion-proof (Ex d) certifications for use in Zone 1 and Zone 2 hazardous areas."
                }
            ],
            technicalSpecs: [
                { label: "Output Signals", value: "4-20mA HART, Profibus, Modbus" },
                { label: "Accuracy", value: "Typically up to ±0.1% of reading" },
                { label: "Enclosure Rating", value: "IP66 / IP67 / IP68" },
                { label: "Wetted Materials", value: "SS316L, Hastelloy, PTFE, Ceramic" },
                { label: "Certifications", value: "ATEX, IECEx, SIL2/SIL3" }
            ],
            compliance: "ISO 9001, OIML, ATEX/IECEx for hazardous areas.",
            imageUrl: "/assets/gas_analyzer.jpg",
            features: ["High measurement accuracy and repeatability", "Robust design for harsh environments", "Advanced diagnostics and self-monitoring", "Wide range of wetted materials"],
            pros: ["Improves process efficiency and safety", "Reduces downtime through predictive diagnostics", "Seamless integration into existing DCS/PLC"],
            cons: ["Requires skilled technicians for configuration"]
        }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
        // Bypassing backend fetch to resolve loading issues and DB inconsistencies
        const localProduct = defaultProductList.find(p => p._id === id);
        if (localProduct) {
            setProduct(localProduct);
            setError(null);
        } else {
            setError('Product not found');
        }
        setLoading(false);
    }, [id]);

    if (loading) return (
        <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        </div>
    );

    if (error || !product) return (
        <div className={`min-h-screen flex flex-col items-center justify-center ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <Link to="/" className="text-emerald-500 hover:underline flex items-center gap-2">
                <ArrowLeft size={20} /> Back to Home
            </Link>
        </div>
    );

    return (
        <div className={`pt-24 min-h-screen relative overflow-hidden ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}`}>
            <div className="container mx-auto px-6 py-12 relative z-10">
                <Link to="/#products" className="inline-flex items-center gap-2 text-emerald-500 font-bold mb-8 hover:opacity-80 transition-opacity">
                    <ArrowLeft size={20} /> Back to Products
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`rounded-3xl p-8 flex items-center justify-center ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-xl'}`}
                    >
                        <img
                            src={(product.imageUrl && product.imageUrl.startsWith('uploads/')) ? `http://localhost:5000/${product.imageUrl}` : (product.imageUrl || product.image || "/assets/logo.png")}
                            alt={product.title}
                            className="max-w-full max-h-[500px] object-contain"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/600?text=Product+Image';
                            }}
                        />
                    </motion.div>

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <span className="text-emerald-500 font-bold uppercase tracking-widest text-sm mb-2 block">
                            {product.category}
                        </span>
                        <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
                            {product.title}
                        </h1>

                        <div className={`prose max-w-none mb-10 ${isDarkMode ? 'prose-invert' : ''}`}>
                            <p className={`text-lg italic font-medium mb-6 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                {product.desc}
                            </p>
                            <p className={`text-base leading-relaxed mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                                {product.details}
                            </p>
                        </div>



                        {/* Features List */}
                        {product.features && product.features.length > 0 && (
                            <div className="mb-8">
                                <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Key Features</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {product.features.map((feature, index) => (
                                        <div key={index} className={`p-4 rounded-xl flex items-start gap-3 ${isDarkMode ? 'bg-slate-800' : 'bg-white shadow-sm border border-slate-100'}`}>
                                            <Activity className="text-emerald-500 shrink-0" size={20} />
                                            <span className={`text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* EXTENDED DETAILS SECTION - Interactive Tabs */}
                <div className="mt-16 bg-slate-50 dark:bg-slate-800/30 py-16 rounded-[3rem] border border-slate-100 dark:border-slate-800">
                    <div className="px-6 lg:px-16">
                        <h2 className={`text-3xl font-black mb-12 text-center uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            Comprehensive <span className="text-emerald-500">Overview</span>
                        </h2>

                        {/* Tab Navigation */}
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${
                                        activeTab === tab.id 
                                            ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/30 -translate-y-1' 
                                            : `${isDarkMode ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-white text-slate-600 hover:bg-slate-100'} hover:shadow-md border border-slate-200 dark:border-slate-700`
                                    }`}
                                >
                                    <tab.icon size={20} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className={`relative min-h-[400px] rounded-[2rem] p-8 md:p-12 shadow-2xl transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 border border-slate-800 shadow-none' : 'bg-white border border-slate-100'}`}>
                            <AnimatePresence mode="wait">
                                {activeTab === 'overview' && (
                                    <motion.div
                                        key="overview"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-12"
                                    >
                                        {product.longDescription && (
                                            <div>
                                                <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                                    <Info className="text-emerald-500" /> Detailed Description
                                                </h3>
                                                <div className={`prose max-w-none ${isDarkMode ? 'prose-invert text-slate-400' : 'text-slate-600'}`}>
                                                    {product.longDescription.split('\n\n').map((paragraph, idx) => (
                                                        <p key={idx} className="mb-4 leading-relaxed text-lg font-medium">{paragraph}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {product.operatingPrinciple && (
                                            <div>
                                                <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                                    <Zap className="text-emerald-500" /> Operating Principle
                                                </h3>
                                                <div className={`p-6 md:p-8 rounded-2xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                                                    <p className={`text-lg leading-relaxed font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                                        {product.operatingPrinciple}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === 'specs' && (
                                    <motion.div
                                        key="specs"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-12"
                                    >
                                        {product.technicalSpecs && product.technicalSpecs.length > 0 && (
                                            <div>
                                                <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                                    <Settings className="text-emerald-500" /> Technical Specifications
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {product.technicalSpecs.map((spec, idx) => (
                                                        <div key={idx} className={`flex flex-col p-5 rounded-2xl border transition-all hover:shadow-md ${isDarkMode ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800' : 'bg-white border-slate-100 hover:border-emerald-500/30'}`}>
                                                            <span className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{spec.label}</span>
                                                            <span className={`text-lg font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{spec.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {product.compliance && (
                                            <div>
                                                <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                                    <CheckCircle className="text-emerald-500" /> Regulatory Compliance
                                                </h3>
                                                <div className={`flex items-start gap-4 p-6 rounded-2xl border border-emerald-500/20 ${isDarkMode ? 'bg-emerald-500/5' : 'bg-emerald-50'}`}>
                                                    <CheckCircle className="text-emerald-500 shrink-0 mt-1" size={24} />
                                                    <p className={`text-lg font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{product.compliance}</p>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === 'applications' && (
                                    <motion.div
                                        key="applications"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-12"
                                    >
                                        {product.applications && product.applications.length > 0 && (
                                            <div>
                                                <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                                    <Layers className="text-emerald-500" /> Applications & Use Cases
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {product.applications.map((app, idx) => (
                                                        <div key={idx} className={`flex items-center gap-4 p-5 rounded-2xl border transition-all hover:translate-x-2 ${isDarkMode ? 'bg-slate-800/50 border-slate-700 hover:bg-slate-800' : 'bg-white border-slate-100 hover:border-emerald-500/30 hover:shadow-md'}`}>
                                                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                                                <CheckCircle size={20} className="text-emerald-500" />
                                                            </div>
                                                            <span className={`text-lg font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{app}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {product.installation && (
                                            <div>
                                                <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                                    <Wrench className="text-emerald-500" /> Installation & Commissioning
                                                </h3>
                                                <div className={`p-6 md:p-8 rounded-2xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                                                    <p className={`text-lg leading-relaxed font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                                        {product.installation}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {activeTab === 'faqs' && (
                                    <motion.div
                                        key="faqs"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-12"
                                    >
                                        {/* Pros & Cons */}
                                        {((product.pros && product.pros.length > 0) || (product.cons && product.cons.length > 0)) && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                {product.pros && product.pros.length > 0 && (
                                                    <div className={`p-6 md:p-8 rounded-3xl border border-emerald-500/20 ${isDarkMode ? 'bg-emerald-500/5' : 'bg-emerald-50'}`}>
                                                        <h3 className="text-emerald-500 font-bold text-xl mb-6 flex items-center gap-2">
                                                            <CheckCircle size={24} /> Advantages
                                                        </h3>
                                                        <ul className="space-y-4">
                                                            {product.pros.map((pro, index) => (
                                                                <li key={index} className="flex items-start gap-3">
                                                                    <CheckCircle size={20} className="text-emerald-500 mt-1 shrink-0" />
                                                                    <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{pro}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {product.cons && product.cons.length > 0 && (
                                                    <div className={`p-6 md:p-8 rounded-3xl border border-slate-500/20 ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                                                        <h3 className="text-slate-500 font-bold text-xl mb-6 flex items-center gap-2">
                                                            <XCircle size={24} /> Considerations
                                                        </h3>
                                                        <ul className="space-y-4">
                                                            {product.cons.map((con, index) => (
                                                                <li key={index} className="flex items-start gap-3">
                                                                    <XCircle size={20} className="text-slate-400 mt-1 shrink-0" />
                                                                    <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{con}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* FAQs Accordion */}
                                        {product.faqs && product.faqs.length > 0 && (
                                            <div>
                                                <h3 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                                    <HelpCircle className="text-emerald-500" /> Frequently Asked Questions
                                                </h3>
                                                <div className="space-y-4">
                                                    {product.faqs.map((faq, idx) => (
                                                        <div 
                                                            key={idx} 
                                                            className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isDarkMode ? 'border-slate-700 bg-slate-800/30' : 'border-slate-200 bg-white'}`}
                                                        >
                                                            <button
                                                                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                                                                className={`w-full flex items-center justify-between p-6 text-left transition-colors ${openFaqIndex === idx ? (isDarkMode ? 'bg-slate-800' : 'bg-slate-50') : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                                                            >
                                                                <span className={`text-lg font-semibold pr-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{faq.question}</span>
                                                                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${openFaqIndex === idx ? 'bg-emerald-500 text-white rotate-180' : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                                                                    <ChevronDown size={16} />
                                                                </div>
                                                            </button>
                                                            <AnimatePresence>
                                                                {openFaqIndex === idx && (
                                                                    <motion.div
                                                                        initial={{ height: 0, opacity: 0 }}
                                                                        animate={{ height: 'auto', opacity: 1 }}
                                                                        exit={{ height: 0, opacity: 0 }}
                                                                        transition={{ duration: 0.3 }}
                                                                    >
                                                                        <div className={`p-6 pt-0 border-t ${isDarkMode ? 'border-slate-700 bg-slate-800' : 'border-slate-100 bg-slate-50'}`}>
                                                                            <p className={`text-lg font-medium leading-relaxed mt-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{faq.answer}</p>
                                                                        </div>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
