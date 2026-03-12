import React from 'react';

const Footer = () => {
    const footerStyle = {
        padding: '40px 0 20px 0',
        marginTop: '50px',
        borderTop: '1px solid #1e293b',
        fontFamily: "'Inter', sans-serif",
        color: '#64748b'
    };

    const containerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px',
        fontWeight: '500',
        letterSpacing: '0.5px'
    };

    const statusItem = {
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    };

    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>
                {/* Left Side: Branding & Copyright */}
                <div>
                    <span style={{ color: '#94a3b8', fontWeight: '700' }}>PRUTHVIRAJ SYSTEMS</span> 
                    <span style={{ margin: '0 8px' }}>|</span> 
                    © 2026 INFRASTRUCTURE PORTAL
                </div>

                {/* Right Side: Environment Metadata */}
                <div style={statusItem}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: '#38bdf8' }}>ENV:</span>
                        <span style={{ color: '#cbd5e1' }}>PRODUCTION-CODESPACE</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: '#38bdf8' }}>STACK:</span>
                        <span style={{ color: '#cbd5e1' }}>MERN + PROMETHEUS</span>
                    </div>
                    <div style={{ 
                        backgroundColor: '#0f172a', 
                        padding: '4px 10px', 
                        borderRadius: '4px', 
                        border: '1px solid #1e293b',
                        color: '#2ecc71'
                    }}>
                        SECURE 
                    </div>
                </div>
            </div>
            
            {/* Bottom Slogan */}
            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '10px', color: '#334155', textTransform: 'uppercase', letterSpacing: '2px' }}>
                End-to-End Observability Pipeline Active
            </div>
        </footer>
    );
};

export default Footer;