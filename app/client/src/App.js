import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    // 1. State Hooks
    const [serverStatus, setServerStatus] = useState("FETCHING DETAILS...");
    const [isOnline, setIsOnline] = useState(false);
    const [userName, setUserName] = useState("");
    const [searchName, setSearchName] = useState("");
    const [searchResult, setSearchResult] = useState("");

    const metrics = [
        { id: 1, name: "Active User Sessions", panelId: "1", type: "traffic" },
        { id: 2, name: "Backend CPU Load", panelId: "2", type: "health" },
        { id: 3, name: "Database Query Rate", panelId: "3", type: "health" },
        { id: 4, name: "API Latency (ms)", panelId: "4", type: "traffic" }
    ];

    // 2. The Heartbeat Check (Runs once on mount)
    useEffect(() => {
        const checkStatus = async () => {
            try {
                // Points to your updated /user route
                await axios.get("http://localhost:4000/user");
                setServerStatus("SYSTEM ONLINE ✅");
                setIsOnline(true);
            } catch (error) {
                setServerStatus("SYSTEM OFFLINE ❌");
                setIsOnline(false);
            }
        };
        checkStatus();
    }, []);

    // 3. Dynamic Action: Add User (POST)
    const addUser = async () => {
        try {
            const res = await axios.post("http://localhost:4000/user/add", { name: userName });
            alert(res.data);
        } catch (err) {
            alert("Pipeline Error: Could not add user");
        }
    };

    // 4. Dynamic Action: Search User (GET with Query Params)
    const searchUser = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/user?name=${searchName}`);
            setSearchResult(res.data);
        } catch (err) {
            setSearchResult("User not found in database.");
        }
    };

    return (
        <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh', padding: '20px' }}>
            
            {/* Header Bar */}
            <header style={{ 
                backgroundColor: isOnline ? '#27ae60' : '#c0392b', 
                color: 'white', padding: '15px', borderRadius: '8px', marginBottom: '20px' 
            }}>
                <h1>DevOps Telemetry Hub: {serverStatus}</h1>
            </header>

            {/* Dynamic Controls Section */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', flex: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h3>Register Telemetry User</h3>
                    <input 
                        type="text" 
                        placeholder="Enter Name" 
                        onChange={(e) => setUserName(e.target.value)} 
                    />
                    <button onClick={addUser}>Add to System</button>
                </div>

                <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', flex: 1, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <h3>Database Lookup</h3>
                    <input 
                        type="text" 
                        placeholder="Search Name" 
                        onChange={(e) => setSearchName(e.target.value)} 
                    />
                    <button onClick={searchUser}>Query Record</button>
                    <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{searchResult}</p>
                </div>
            </div>

            {/* Monitoring Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
                {metrics.map(metric => (
                    <div key={metric.id} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px' }}>
                        <h3>{metric.name} <span style={{ fontSize: '12px', color: '#888' }}>({metric.type.toUpperCase()})</span></h3>
                        <iframe
                            src={`http://localhost:3001/d-solo/your-uid?orgId=1&panelId=${metric.panelId}&refresh=5s`}
                            width="100%" height="250" frameBorder="0" title={metric.name}
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
