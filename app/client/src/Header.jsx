import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ isOnline }) => {
    const location = useLocation();

    // Industry-standard Nav Link Styling
    const linkStyle = (path) => ({
        textDecoration: 'none',
        fontSize: '13px',
        fontWeight: '600',
        letterSpacing: '0.5px',
        padding: '8px 18px',
        borderRadius: '6px',
        transition: '0.3s ease',
        color: location.pathname === path ? '#ffffff' : '#94a3b8',
        backgroundColor: location.pathname === path ? '#334155' : 'transparent',
    });

    return (
        <header style={{ 
            padding: '25px 0', 
            borderBottom: '1px solid #1e293b',
            fontFamily: "'Inter', sans-serif" 
        }}>
            {/* 1. Brand & Status Row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '24px', color: '#f8fafc', fontWeight: '800' }}>
                        MERN INFRASTRUCTURE
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                        <span style={{ 
                            height: '8px', 
                            width: '8px', 
                            borderRadius: '50%', 
                            backgroundColor: isOnline ? '#4ade80' : '#f87171',
                            boxShadow: isOnline ? '0 0 8px #4ade80' : '0 0 8px #f87171' 
                        }}></span>
                        <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: '700', letterSpacing: '1px' }}>
                            {isOnline ? "SYSTEMS OPERATIONAL" : "CONNECTION LOST"}
                        </span>
                    </div>
                </div>
            </div>

            {/* 2. Primary Navigation Row */}
            <nav style={{ 
                display: 'flex', 
                backgroundColor: '#0f172a', 
                padding: '5px', 
                borderRadius: '10px', 
                border: '1px solid #1e293b',
                width: 'fit-content'
            }}>
                <Link to="/" style={linkStyle('/')}>
                    NETWORK MONITORING
                </Link>
                <Link to="/add-user" style={linkStyle('/add-user')}>
                    ADD SYSTEM USER
                </Link>
                <Link to="/about" style={linkStyle('/about')}>
                    ARCHITECTURE
                </Link>
            </nav>
        </header>
    );
};

export default Header;