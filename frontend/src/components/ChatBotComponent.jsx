import React, { useState } from 'react';
import ChatBot from 'react-chatbotify';
import { X } from 'lucide-react';

const SN_ENVIRO_KNOWLEDGE = {
    products: "We specialize in CAAQMS (Air), CEMS (Stack Emissions), EQMS (Effluent Water), WMS (Weather), and IIoT Data Loggers.",
    status: "300+ successful projects since 2017. Our technical team has 100+ years of combined experience.",
    clients: "Our prestigious clients include Ultratech, Adani, Vedanta, Cipla, and Saint Gobain.",
    phone: "+91 73309 33306",
    email: "mail@snenviro.com",
    address: "6-1-279, Plot no.10, Mantri Mansion, Walker Town, Padmarao Nagar, Hyderabad, Telangana 500020"
};

const ChatBotComponent = () => {
    const [isBotVisible, setIsBotVisible] = useState(false);

    // Knowledge Base
    const knowledge = {
        products: "We offer advanced environmental monitoring solutions including:\n• CAAQMS (Air Quality)\n• CEMS (Stack Emissions)\n• EQMS (Water Quality)\n• Weather Monitoring Systems\n• Industrial IoT Data Loggers",
        clients: "We are trusted by industry leaders such as:\n• Ultratech Cement\n• Adani Group\n• Vedanta Resources\n• Cipla\n• Saint Gobain",
        contact: "You can reach us at:\n\n📞 Phone: +91 73309 33306\n📧 Email: mail@snenviro.com\n📍 Address: 6-1-279, Plot No. 10, Mantri Mansion, Walker Town, Padmarao Nagar, Secunderabad, Hyderabad, Telangana 500025",
        about: "Since 2017, SN Enviro has delivered 300+ successful projects. Our technical team boasts 100+ years of combined experience in environmental instrumentation and compliance monitoring."
    };

    // Infinite Loop Flow
    const flow = {
        start: {
            message: "Hello! I am the SN Enviro Assistant. Tap on an option below to learn more about us.",
            options: ["Our Products", "Key Clients", "Contact Info", "About Company"],
            path: "process_option"
        },
        process_option: {
            message: (params) => {
                const choice = params.userInput;
                if (choice === "Our Products") return knowledge.products;
                if (choice === "Key Clients") return knowledge.clients;
                if (choice === "Contact Info") return knowledge.contact;
                if (choice === "About Company") return knowledge.about;
                return "I didn't catch that. Please select an option.";
            },
            // The magic happens here: We show the options AGAIN immediately after the answer
            // and loop back to the SAME block to process the new choice.
            options: ["Our Products", "Key Clients", "Contact Info", "About Company"],
            path: "process_option"
        }
    };

    // Configuration to remove input, history, and enable strictly option-based flow
    const settings = {
        general: {
            embedded: true,
            showFooter: false, // Hides the input bar entirely
        },
        header: {
            title: "SN Enviro Assistant",
            showAvatar: true,
            avatar: "https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif",
        },
        chatHistory: {
            storageKey: "snenviro_bot_storage",
            disabled: true // Disables storing history in local storage
        },
        botBubble: {
            showAvatar: true,
            avatar: "https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif",
            simStream: true // Simulates typing effect
        },
        userBubble: {
            showAvatar: false
        },
        footer: {
            text: "" // Ensures no placeholder text if footer renders
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-3">
            {/* Toggle Button */}
            {!isBotVisible && (
                <button
                    onClick={() => setIsBotVisible(true)}
                    className="w-20 h-20 rounded-full border-4 border-emerald-500 shadow-lg hover:scale-110 transition-transform bg-white overflow-hidden"
                >
                    <img
                        src="https://i.pinimg.com/originals/0c/67/5a/0c675a8e1061478d2b7b21b330093444.gif"
                        alt="Chat Assistant"
                        className="w-full h-full object-cover"
                    />
                </button>
            )}

            {/* Chat Window */}
            {isBotVisible && (
                <div className="relative w-80 h-[500px] shadow-2xl rounded-2xl overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
                    {/* Custom Close Button Overlay */}
                    <button
                        onClick={() => setIsBotVisible(false)}
                        className="absolute top-3 right-3 z-50 p-1 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-red-500 transition-colors"
                    >
                        <X size={18} />
                    </button>

                    <ChatBot
                        settings={settings}
                        flow={flow}
                    />
                </div>
            )}
        </div>
    );
};

export default ChatBotComponent;
