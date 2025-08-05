import { Satellite, Radar, Brain } from 'lucide-react';
import './App.css';

function TechnologySection() {
    return (
        <div id="technology" className="technology-section">
            <div className="technology-container">
                <h2 className="section-title">Advanced Technologies</h2>
                <div className="technology-grid">
                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000"
                            alt="Technology Dashboard"
                            className="technology-image"
                        />
                    </div>
                    <div className="technology-list">
                        <div className="technology-item">
                            <Satellite className="technology-icon" />
                            <div>
                                <h3 className="item-title">Satellite Monitoring</h3>
                                <p className="item-description">Real-time satellite imagery analysis for comprehensive environmental monitoring.</p>
                            </div>
                        </div>
                        <div className="technology-item">
                            <Radar className="technology-icon" />
                            <div>
                                <h3 className="item-title">Advanced Radar Systems</h3>
                                <p className="item-description">High-precision weather and atmospheric condition monitoring.</p>
                            </div>
                        </div>
                        <div className="technology-item">
                            <Brain className="technology-icon" />
                            <div>
                                <h3 className="item-title">AI & Machine Learning</h3>
                                <p className="item-description">Cutting-edge algorithms for predictive analysis and risk assessment.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TechnologySection;