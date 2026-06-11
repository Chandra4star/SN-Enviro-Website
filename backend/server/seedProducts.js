import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config({ path: './server/.env' });

const products = [
    {
        _id: "698da53e5bff466e7fbecc37",
        title: "Model 1080UV Gas Analyzer",
        category: "Analysis",
        desc: "Advanced UV-based gas analysis system for industrial emissions.",
        details: "The Model 1080UV Gas Analyzer is a high-performance instrument designed for the continuous measurement of gas concentrations in industrial emissions. Utilizing advanced UV absorption technology, it offers exceptional stability and sensitivity.",
        longDescription: "The Model 1080UV represents the pinnacle of ultraviolet absorption spectroscopy technology. Unlike traditional infrared analyzers, this UV-based system is inherently immune to interference from moisture (H2O) and carbon dioxide (CO2), which are major constituents of combustion flue gases. This unique characteristic allows for simple sample handling without the need for complex drying systems that can remove soluble gases like SO2 and NO2.\n\nAt the heart of the analyzer is a high-stability pulsed deuterium lamp, which provides a strong UV source with an exceptionally long lifespan. The light passes through the sample cell where target gases absorb specific wavelengths. A high-resolution spectrometer then diffracts the light, and a CCD detector array captures the absorption spectrum. Advanced chemometric algorithms analyze this spectrum to calculate gas concentrations with parts-per-billion (ppb) precision.\n\nThe system's modular design ensures ease of maintenance. Key components like the light source, spectrometer, and gas cell are easily accessible. It allows for the simultaneous measurement of multiple components including SO2, NO, NO2, H2S, and others, making it a versatile solution for diverse applications ranging from waste incineration to chemical processing plants.",
        imageUrl: "/assets/gas_analyzer.jpg",
        gallery: [
            "/assets/Gemini_Generated_Image_jfecovjfecovjfec.png",
            "/assets/SCS-900UV_1.png"
        ],
        icon: "Activity",
        features: [
            "High-precision UV-based gas analysis",
            "Real-time industrial emissions monitoring",
            "Robust design for harsh environments",
            "Low maintenance operation"
        ],
        pros: [
            "Extremely accurate UV absorption technology",
            "Fast response time for real-time monitoring",
            "Minimal interference from moisture and other gases",
            "User-friendly interface with data logging",
            "Low maintenance requirements"
        ],
        cons: [
            "Higher initial cost compared to electrochemical sensors",
            "Requires periodic replacement of UV lamp"
        ]
    },
    {
        _id: "698da53e5bff466e7fbecc38",
        title: "SCS-900C Control System",
        category: "System Integration",
        desc: "Centralized control cabinet for multi-analyzer system management.",
        details: "The SCS-900C is the central intelligence unit for emission monitoring systems. It integrates data from multiple analyzers, manages calibration cycles, and handles data transmission.",
        longDescription: "The SCS-900C Continuous Emission Monitoring Control System acts as the central hub for the entire monitoring station. It serves not just as a data aggregator but as an intelligent process controller that ensures the integrity and validity of all measured data. The cabinet houses a high-performance PLC (Programmable Logic Controller) that manages the sampling sequences, blowback cycles for probe cleaning, and automated daily calibration routines.\n\nOne of the standout features of the SCS-900C is its robust data handling capability. It incorporates an industrial-grade touchscreen HMI (Human Machine Interface) that provides operators with real-time visualization of gas concentrations, system status, and alarms. The system is designed to meet stringent regulatory requirements for data availability, offering redundant storage options to prevent data loss during power outages or communication failures.\n\nFurthermore, the SCS-900C is designed for seamless integration. It supports standard industrial communication protocols such as Modbus TCP/IP, RS-485, and 4-20mA analog outputs, allowing it to interface easily with plant DCS (Distributed Control Systems) and environmental regulatory servers. Its ruggedized enclosure is built to IP54/IP65 standards, protecting sensitive electronics from dust and moisture typical in industrial environments.",
        imageUrl: "/assets/Gemini_Generated_Image_srgh2jsrgh2jsrgh.png",
        gallery: [
            "/assets/Gemini_Generated_Image_b5cgq4b5cgq4b5cg.png",
            "/assets/Gemini_Generated_Image_9v1v1s9v1v1s9v1v.png"
        ],
        icon: "Maximize2",
        features: [
            "Centralized multi-analyzer management",
            "Seamless system integration capabilities",
            "User-friendly control interface",
            "Remote diagnostics support"
        ],
        pros: [
            "Centralized control simplifies system management",
            "Automated calibration triggers ensure accuracy",
            "Secure data storage with backup capabilities",
            "Remote access for diagnostics and troubleshooting",
            "Compatible with various analyzer brands"
        ],
        cons: [
            "Requires stable power supply with backup",
            "Configuring new analyzers requires technical expertise"
        ]
    },
    {
        _id: "698da53e5bff466e7fbecc39",
        title: "Continuous Emission Monitoring Systems (CEMS)",
        category: "Emission Monitor",
        desc: "Regulatory compliance solutions for industrial stack emissions.",
        details: "The SCS-900UV is a comprehensive Continuous Emission Monitoring System (CEMS) specifically designed for stack gas applications. It utilizes direct extract or dilution extractive methods.",
        longDescription: "The SCS-900UV is a turnkey CEMS solution designed for the most demanding compliance monitoring applications. It integrates the precision of UV-DOAS analysis with a robust sampling system engineered to handle high-temperature, high-dust, and corrosive gas streams often found in power plants, cement kilns, and waste incinerators. \n\nThe system employs a heated sampling probe and line to transport the flue gas to the analyzer cabinet, maintaining the temperature above the acid dew point to prevent condensation and corrosion. This 'hot-wet' or 'cold-dry' approach (depending on configuration) ensures that the sample remains representative of the stack conditions. The multi-stage filtration system effectively removes particulate matter, protecting the sensitive optical components.\n\nA key advantage of the SCS-900UV is its multi-component capability. A single analyzer bench can simultaneously measure SO2, NOx, NH3, and O2, reducing the hardware footprint and maintenance complexity. The system includes built-in quality assurance functionalities, such as automated zero and span checks, to verify performance in accordance with environmental regulations (e.g., US EPA 40 CFR Part 60/75 or EN 14181).",
        imageUrl: "/assets/SCS-900UV_1.png",
        gallery: [
            "/assets/Gemini_Generated_Image_jfecovjfecovjfec.png",
            "/assets/gas_analyzer.jpg"
        ],
        icon: "BarChart",
        features: [
            "Continuous stack gas emission monitoring",
            "Compliance with environmental regulations",
            "Integrated data acquisition system",
            "Automated calibration routines"
        ],
        pros: [
            "Direct measurement of gases without heavy conditioning",
            "High reliability in harsh stack environments",
            "Low operational costs due to robust design",
            "Fully automated daily zero/span calibration",
            "Real-time data transmission availability"
        ],
        cons: [
            "Requires regular filter cleaning in high-dust applications",
            "Initial installation requires specialized stack port preparation"
        ]
    },
    {
        _id: "698da53e5bff466e7fbecc3a",
        title: "CEMS",
        category: "Industrial Monitoring",
        desc: "Continuous Emission Monitoring Systems for stack and flue gas monitoring.",
        details: "Our Standard CEMS package offers a reliable solution for monitoring flue gas emissions in various industries like cement, steel, and power.",
        longDescription: "Continuous Emission Monitoring Systems (CEMS) are the standard for environmental compliance in modern industry. Our CEMS solutions are engineered to provide reliable, continuous records of significantly regulated pollutants. The standard package typically employs Non-Dispersive Infrared (NDIR) technology for gases like CO and CO2, and Chemiluminescence for low-level NOx monitoring.\n\nThe system is more than just analyzers; it is a complete ecosystem including the sample probe, heated sample line, sample conditioning unit (gas cooler), analyzers, and the Data Acquisition System (DAS). The gas cooler rapidly reduces the sample temperature to remove moisture, presenting a dry basis gas to the analyzers, which is the standard reference condition for reporting.\n\nOur CEMS DAS software is fully compliant with pollution control board norms, offering features such as real-time trending, geometric mean calculation, normalization of values, and automatic report generation. It also handles the secure transmission of data to central authority servers via GPRS/internet, ensuring that your facility remains in continuous compliance with the law.",
        imageUrl: "/assets/logo.png",
        gallery: [
            "/assets/SCS-900UV_1.png",
            "/assets/Gemini_Generated_Image_srgh2jsrgh2jsrgh.png"
        ],
        icon: "BarChart",
        features: [
            "Standardized flue gas monitoring",
            "Reliable pollutant measurement",
            "Real-time reporting and alerts",
            "Scalable system architecture"
        ],
        pros: [
            "Cost-effective solution for standard compliance",
            "Proven sensor technologies (NDIR/Electrochemical)",
            "Easy to operate and maintain",
            "Modular design allows for adding parameters",
            "Quick installation and commissioning"
        ],
        cons: [
            "Some sensors have a shorter lifespan than UV variants",
            "Cross-sensitivity can be an issue in complex gas mixtures"
        ]
    },
    {
        _id: "698da53e5bff466e7fbecc3b",
        title: "Continuous Ambient Air Quality Monitoring Stations (CAAQMS)",
        category: "Ambient Monitor",
        desc: "Complete self-contained stations for precise urban air quality management.",
        details: "The S.N. Enviro CAAQMS is a state-of-the-art solution for monitoring ambient air quality. It integrates multiple gas analyzers (SO2, NOx, CO) and particulate monitors.",
        longDescription: "Continuous Ambient Air Quality Monitoring Systems (CAAQMS) are vital tools for urban air quality management. Unlike stack monitoring, which measures high concentrations at the source, CAAQMS measures trace levels of pollutants in the ambient air we breathe. This requires high-sensitivity analyzers often operating in the low parts-per-billion (ppb) range.\n\nOur CAAQMS station is a self-contained, climate-controlled shelter housing a suite of reference-method analyzers. These typically include Pulsed UV Fluorescence for SO2, Chemiluminescence for NOx, Gas Filter Correlation (GFC) for CO, and UV Photometry for Ozone. Additionally, Beta Attenuation Monitors (BAM) are employed for the precise mass measurement of Particulate Matter (PM10 and PM2.5).\n\nBeyond pollutants, the station integrates a complete meteorological tower to measure wind speed, wind direction, temperature, humidity, and solar radiation. This data is crucial for pollution modelling and source apportionment. The central data logger aggregates all these parameters, performs validity checks, and transmits the data to the central command center, often populating public displays and web portals to keep citizens informed about the air quality index (AQI) in real-time.",
        imageUrl: "/assets/CAAQMS.png",
        gallery: [
            "/assets/Gemini_Generated_Image_jfecovjfecovjfec.png",
            "/assets/Gemini_Generated_Image_srgh2jsrgh2jsrgh.png",
            "/assets/gas_analyzer.jpg"
        ],
        icon: "Activity",
        features: [
            "Multi-gas analysis (SO2, NOx, CO, O3)",
            "PM-10 and PM-2.5 monitoring",
            "Meteorological sensors integration",
            "Real-time data logging and display"
        ],
        pros: [
            "High precision sensors for accurate readings",
            "Comprehensive monitoring of multiple pollutants",
            "Remote monitoring capabilities via internet",
            "Integrated display board for public awareness",
            "Robust data logging software"
        ],
        cons: [
            "Requires regular maintenance and calibration",
            "Complex installation process"
        ]
    }
];

const seedDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGO_URI || "mongodb+srv://jaswanthavs19_db_user:zF7QRoFn2BlvD544@cluster0.n0sz4ok.mongodb.net/SN_Enviro_DB?retryWrites=true&w=majority&appName=Cluster0";
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB for seeding');

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️ Cleared existing products');

        // Insert new products
        await Product.insertMany(products);
        console.log('🌱 Successfully seeded products');

        mongoose.connection.close();
    } catch (err) {
        console.error('❌ Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
