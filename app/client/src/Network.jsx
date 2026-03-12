import React from 'react';

const Network = ({ GRAFANA_URL, DASHBOARD_UID }) => {
    // Configuration for your Monitoring Feeds
    const activeFeeds = [
    { id: 1, title: "PROVISIONING RATE", panelId: "1", color: "#38bdf8" }, // Linked to user_add
    { id: 2, title: "SYSTEM THROUGHPUT", panelId: "2", color: "#4ade80" },  // Linked to web_app_calls
    { id: 3, title: "DB CONNECTION STATUS", panelId: "3", color: "#fbbf24" }, // Linked to db_success
    { id: 4, title: "API RESPONSE LATENCY", panelId: "4", color: "#f87171" }  // Linked to duration_ms
];

    return (
        <div style={{ padding: '20px 0', fontFamily: "'Inter', sans-serif" }}>
            
            {/* 1. Header Metadata */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#f8fafc' }}>
                        LIVE TELEMETRY
                    </h2>
                    <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontWeight: '600', letterSpacing: '1px' }}>
                        REAL-TIME METRIC SCRAPING ACTIVE
                    </p>
                </div>
                <div style={{ fontSize: '11px', color: '#334155', fontWeight: 'bold', fontFamily: 'monospace' }}>
                    REFRESH_INTERVAL: 5000MS
                </div>
            </div>

            {/* 2. Monitor Grid */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
                gap: '25px' 
            }}>
                {activeFeeds.map((feed) => (
                    <div key={feed.id} style={{
                        backgroundColor: '#0f172a',
                        borderRadius: '12px',
                        border: '1px solid #1e293b',
                        padding: '20px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* Decorative Sidebar Accent */}
                        <div style={{ 
                            position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', 
                            backgroundColor: feed.color 
                        }}></div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <h3 style={{ margin: 0, fontSize: '12px', color: '#94a3b8', letterSpacing: '1px', fontWeight: '700' }}>
                                FEED_{feed.id.toString().padStart(2, '0')} // {feed.title}
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ height: '6px', width: '6px', borderRadius: '50%', backgroundColor: feed.color }}></span>
                                <span style={{ fontSize: '10px', color: '#475569', fontWeight: 'bold' }}>STREAMING</span>
                            </div>
                        </div>

                        {/* The Grafana Tunnel */}
                        <div style={{ 
                            backgroundColor: '#020617', 
                            borderRadius: '8px', 
                            overflow: 'hidden', 
                            border: '1px solid #1e293b' 
                        }}>
                            <iframe
                                src={`${GRAFANA_URL}/d-solo/${DASHBOARD_UID}/test?orgId=1&panelId=${feed.panelId}&refresh=5s&theme=dark`}
                                width="100%" 
                                height="300" 
                                frameBorder="0"
                                title={feed.title}
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. System Metadata Footer */}
            <div style={{ 
                marginTop: '40px', 
                padding: '15px', 
                backgroundColor: '#020617', 
                border: '1px solid #1e293b', 
                borderRadius: '8px',
                color: '#475569',
                fontSize: '11px',
                textAlign: 'center',
                fontFamily: 'monospace'
            }}>
                NODE_ENDPOINT: <span style={{ color: '#38bdf8' }}>app-server:4000/metrics</span> | 
                COLLECTOR: <span style={{ color: '#38bdf8' }}>PROMETHEUS_V2</span> | 
                STATUS: <span style={{ color: '#38bdf8' }}>STABLE_TUNNEL</span>
            </div>
        </div>
    );
};

export default Network;