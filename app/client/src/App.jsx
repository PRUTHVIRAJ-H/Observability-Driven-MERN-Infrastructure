import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

// Import the components we created
import Header from "./Header";
import Network from "./Network";
import AddUserPage from "./AddUserPage";
import About from "./About";
import Footer from "./Footer";

// Configuration Constants
const SERVER_URL = "https://improved-space-cod-q7pwvqvv477x369xv-4000.app.github.dev";
const GRAFANA_URL = "https://improved-space-cod-q7pwvqvv477x369xv-5000.app.github.dev";
const DASHBOARD_UID = "gw5k24"; 

const App = () => {
    const [isOnline, setIsOnline] = useState(false);

    // Mechanical check for server connectivity
    useEffect(() => {
        const verifySystemLink = () => {
            axios.get(`${SERVER_URL}/`)
                .then((res) => {setIsOnline(true);
                      alert("Connection Successful: " + res.data)
                     }
                    )
                .catch(() => setIsOnline(false));
        };
        
        verifySystemLink();
        const heartbeat = setInterval(verifySystemLink, 10000); // Check every 10s
        return () => clearInterval(heartbeat);
    }, []);

    return (
        <BrowserRouter>
            <div style={{ 
                backgroundColor: '#020617', // Modern deep slate
                minHeight: '100vh', 
                color: 'white', 
                padding: '0 40px', 
                fontFamily: "'Inter', sans-serif" 
            }}>
                
                {/* Header handles navigation and the Add User trigger */}
                <Header isOnline={isOnline} />

                <main style={{ minHeight: '75vh' }}>
                    <Routes>
                        {/* The Network page displays the Grafana grid */}
                        <Route path="/" element={
                            <Network GRAFANA_URL={GRAFANA_URL} DASHBOARD_UID={DASHBOARD_UID} />
                        } />

                        {/* Dedicated page for Provisioning new users/nodes */}
                        <Route path="/add-user" element={
                            <AddUserPage SERVER_URL={SERVER_URL} />
                        } />

                        {/* The new "Blueprint" style About page */}
                        <Route path="/about" element={<About />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default App;
