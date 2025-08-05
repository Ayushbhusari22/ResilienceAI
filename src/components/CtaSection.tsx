import { useNavigate } from 'react-router-dom';
import { UserPlus, Radio } from 'lucide-react';
import '../App.css';

function CtaSection() {
    const navigate = useNavigate();

    return (
        <div className="cta-section">
            <div className="cta-container">
                <h2 className="cta-title">Join Our Emergency Response Network</h2>
                <p className="cta-subtitle">
                    Be part of a global network of emergency responders and disaster management professionals.
                </p>
                <div className="cta-buttons">
                    <button
                        onClick={() => navigate('/create-account')}
                        className="cta-primary-btn"
                    >
                        <UserPlus className="btn-icon" />
                        Create Account
                    </button>
                    <button
                        onClick={() => navigate('/response-coordination')}
                        className="cta-secondary-btn"
                    >
                        <Radio className="btn-icon" />
                        Emergency Access
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CtaSection;