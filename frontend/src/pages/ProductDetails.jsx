import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, XCircle, Activity, Info, FileText, Settings, Layers, Zap, Wrench, HelpCircle } from 'lucide-react';

const productSubTabsConfig = {
    // CAAQMS
    "698da53e5bff466e7fbecc3b": {
        intro: "Continuous Ambient Air Quality Monitoring Systems (CAAQMS) are vital tools for urban air quality management. Unlike stack monitoring, which measures high concentrations at the source, CAAQMS measures trace levels of pollutants in the ambient air we breathe. This requires high-sensitivity analyzers often operating in the low parts-per-billion (ppb) range.",
        systemTitle: "CAAQMS Station & Shelter Integration (System)",
        systemDesc: "The station represents the physical enclosure and environmental support systems required to keep high-precision analyzers running 24/7 in extreme weather conditions. SN Enviro integrates robust mechanical and electrical systems to guarantee continuous data availability.",
        systemTabLabel: "System & Station Integration",
        productTabLabel: "Reference Analyzers & Products",
        systemCards: [
            { title: "Climate-Controlled Shelter", icon: "Layers", desc: "Double-walled, thermally insulated walk-in container equipped with dual redundant HVAC units to maintain a stable interior environment (25°C ± 1°C). Protects analytical instruments from dust, humidity, and temperature spikes." },
            { title: "Sampling Intake Manifold", icon: "Settings", desc: "A glass or Teflon manifold with a high-capacity moisture trap and high-volume blower drawing ambient air from a height of 3-10 meters. Rapid transport ensures no trace gas reactions or losses in transit." },
            { title: "IIoT Telemetry Gateway & RCU", icon: "Zap", desc: "Integrated remote calibration control unit and cellular data logger. It averages data, generates QA status flags, and securely streams real-time values directly to environmental board servers (CPCB/SPCB)." },
            { title: "Dynamic Gas Dilution System", icon: "Wrench", desc: "Features built-in Zero Air Generators and high-accuracy mass flow controllers to perform automatic span and zero calibrations. Meets strict regulatory compliance guidelines." }
        ],
        designatedSources: [
            { point: "Ambient Perimeter", name: "Fenceline Monitoring", desc: "Perimeter boundaries of heavy industrial plants to track fugitive emissions leaving the facility." },
            { point: "Urban Traffic", name: "Roadside Stations", desc: "Major metropolitan intersections and high-density traffic corridors to measure vehicular exhaust impact." },
            { point: "Residential / Rural", name: "Background Stations", desc: "Baseline stations located in populated or protected ecological zones to assess general public exposure." }
        ],
        productTitle: "CAAQMS Reference Analyzers & Instrumentation (Products)",
        productDesc: "The actual instrumentation housed inside the shelter. Each analyzer utilizes specific, US EPA-approved reference methods to measure trace levels of pollutants in the ambient air.",
        productCards: [
            { id: "so2", type: "Gas Analyzer", name: "SO₂ Analyzer", specs: ["Method: Pulsed UV Fluorescence", "LDL: < 0.5 ppb", "EPA Status: Reference Standard"], desc: "Measures trace sulfur dioxide using UV light excitation at 214nm, filtering out atmospheric interferents." },
            { id: "nox", type: "Gas Analyzer", name: "NO-NO₂-NOₓ Analyzer", specs: ["Method: Chemiluminescence", "LDL: < 0.4 ppb", "EPA Status: Reference Standard"], desc: "Measures nitric oxide and nitrogen oxides through the light-emitting reaction of NO with ozone." },
            { id: "co", type: "Gas Analyzer", name: "CO Analyzer", specs: ["Method: Gas Filter Correlation NDIR", "LDL: < 0.04 ppm", "EPA Status: Reference Standard"], desc: "Utilizes gas filter correlation spectroscopy to eliminate carbon dioxide and water vapor interference." },
            { id: "o3", type: "Gas Analyzer", name: "O₃ Analyzer", specs: ["Method: UV Photometry", "LDL: < 0.5 ppb", "EPA Status: Reference Standard"], desc: "Measures absorption of UV light at 254nm within a dual-path cell to compute ground-level ozone." },
            { id: "pm", type: "Dust Monitor", name: "PM10 / PM2.5 (BAM)", specs: ["Method: Beta Ray Attenuation", "Range: 0 - 1000 µg/m³", "EPA Status: Equivalent Standard"], desc: "Provides continuous mass measurement of particulate fractions using Carbon-14 beta ray absorption." }
        ]
    },
    // CEMS
    "698da53e5bff466e7fbecc39": {
        intro: "The SCS-900UV is a turnkey CEMS solution designed for the most demanding compliance monitoring applications. It integrates the precision of UV-DOAS analysis with a robust sampling system engineered to handle high-temperature, high-dust, and corrosive gas streams.",
        systemTitle: "CEMS System & Cabinet Integration (System)",
        systemDesc: "The CEMS system comprises probe assemblies, high-temperature sample transfer lines, and processing cabinets designed to condition corrosive flue gas before direct analyzer measurement.",
        systemTabLabel: "System & Cabinet Integration",
        productTabLabel: "Reference Analyzers & Products",
        systemCards: [
            { title: "Heated Sampling Probe & Line", icon: "Layers", desc: "A high-durability, corrosion-resistant probe mounted directly on the stack DN100 flange, linked to a heated sample line maintained at 180°C. This avoids moisture condensation and loss of soluble gases." },
            { title: "Sample Conditioning Cabinet", icon: "Settings", desc: "Uses a high-performance thermoelectric sample cooler to instantly condense water vapor. Includes dust filters, acid-mist traps, and gas pumps to condition flue gases to a clean, dry state." },
            { title: "Integrated PLC & Solenoid Control", icon: "Zap", desc: "Houses the central Programmable Logic Controller (PLC) which handles probe blowback cycles for self-cleaning and triggers automatic daily calibration schedules." },
            { title: "Auto-Calibration Unit", icon: "Wrench", desc: "Features standard calibration gas cylinder manifolds and solenoid control valves to perform zero/span check validation directly at the probe head, ensuring CPCB compliance." }
        ],
        designatedSources: [
            { point: "Boiler Stack / Chimney", name: "Flue Gas Outlets", desc: "Primary release stacks of coal, gas, or biomass combustion boilers exceeding 150°C temperatures." },
            { point: "Preheater Exit", name: "Cement Kiln Outlets", desc: "High-dust and high-temperature gas outlets located post-bag filter or electrostatic precipitator." },
            { point: "Scrubber Stack", name: "Desulfurization Units", desc: "Wet or dry flue gas desulfurization (FGD) outlet ducts to monitor sulfur dioxide scrubbing efficiency." }
        ],
        productTitle: "CEMS Reference Analyzers & Instrumentation (Products)",
        productDesc: "The actual measurement instruments housed in the control cabinet or stack. These high-precision products continuously measure emissions levels.",
        productCards: [
            { id: "so2", type: "Gas Analyzer", name: "SO₂-NO-NO₂ (UV-DOAS)", specs: ["Method: Differential UV Spectroscopy", "Accuracy: < ±1.0% F.S.", "Gases: SO₂, NO, NO₂"], desc: "Utilizes UV-DOAS technology to measure SO2 and NOx without water vapor or CO2 cross-interference." },
            { id: "co", type: "Gas Analyzer", name: "CO / CO₂ Analyzer", specs: ["Method: NDIR (Non-Dispersive Infrared)", "Range: 0 - 500 / 5000 ppm", "Gases: CO, CO₂"], desc: "Employs NDIR optical absorption cell for continuous tracking of combustion and carbon emissions." },
            { id: "o2", type: "Gas Analyzer", name: "Oxygen Analyzer", specs: ["Method: Electrochemical / Zirconia", "Range: 0 - 25% O₂", "Features: Long life, high speed"], desc: "Measures residual oxygen in flue gas to normalize other pollutant concentrations to reference oxygen level." },
            { id: "pm", type: "Dust Monitor", name: "PM Opacity Monitor", specs: ["Method: Laser Backscattering", "Range: 0 - 1000 mg/m³", "Compliance: US EPA Compliant"], desc: "Cross-stack optical transceiver measuring flue gas turbidity, opacity, and particulate concentrations." },
            { id: "flow", type: "Flow Monitor", name: "Flue Gas Flow Monitor", specs: ["Method: Pitot Tube / Ultrasonic", "Parameters: Velocity, Temp, Pressure", "Purging: Automatic back-purge"], desc: "Measures stack gas velocity, pressure, and temperature to calculate total volumetric emission rate." }
        ]
    },
    // EQMS
    "698da53e5bff466e7fbecc40": {
        intro: "Effluent Quality Monitoring Systems (EQMS) are designed to monitor the quality of treated water discharged from industrial manufacturing units, STP, and ETP plants. Real-time monitoring of effluent ensures that industries meet the statutory requirements set by environmental control boards.",
        systemTitle: "EQMS System Configuration (System)",
        systemDesc: "The system represents open-channel or inline integrations designed to house and clean digital sensors in contact with harsh effluents.",
        systemTabLabel: "System Configuration",
        productTabLabel: "Wastewater Sensors & Products",
        systemCards: [
            { title: "Open Channel Mounting Stand", icon: "Layers", desc: "Rigid, corrosion-resistant mounting structure for submersing sensors in industrial drainage channels or open pits." },
            { title: "Closed-Pipe Flow Cell", icon: "Settings", desc: "Pressurized bypass sampling chamber for inline pipe sensor mounting, preventing bubbles and turbulence from affecting readings." },
            { title: "Multi-Parameter Controller", icon: "Zap", desc: "Central hub displaying sensor metrics, storing calibration history, and transmitting values via RS485 Modbus." },
            { title: "Self-Cleaning Compressor", icon: "Wrench", desc: "Automatic pressurized air-purge system that cleans digital sensors at programmable intervals to reduce manual maintenance." }
        ],
        designatedSources: [
            { point: "Final Outfall", name: "Treated Water Discharge", desc: "The primary channel or pipeline through which treated industrial effluent or sewage leaves the facility." },
            { point: "ETP/STP Inlet", name: "Raw Wastewater Stream", desc: "Untreated effluent lines entering treatment plants to monitor chemical loading rates." },
            { point: "Aeration Tank", name: "Biological Process Points", desc: "Activated sludge basins where continuous monitoring of pH and suspended solids stabilizes treatment." }
        ],
        productTitle: "EQMS Digital Sensors & Instrumentation (Products)",
        productDesc: "Reagent-free optical and electrochemical digital sensors that continuously measure wastewater quality parameters.",
        productCards: [
            { id: "ph", type: "Water Sensor", name: "pH/ORP Sensor", specs: ["Method: Glass Electrode", "Range: 0-14 pH", "Accuracy: ±0.1 pH"], desc: "Digital electrochemical sensor with self-cleaning flat glass surface and internal reference standard." },
            { id: "cod", type: "Water Sensor", name: "COD/BOD Analyzer", specs: ["Method: UV-Vis Absorption @ 254nm", "COD Range: 0-1000 mg/L", "BOD Range: 0-500 mg/L"], desc: "UV-Vis reagent-free spectrophotometer measuring organic loading at 254nm without chemicals." },
            { id: "tss", type: "Water Sensor", name: "TSS Sensor", specs: ["Method: IR Nephelometry", "Range: 0-4000 mg/L", "Enclosure: IP68 Submersible"], desc: "Infrared light-scattering sensor measuring total suspended solids with built-in scratching wiper." },
            { id: "flow", type: "Flow Meter", name: "Electromagnetic Flow Meter", specs: ["Method: Faraday Induction", "Velocity: Up to 10 m/s", "Output: 4-20mA, Modbus"], desc: "Obstruction-less flow sensor measuring discharge velocity and volume with CPCB-compliant totalizer." }
        ]
    },
    // IIoT Logger
    "698da53e5bff466e7fbecc38": {
        intro: "Our IIoT-based Data Loggers and Remote Calibration Units serve as cloud-connected secure gateways that collect analog/digital signals from analyzers, buffer data locally to prevent loss during network outages, and stream it securely to pollution control boards.",
        systemTitle: "IIoT Telemetry & Cabinet Integration (System)",
        systemDesc: "The system represents control cabinet mounts, power supply modules, and cellular antennas designed to guarantee data security and availability.",
        systemTabLabel: "Cabinet & Telemetry",
        productTabLabel: "Gateways & Telemetry Products",
        systemCards: [
            { title: "DIN-Rail Control Cabinet", icon: "Layers", desc: "Heavy-duty industrial cabinet housing the logger gateway, fuses, circuit breakers, and power stabilizers." },
            { title: "Industrial UPS & Power Supply", icon: "Settings", desc: "24V DC power module with integrated battery backup to protect data during short-term outages." },
            { title: "Multi-Band LTE Antenna", icon: "Zap", desc: "External, high-gain MIMO cellular antenna to guarantee reliable data transmission in industrial yards." },
            { title: "SD Card Storage Buffer", icon: "Wrench", desc: "Secure, non-volatile local storage that buffers logs during cellular disconnects and uploads historical data once online." }
        ],
        designatedSources: [
            { point: "Telemetry Node", name: "Analyzer Cabinets", desc: "Integrated telemetry interface inside CEMS, CAAQMS, or EQMS control cabinets." },
            { point: "Calibration Line", name: "Remote Gas Manifolds", desc: "Solenoid-switched validation systems linked directly to high-pressure calibration gas cylinders." },
            { point: "PCB Gateway", name: "Secure Server Uplinks", desc: "Direct encrypted communication channels pushing real-time data packets to regulatory databases." }
        ],
        productTitle: "IIoT Logger Gateways & Modules (Products)",
        productDesc: "High-integrity telemetry gateways and control modules designed to interface with field analytical instruments.",
        productCards: [
            { id: "gateway", type: "IIoT Gateway", name: "Modbus/Analog Gateway", specs: ["Inputs: 8x Analog, 8x Digital, 2x RS485", "Protocols: Modbus RTU/TCP, MQTT", "Mount: DIN Rail"], desc: "Central IIoT logger polling analog (4-20mA) and Modbus RTU channels simultaneously." },
            { id: "cal_module", type: "Control Module", name: "Remote Calibration Module", specs: ["Relays: 4x SPDT Control", "Trigger: Secure Bi-Directional", "Diagnostics: Watchdog Timer"], desc: "RCU gateway triggered via cloud to execute zero/span check validation sequences." },
            { id: "mqtt_link", type: "Security Gateway", name: "MQTT Encryption Server Link", specs: ["Security: SSL/TLS v1.3", "Data Format: Encrypted JSON", "Buffering: Automatic Backfill"], desc: "Direct SSL/TLS client pushing encrypted JSON files directly to regulatory servers." }
        ]
    },
    // WMS
    "698da53e5bff466e7fbecc41": {
        intro: "Weather Monitoring Systems (WMS) are compact, robust, and highly accurate Automatic Weather Stations (AWS) designed for environmental applications. These systems provide critical wind and stability data for air quality dispersion modeling.",
        systemTitle: "AWS Mast & Power Integration (System)",
        systemDesc: "The meteorological mast assembly, power modules, and lightning safety equipment required for continuous outdoor operation.",
        systemTabLabel: "Mast & Power Integration",
        productTabLabel: "Meteorological Sensors & Products",
        systemCards: [
            { title: "Guy-Wired Mast", icon: "Layers", desc: "Heavy-duty 10m meteorological mast, complete with structural guy-wires, cross-arms, and leveling base." },
            { title: "Lightning Protection", icon: "Settings", desc: "Copper lightning spike and grounding pit to shield meteorological sensors from electrical strikes." },
            { title: "Weatherproof Logger Enclosure", icon: "Zap", desc: "IP66 rated enclosure housing the battery, solar regulator, and telemetry logger." },
            { title: "Solar Power System", icon: "Wrench", desc: "High-efficiency solar panels and deep-cycle batteries enabling standalone operation in remote fields." }
        ],
        designatedSources: [
            { point: "Ground Station", name: "Open Meteorological Mast", desc: "A minimum 10-meter unobstructed mast located in an open field to measure clean wind vectors." },
            { point: "Rooftop Mount", name: "Building Met Stations", desc: "Elevated roof installations for microclimate tracking, typically compensating for building aerodynamic drag." },
            { point: "Solar/Wind Site", name: "Renewable Energy Fields", desc: "Installed directly adjacent to solar trackers or wind turbines to measure incoming irradiance and wind limits." }
        ],
        productTitle: "WMS Weather Sensors & Instruments (Products)",
        productDesc: "High-precision meteorological sensors designed for direct integration with environmental dataloggers.",
        productCards: [
            { id: "wind", type: "Met Sensor", name: "Ultrasonic Wind Sensor", specs: ["Parameter: Speed & Direction", "Speed Range: 0-60 m/s", "Accuracy: ±2%"], desc: "Solid-state sensor measuring wind speed and direction with no moving parts, avoiding mechanical wear." },
            { id: "temp_hum", type: "Met Sensor", name: "Temp/Humidity Sensor", specs: ["Temp Range: -40°C to +60°C", "Humidity: 0-100% RH", "Shield: Multi-plate radiation shield"], desc: "Capacitive humidity and high-accuracy RTD temperature sensor housed inside a solar radiation shield." },
            { id: "rain", type: "Met Sensor", name: "Rain Gauge", specs: ["Method: Tipping Bucket / Optical", "Orifice: 200mm diameter", "Resolution: 0.2 mm"], desc: "Tipping bucket or optical drop counter for high-precision rainfall rate tracking." },
            { id: "pyrano", type: "Met Sensor", name: "Pyranometer", specs: ["Parameter: Solar Radiation", "Spectral Range: 300 to 2800 nm", "Output: Millivolts / RS485"], desc: "Thermopile sensor measuring incoming shortwave solar radiation, critical for atmospheric dispersion." },
            { id: "baro", type: "Met Sensor", name: "Barometric Pressure Sensor", specs: ["Range: 500 to 1100 hPa", "Accuracy: ±0.15 hPa", "Technology: Piezoresistive"], desc: "Piezoresistive pressure sensor for ambient atmospheric tracking." }
        ]
    },
    // Smart City
    "698da53e5bff466e7fbecc42": {
        intro: "Smart City Environmental Monitoring Solutions bridge the gap between heavy reference stations and local areas by deploying networks of compact, cost-effective sensor nodes on street poles to map urban pollution hotspots.",
        systemTitle: "Smart City IoT Integration (System)",
        systemDesc: "Lightweight pole mounting brackets, solar charging systems, and cloud databases that run city-wide sensor grids.",
        systemTabLabel: "IoT Integration & Mounting",
        productTabLabel: "Environmental Nodes & Products",
        systemCards: [
            { title: "Utility Pole Mounting Clamps", icon: "Layers", desc: "Universal brackets to easily mount the compact monitoring node onto streetlights or utility poles." },
            { title: "Micro-Solar Power", icon: "Settings", desc: "High-durability micro solar panel and Lithium-Ion battery pack enabling self-powered IoT operations." },
            { title: "IP65 ABS Enclosure", icon: "Zap", desc: "Lightweight, impact-resistant ABS enclosure designed to withstand outdoor weathering." },
            { title: "Cloud Dashboard", icon: "Wrench", desc: "Web portal mapping spatial pollution gradients and showing real-time public Air Quality Index (AQI) values." }
        ],
        designatedSources: [
            { point: "Utility Pole", name: "Streetlight Node", desc: "Pole-mounted hyper-local monitoring nodes spaced 50-200 meters apart across urban centers." },
            { point: "Traffic Junction", name: "Intersection Node", desc: "Dense sensor nodes mapping real-time pollution spikes near pedestrian crossings and traffic signals." },
            { point: "Public Zone", name: "Parks & School Zones", desc: "Low-profile nodes tracking air quality in school yards, hospitals, and parks to safeguard children and vulnerable groups." }
        ],
        productTitle: "Smart City IoT Sensor Nodes (Products)",
        productDesc: "Compact, wireless sensor modules designed to monitor micro-climates and localized street pollution.",
        productCards: [
            { id: "gas_node", type: "IoT Node", name: "Compact Gas Node", specs: ["Parameters: NO2, SO2, CO, O3", "Sensing: Electrochemical Cells", "Life: 18-24 months"], desc: "Houses electrochemical sensors measuring ambient CO, NO2, SO2, and Ozone with temperature compensation." },
            { id: "pm_node", type: "IoT Node", name: "Compact PM Node", specs: ["Parameters: PM2.5, PM10", "Sensing: Laser Scattering", "Range: 0-1000 µg/m³"], desc: "Miniature laser-scattering particle counter estimating PM10 and PM2.5 mass concentrations." },
            { id: "noise", type: "IoT Node", name: "Noise Level Sensor", specs: ["Parameter: dB(A) Decibels", "Range: 30 - 130 dB", "Microphone: Class 2 Weatherproof"], desc: "Integrated weatherproof decibel meter measuring ambient urban environmental noise level." }
        ]
    },
    // Advanced Instrumentation
    "698da53e5bff466e7fbecc43": {
        intro: "Advanced Instrumentation forms the core of industrial automation and process control. Our portfolio covers a wide range of high-precision sensors, flow meters, and analytical instruments for industrial automation.",
        systemTitle: "Process Control Rack Integration (System)",
        systemDesc: "standard rack housings, Zener safety barriers, and loop isolation devices ensuring safe signal acquisition inside hazardous industrial zones.",
        systemTabLabel: "Rack & Signal Integration",
        productTabLabel: "Process Instruments & Products",
        systemCards: [
            { title: "DIN-Rail Enclosures", icon: "Layers", desc: "standard rail mounts for transmitters, isolates, and barriers inside instrumentation racks." },
            { title: "HART Protocol Loop", icon: "Settings", desc: "standard 4-20mA HART bi-directional interface enabling sensor diagnostics over standard loop cabling." },
            { title: "Intrinsically Safe Barriers", icon: "Zap", desc: "Zener barriers limiting electrical energy to prevent spark ignition in explosive gas zones." }
        ],
        designatedSources: [
            { point: "Process Pipe", name: "Inline Flow Loops", desc: "Pressurized pipelines containing process chemicals, acids, raw water, or oil streams." },
            { point: "Storage Vessel", name: "Chemical / Fuel Tanks", desc: "Atmospheric or pressurized storage vessels requiring continuous level and pressure surveillance." },
            { point: "Reactor Vessel", name: "Process Mixing Tanks", desc: "Agitated reactor tanks where analytical electrodes monitor chemical activity during active production." }
        ],
        productTitle: "Industrial Process Instruments (Products)",
        productDesc: "High-precision flow, level, pressure, and analytical transmitters for industrial automation.",
        productCards: [
            { id: "flow_meter", type: "Process Instrument", name: "Electromagnetic Flow Meter", specs: ["Fittings: Flanged DN15-DN2000", "Lining: PTFE / Hard Rubber", "Accuracy: ±0.5% of rate"], desc: "Flanged flow sensor for pipelines measuring water and chemical flow rates." },
            { id: "radar_level", type: "Process Instrument", name: "Radar Level Transmitter", specs: ["Method: 80GHz FMCW", "Range: Up to 30m / 120m", "Accuracy: ±1 mm"], desc: "Guided-wave or non-contact FMCW radar transmitter for high-accuracy storage tank level tracking." },
            { id: "pressure", type: "Process Instrument", name: "Pressure Transmitter", specs: ["Fittings: SS316L Diaphragm", "Range: -1 to 400 Bar", "Output: 4-20mA HART"], desc: "Stainless steel pressure sensor measuring differential, gauge, or absolute process pressures." },
            { id: "electrodes", type: "Process Instrument", name: "Analytical Electrodes", specs: ["Parameters: DO, Cond, Chlorine", "Temperature: Built-in Pt100", "Output: Modbus RS485"], desc: "High-precision analytical sensors for dissolved oxygen, conductivity, and free chlorine monitoring." }
        ]
    }
};

