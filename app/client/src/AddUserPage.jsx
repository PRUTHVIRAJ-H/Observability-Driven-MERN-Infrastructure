import React, { useState } from 'react';
import axios from 'axios';

const AddUserPage = ({ SERVER_URL }) => {
    const [stressLevel, setStressLevel] = useState(10);
    const [name, setName] = useState("");
    const [logs, setLogs] = useState(["[SYSTEM] Ready for provisioning..."]);
    const [isProcessing, setIsProcessing] = useState(false);
    
    const addLog = (message) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [`[${timestamp}] ${message}`, ...prev].slice(0, 5));
    };

    const handleProvision = async () => {
        if (!name) return;
        setIsProcessing(true);
        addLog(`Initiating handshake for node: ${name}...`);

        try {
            await axios.post(`${SERVER_URL}/user/add`, { name });
            addLog(`SUCCESS: Node ${name} added to MongoDB.`);
            addLog(`METRICS: Incrementing Prometheus counter...`);
            setName("");
        } catch (err) {
            addLog(`ERROR: Connection to 0.0.0.0:4000 failed.`);
        } finally {
            setIsProcessing(false);
        }
    };


    const runStressTest = async () => {
       setIsProcessing(true);
    try {
        const response = await axios.post(`${SERVER_URL}/stress`, { 
            intensity: stressLevel 
        });
        alert(response.data.message);
    } catch (err) {
        alert("Stress test failed to execute.");
    } finally {
        setIsProcessing(false);
    }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: "'JetBrains Mono', 'Courier New', monospace" }}>
            <div style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', overflow: 'hidden' }}>
                
                {/* Terminal Header */}
                <div style={{ backgroundColor: '#1e293b', padding: '10px 20px', display: 'flex', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f87171' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#fbbf24' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#4ade80' }}></div>
                </div>

                <div style={{ padding: '30px' }}>
                    <h2 style={{ color: '#38bdf8', marginTop: 0, fontSize: '20px' }}>PROVISION_NODE.EXE</h2>
                    
                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ color: '#64748b', fontSize: '12px', display: 'block', marginBottom: '10px' }}>ENTER NODE IDENTIFIER</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="root@system-node-01"
                                style={{
                                    flex: 1, backgroundColor: '#020617', border: '1px solid #334155',
                                    color: '#4ade80', padding: '12px', borderRadius: '4px', outline: 'none'
                                }}
                            />
                            <button 
                                onClick={handleProvision}
                                disabled={isProcessing}
                                style={{
                                    backgroundColor: '#38bdf8', color: '#0f172a', border: 'none',
                                    padding: '0 20px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer'
                                }}
                            >
                                {isProcessing ? "EXECUTING..." : "RUN"}
                            </button>
                        </div>
                    </div>

                    {/* Console Output */}
                    <div style={{ 
                        backgroundColor: '#020617', padding: '20px', borderRadius: '4px', 
                        border: '1px solid #1e293b', minHeight: '150px' 
                    }}>
                        {logs.map((log, i) => (
                            <div key={i} style={{ 
                                color: log.includes('ERROR') ? '#f87171' : log.includes('SUCCESS') ? '#4ade80' : '#94a3b8',
                                fontSize: '13px', marginBottom: '5px'
                            }}>
                                {log}
                            </div>
                        ))}
                        {isProcessing && <span style={{ color: '#38bdf8' }}>_</span>}
                    </div>
                </div>
            </div>


            <div style={{ marginTop: '30px', borderTop: '1px solid #334155', paddingTop: '20px' }}>
                <h3>System Stress Test</h3>
            <select 
                value={stressLevel} 
                onChange={(e) => setStressLevel(Number(e.target.value))}
                style={{ padding: '10px', borderRadius: '4px', background: '#1e293b', color: 'white' }}
            >
            <option value={10}>Light Load (10 Conns)</option>
            <option value={50}>Medium Load (50 Conns)</option>
            <option value={100}>High Load (100 Conns)</option>
            </select>
            <button onClick={runStressTest} style={{ marginLeft: '10px', backgroundColor: '#ef4444' }}>
                Trigger Stress
            </button>
            </div>
        </div>
    );
};

export default AddUserPage;