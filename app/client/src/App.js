import React, { useState, useEffect } from "react";
import axios from "axios";

const SERVER_URL = "https://improved-space-cod-q7pwvqvv477x369xv-4000.app.github.dev";
const GRAFANA_URL = "https://improved-space-cod-q7pwvqvv477x369xv-5000.app.github.dev";
const DASHBOARD_UID = "gw5k24"; // Your confirmed UID

const App = () => {
    const [isOnline, setIsOnline] = useState(false);

    // Data for your "Map" - Add or remove panels here
    const dashboardPanels = [
        { id: 1, title: "System Throughput", panelId: "1", color: "#3498db" },
        { id: 2, title: "Database Health", panelId: "2", color: "#2ecc71" },
        { id: 3, title: "Server Latency", panelId: "3", color: "#f1c40f" },
        { id: 4, title: "Error Rate", panelId: "4", color: "#e74c3c" }
    ];

    useEffect(() => {
        axios.get(`${SERVER_URL}/user`)
            .then(() => setIsOnline(true))
            .catch(() => setIsOnline(false));
    }, []);

    return (
        <div style={{ backgroundColor: '#1a1a1a', minHeight: '100vh', color: 'white', padding: '20px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
            
            {/* Header Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '30px' }}>
                <h1 style={{ margin: 0 }}>PRUTHVIRAJ <span style={{ fontWeight: 300 }}>SYSTEMS</span></h1>
                <div style={{ padding: '8px 15px', borderRadius: '20px', backgroundColor: isOnline ? '#27ae6022' : '#e74c3c22', border: `1px solid ${isOnline ? '#27ae60' : '#e74c3c'}`, color: isOnline ? '#2ecc71' : '#e74c3c' }}>
                    ● {isOnline ? "OPERATIONAL" : "DATABASE LINK BROKEN"}
                </div>
            </div>

            {/* The Dashboard Grid using .map() */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
                {dashboardPanels.map((panel) => (
                    <div key={panel.id} style={{ backgroundColor: '#252525', borderRadius: '12px', padding: '15px', borderTop: `4px solid ${panel.color}`, boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>
                        <h3 style={{ marginTop: 0, fontSize: '1.1rem', letterSpacing: '1px' }}>{panel.title}</h3>
                        <iframe
                            src={`${GRAFANA_URL}/d-solo/${DASHBOARD_UID}/test?orgId=1&panelId=${panel.panelId}&refresh=5s&theme=dark`}
                            width="100%" 
                            height="250" 
                            frameBorder="0"
                            style={{ borderRadius: '8px' }}
                        ></iframe>
                    </div>
                ))}
            </div>

            {/* Footer / Quick Stats */}
            <div style={{ marginTop: '40px', padding: '20px', borderTop: '1px solid #333', textAlign: 'center', color: '#666' }}>
                Telemetry Feed Active • Real-time Monitoring Enabled
            </div>
        </div>
    );
};

export default App;
