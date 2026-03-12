import React from 'react';

const flowStepStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 2
};

const circleStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#38bdf8',
    color: '#0f172a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '800',
    boxShadow: '0 0 15px rgba(56, 189, 248, 0.5)'
};

const labelStyle = {
    marginTop: '10px',
    fontSize: '11px',
    color: '#94a3b8',
    fontWeight: '700',
    textTransform: 'uppercase'
};

const connectorStyle = {
    flex: 1,
    height: '2px',
    backgroundColor: '#334155',
    margin: '0 -10px',
    marginTop: '-25px', // Aligns with the middle of the circles
    zIndex: 1
};

const About = () => {
    const sectionStyle = {
        backgroundColor: '#0f172a',
        border: '1px solid #1e293b',
        borderRadius: '16px',
        padding: '40px',
        marginTop: '20px',
        backgroundImage: 'radial-gradient(circle at 2px 2px, #1e293b 1px, transparent 0)',
        backgroundSize: '40px 40px', // Creates a subtle technical grid background
    };

    const techCard = (title, desc, icon) => (
        <div style={{
            backgroundColor: 'rgba(2, 6, 23, 0.8)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #334155',
            backdropFilter: 'blur(10px)'
        }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>{icon}</div>
            <h4 style={{ color: '#38bdf8', margin: '0 0 10px 0', fontSize: '16px' }}>{title}</h4>
            <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>{desc}</p>
        </div>
    );

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
            <div style={sectionStyle}>
                {/* Header Section */}
                <div style={{ textAlign: 'left', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#f8fafc', margin: '0 0 10px 0' }}>
                        The Architecture
                    </h2>
                    <p style={{ color: '#64748b', fontSize: '16px', maxWidth: '600px' }}>
                        A fully decoupled observability pipeline designed for real-time infrastructure monitoring and data persistence.
                    </p>
                </div>

                {/* The "Blueprint" Grid */}
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                    gap: '20px' 
                }}>
                    {techCard(
                        "CORE ENGINE", 
                        "Built on the MERN stack (MongoDB, Express, React, Node) providing a robust foundation for high-concurrency requests.",
                        "⚡"
                    )}
                    {techCard(
                        "METRICS PIPELINE", 
                        "Integrated Prometheus scraping to capture microservice telemetry and custom business logic counters.",
                        "📊"
                    )}
                    {techCard(
                        "VISUALIZATION LAYER", 
                        "Direct Grafana tunneling using UID-based iframes for industry-standard real-time dashboarding.",
                        "🖥️"
                    )}
                    {techCard(
                        "CONTAINER ORCHESTRATION", 
                        "Multi-container deployment using Docker Compose, ensuring environment parity from dev to prod.",
                        "🐳"
                    )}
                </div>

                {/* Interactive Status Footer */}
                <div style={{ 
                    marginTop: '40px', 
                    padding: '20px', 
                    backgroundColor: '#1e293b', 
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ color: '#f8fafc', fontSize: '14px', fontWeight: '600' }}>
                        Project Status: <span style={{ color: '#4ade80' }}>v1.0.4 Live</span>
                    </div>
                    <div style={{ color: '#64748b', fontSize: '13px' }}>
                        Designed by <strong style={{ color: '#38bdf8' }}>Pruthviraj</strong>
                    </div>
                </div>
            </div>


            {/* System Flow Diagram */}
<div style={{ marginTop: '50px' }}>
    <h3 style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'center', marginBottom: '30px', letterSpacing: '2px' }}>DATA FLOW SCHEMATIC</h3>
    
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', padding: '0 20px' }}>
        
        {/* Step 1 */}
        <div style={flowStepStyle}>
            <div style={circleStyle}>01</div>
            <span style={labelStyle}>User Action</span>
        </div>

        <div style={connectorStyle}></div>

        {/* Step 2 */}
        <div style={flowStepStyle}>
            <div style={circleStyle}>02</div>
            <span style={labelStyle}>Express API</span>
        </div>

        <div style={connectorStyle}></div>

        {/* Step 3 */}
        <div style={flowStepStyle}>
            <div style={circleStyle}>03</div>
            <span style={labelStyle}>Prometheus</span>
        </div>

        <div style={connectorStyle}></div>

        {/* Step 4 */}
        <div style={flowStepStyle}>
            <div style={circleStyle}>04</div>
            <span style={labelStyle}>Grafana UI</span>
        </div>
      </div>
    </div>
   </div>
 );
};

export default About;