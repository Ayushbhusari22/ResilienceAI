import { useNavigate } from 'react-router-dom';
import { UserPlus, Brain } from 'lucide-react';
import './App.css';

function HeroSection() {
    const navigate = useNavigate();

    return (
        <div className="hero-section">
            <div className="hero-background">
                <img
                    src="https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?auto=format&fit=crop&w=2000&q=90"
                    alt="Satellite view of hurricane"
                    className="hero-image"
                />
                <div className="hero-overlay"></div>
            </div>
            <div className="hero-content">
                <div className="hero-text">
                    <h1 className="hero-title">AI-Powered Disaster Prediction & Response</h1>
                    <p className="hero-subtitle">
                        Revolutionizing disaster resilience with AI and ML, driving predictive modeling,
                        proactive intervention, and data-driven response strategies.
                    </p>
                    <div className="hero-buttons">
                        <button
                            onClick={() => navigate('/create-account')}
                            className="join-now-btn"
                        >
                            <UserPlus className="btn-icon" />
                            Join Now
                        </button>
                        <button
                            onClick={() => navigate('/learn-more/prediction')}
                            className="learn-more-btn"
                        >
                            <Brain className="btn-icon" />
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;