const ProductDetails = ({ isDarkMode }) => {
    const { id } = useParams();
    const location = useLocation();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSubTab, setActiveSubTab] = useState('system');

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

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tabParam = queryParams.get('tab');
        if (tabParam === 'product' || tabParam === 'system') {
            setActiveSubTab(tabParam);
        }
    }, [location.search]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const itemParam = queryParams.get('item');
        if (itemParam && activeSubTab === 'product') {
            setTimeout(() => {
                const element = document.getElementById(itemParam);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.classList.add('ring-4', 'ring-emerald-500', 'scale-[1.02]');
                    setTimeout(() => {
                        element.classList.remove('ring-4', 'ring-emerald-500', 'scale-[1.02]');
                    }, 2500);
                }
            }, 300);
        }
    }, [location.search, activeSubTab]);

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

                {/* EXTENDED DETAILS SECTION - Full Width */}
                <div className="mt-12">
                    <h2 className={`text-3xl font-black mb-12 text-center uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        Comprehensive <span className="text-emerald-500">Overview</span>
                    </h2>

                    <div className="max-w-5xl mx-auto space-y-16">
                        {/* 1. Long Description & Custom Configured Sections */}
                        {productSubTabsConfig[product._id] ? (
                            (() => {
                                const config = productSubTabsConfig[product._id];
                                return (
                                    <>
                                        {/* Intro */}
                                        <motion.section
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="pb-8 border-b border-slate-200 dark:border-slate-800"
                                        >
                                            <h3 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Overview</h3>
                                            <div className={`prose max-w-none ${isDarkMode ? 'prose-invert text-slate-400' : 'text-slate-600'}`}>
                                                <p className="mb-4 leading-relaxed text-lg font-light text-justify">
                                                    {config.intro}
                                                </p>
                                            </div>
                                        </motion.section>

                                        {/* System and Product Tabs */}
                                        <motion.section
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="pb-16 border-b border-slate-200 dark:border-slate-800"
                                        >
                                            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                                                <button
                                                    onClick={() => setActiveSubTab('system')}
                                                    className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold uppercase tracking-wider text-xs transition-all duration-300 cursor-pointer ${
                                                        activeSubTab === 'system'
                                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                                            : isDarkMode
                                                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                    }`}
                                                >
                                                    <Layers size={18} />
                                                    {config.systemTabLabel || 'System Integration'}
                                                </button>
                                                <button
                                                    onClick={() => setActiveSubTab('product')}
                                                    className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold uppercase tracking-wider text-xs transition-all duration-300 cursor-pointer ${
                                                        activeSubTab === 'product'
                                                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                                                            : isDarkMode
                                                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                    }`}
                                                >
                                                    <Activity size={18} />
                                                    {config.productTabLabel || 'Analyzers & Products'}
                                                </button>
                                            </div>

                                            {activeSubTab === 'system' ? (
                                                <div className="space-y-6">
                                                    <h4 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                                        {config.systemTitle}
                                                    </h4>
                                                    <p className={`text-base leading-relaxed font-light mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                                        {config.systemDesc}
                                                    </p>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {config.systemCards.map((card, idx) => (
                                                            <div key={idx} className={`p-6 rounded-2xl border transition-all ${isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-white border-slate-100 shadow-sm'}`}>
                                                                <div className="flex items-center gap-3 mb-3 text-emerald-500">
                                                                    {card.icon === 'Layers' && <Layers size={22} />}
                                                                    {card.icon === 'Settings' && <Settings size={22} />}
                                                                    {card.icon === 'Zap' && <Zap size={22} />}
                                                                    {card.icon === 'Wrench' && <Wrench size={22} />}
                                                                    <h5 className="font-bold text-lg">{card.title}</h5>
                                                                </div>
                                                                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                                                    {card.desc}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {config.designatedSources && (
                                                        <div className="mt-12 p-6 rounded-2xl border bg-emerald-500/5 border-emerald-500/10">
                                                            <h5 className="font-bold text-lg mb-6 text-emerald-500 flex items-center gap-2">
                                                                <Info size={20} />
                                                                Designated Monitoring Sources & Sampling Locations
                                                            </h5>
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                                {config.designatedSources.map((source, sIdx) => (
                                                                    <div key={sIdx} className={`p-5 rounded-xl border transition-all duration-300 hover:shadow-md ${isDarkMode ? 'bg-slate-900/60 border-slate-700/50' : 'bg-white border-slate-100 shadow-sm'}`}>
                                                                        <span className="text-emerald-500 text-[10px] font-extrabold uppercase tracking-widest block mb-2">{source.point}</span>
                                                                        <h6 className={`font-bold text-base mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{source.name}</h6>
                                                                        <p className={`text-xs leading-relaxed font-light ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{source.desc}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="space-y-6">
                                                    <h4 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                                        {config.productTitle}
                                                    </h4>
                                                    <p className={`text-base leading-relaxed font-light mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                                        {config.productDesc}
                                                    </p>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                        {config.productCards.map((card, idx) => (
                                                            <div id={card.id} key={idx} className={`p-6 rounded-2xl border transition-all ${isDarkMode ? 'bg-slate-800/40 border-slate-700/60' : 'bg-white border-slate-100 shadow-sm'}`}>
                                                                <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md mb-3 inline-block">{card.type}</span>
                                                                <h5 className="font-bold text-lg mb-2">{card.name}</h5>
                                                                <ul className="text-xs space-y-1.5 mb-4 text-slate-500 dark:text-slate-400">
                                                                    {card.specs.map((spec, sIdx) => {
                                                                        const parts = spec.split(':');
                                                                        return (
                                                                            <li key={sIdx}>
                                                                                <strong className="text-slate-700 dark:text-slate-300">{parts[0]}:</strong>
                                                                                {parts.slice(1).join(':')}
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                                <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                                                    {card.desc}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </motion.section>
                                    </>
                                );
                            })()
                        ) : (
                            <>
                                {/* 1. Long Description */}
                                {product.longDescription && (
                                    <motion.section
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="pb-16 border-b border-slate-200 dark:border-slate-800"
                                    >
                                        <h3 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Overview</h3>
                                        <div className={`prose max-w-none ${isDarkMode ? 'prose-invert text-slate-400' : 'text-slate-600'}`}>
                                            {product.longDescription.split('\n\n').map((paragraph, idx) => (
                                                <p key={idx} className="mb-4 leading-relaxed text-lg font-light">{paragraph}</p>
                                            ))}
                                        </div>
                                    </motion.section>
                                )}

                                {/* 2. Operating Principle */}
                                {product.operatingPrinciple && (
                                    <motion.section
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="pb-16 border-b border-slate-200 dark:border-slate-800"
                                    >
                                        <h3 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Operating Principle</h3>
                                        <p className={`text-lg leading-relaxed font-light ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                            {product.operatingPrinciple}
                                        </p>
                                    </motion.section>
                                )}
                            </>
                        )}

                        {/* 3. Applications */}
                        {product.applications && product.applications.length > 0 && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="pb-16 border-b border-slate-200 dark:border-slate-800"
                            >
                                <h3 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Applications & Use Cases</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {product.applications.map((app, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                            <span className={`text-lg font-light ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{app}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.section>
                        )}

                        {/* 4. Installation */}
                        {product.installation && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="pb-16 border-b border-slate-200 dark:border-slate-800"
                            >
                                <h3 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Installation & Commissioning</h3>
                                <p className={`text-lg leading-relaxed font-light ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                                    {product.installation}
                                </p>
                            </motion.section>
                        )}

                        {/* 5. Technical Specs */}
                        {product.technicalSpecs && product.technicalSpecs.length > 0 && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="pb-16 border-b border-slate-200 dark:border-slate-800"
                            >
                                <h3 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Technical Specifications</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                                    {product.technicalSpecs.map((spec, idx) => (
                                        <div key={idx} className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800/50">
                                            <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{spec.label}</span>
                                            <span className={`text-sm text-right ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* 5. Compliance */}
                        {product.compliance && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="pb-16 border-b border-slate-200 dark:border-slate-800"
                            >
                                <h3 className={`text-2xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Regulatory Compliance</h3>
                                <div className="flex items-start gap-4">
                                    <CheckCircle className="text-emerald-500 shrink-0 mt-1" size={24} />
                                    <p className={`text-lg font-light ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{product.compliance}</p>
                                </div>
                            </motion.section>
                        )}

                        {/* 7. FAQs */}
                        {product.faqs && product.faqs.length > 0 && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="pb-16 border-b border-slate-200 dark:border-slate-800"
                            >
                                <h3 className={`text-2xl font-semibold mb-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Frequently Asked Questions</h3>
                                <div className="space-y-8">
                                    {product.faqs.map((faq, idx) => (
                                        <div key={idx}>
                                            <h4 className={`text-lg font-medium mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{faq.question}</h4>
                                            <p className={`text-base font-light leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* 8. Pros & Cons */}
                        {((product.pros && product.pros.length > 0) || (product.cons && product.cons.length > 0)) && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="pb-16"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    {product.pros && product.pros.length > 0 && (
                                        <div>
                                            <h3 className="text-emerald-500 font-semibold text-xl mb-6">Advantages</h3>
                                            <ul className="space-y-4">
                                                {product.pros.map((pro, index) => (
                                                    <li key={index} className="flex items-start gap-3">
                                                        <CheckCircle size={20} className="text-emerald-500 mt-1 shrink-0" />
                                                        <span className={`font-light ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{pro}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {product.cons && product.cons.length > 0 && (
                                        <div>
                                            <h3 className="text-slate-500 font-semibold text-xl mb-6">Considerations</h3>
                                            <ul className="space-y-4">
                                                {product.cons.map((con, index) => (
                                                    <li key={index} className="flex items-start gap-3">
                                                        <XCircle size={20} className="text-slate-400 mt-1 shrink-0" />
                                                        <span className={`font-light ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{con}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </motion.section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
