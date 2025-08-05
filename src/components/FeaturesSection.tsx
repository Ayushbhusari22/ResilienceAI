import FeatureCard from './FeatureCard';
import { Brain, Command, Shield } from 'lucide-react';
import './App.css';

function FeaturesSection() {
    return (
        <div id="features" className="features-section">
            <div className="features-container">
                <h2 className="section-title">Key Capabilities</h2>
                <p className="section-subtitle">
                    Explore our comprehensive suite of AI-powered disaster management tools
                </p>
                <div className="features-grid">
                    <FeatureCard
                        icon={Brain}
                        title="Real-time Disaster Monitoring"
                        description="Disaster monitoring: Focused on wildfires, earthquakes, floods and weather"
                    />
                    {/* <FeatureCard
                        icon={AlertTriangle}
                        title="Early Warning System"
                        description="Advanced ML models process real-time data for accurate early warnings"
                    />
                    <FeatureCard
                        icon={Map}
                        title="Cyclone Analysis"
                        description="Advanced mapping and terrain analysis for precise risk assessment"
                    /> */}
                    <FeatureCard
                        icon={Command}
                        title="Flood Prediction"
                        description="Machine learning models predicting flood risks"
                    />
                    <FeatureCard
                        icon={Shield}
                        title="Heatwave Prediction"
                        description="Health-impact focused heat alerts"
                    />
                    {/* <FeatureCard
                        icon={BarChart3}
                        title="Data Analytics"
                        description="Real-time visualization and predictive analytics"
                    /> */}
                </div>
            </div>
        </div>
    );
}

export default FeaturesSection;