// import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, Radio, UserPlus } from 'lucide-react';
import '/App.css';

interface NavbarProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
    isScrolled: boolean;
}

function Navbar({ activeSection, setActiveSection, isScrolled }: NavbarProps) {
    const navigate = useNavigate();

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <div className="logo-icon">
                        <Shield className="shield-icon" />
                        <Zap className="zap-icon" />
                    </div>
                    <div>
                        <h1 className="logo-text">
                            Resilience<span className="logo-highlight">AI</span>
                        </h1>
                        <p className="logo-subtext">PREDICTIVE RESPONSE SYSTEM</p>
                    </div>
                </div>
                <div className="navbar-links">
                    <button
                        onClick={() => {
                            setActiveSection('features');
                            document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`nav-link ${activeSection === 'features' ? 'active' : ''}`}
                    >
                        Features
                    </button>
                    <button
                        onClick={() => {
                            setActiveSection('technology');
                            document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`nav-link ${activeSection === 'technology' ? 'active' : ''}`}
                    >
                        Technology
                    </button>
                    <button
                        onClick={() => {
                            setActiveSection('about');
                            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                    >
                        About
                    </button>
                    <button
                        onClick={() => navigate('/response-coordination')}
                        className="emergency-access-btn"
                    >
                        <Radio className="btn-icon" />
                        Emergency Access
                    </button>
                    <button
                        onClick={() => navigate('/create-account')}
                        className="create-account-btn"
                    >
                        <UserPlus className="btn-icon" />
                        Create Account
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;