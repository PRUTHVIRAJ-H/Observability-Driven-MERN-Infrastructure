import React, { Component } from "react";
import axios from "axios";

class App extends Component {
    state = {
        serverStatus: "FETCHING DETAILS...",
        isOnline: false,
        // Using a list to manage variety without hard-coding
        metrics: [
            { id: 1, name: "Active User Sessions", panelId: "1", type: "traffic" },
            { id: 2, name: "Backend CPU Load", panelId: "2", type: "health" },
            { id: 3, name: "Database Query Rate", panelId: "3", type: "health" },
            { id: 4, name: "API Latency (ms)", panelId: "4", type: "traffic" }
        ]
    };

    componentDidMount = async () => {
        try {
            // The Heartbeat check
            await axios.get("/welcome");
            this.setState({ serverStatus: "SYSTEM ONLINE ✅", isOnline: true });
        } catch (error) {
            console.error("Pipeline Break detected:", error);
            this.setState({ serverStatus: "SYSTEM OFFLINE ❌", isOnline: false });
        }
    };

    render() {
        const { serverStatus, isOnline, metrics } = this.state;

        return (
            <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh', padding: '20px' }}>
                {/* 1. Header Status Bar */}
                <header style={{ 
                    backgroundColor: isOnline ? '#27ae60' : '#c0392b', 
                    color: 'white', padding: '10px', borderRadius: '8px', marginBottom: '20px' 
                }}>
                    <h1>DevOps Telemetry Hub: {serverStatus}</h1>
                </header>

                {/* 2. Monitoring Grid (The Map) */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                    gap: '20px' 
                }}>
                    {metrics.map(metric => (
                        <div key={metric.id} style={{ 
                            backgroundColor: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                        }}>
                            <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                                {metric.name} <span style={{fontSize: '12px', color: '#888'}}>({metric.type.toUpperCase()})</span>
                            </h3>
                            
                            {/* The Real-Time Grafana Portal */}
                            <iframe
                                src={`http://localhost:3001/d-solo/your-uid?orgId=1&panelId=${metric.panelId}&refresh=5s`}
                                width="100%"
                                height="250"
                                frameBorder="0"
                                title={metric.name}
                            ></iframe>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default App;
