import StatCard from './StatCard';
import './App.css';

function StatsSection() {
    return (
        <div className="stats-section">
            <div className="stats-container">
                <div className="stats-grid">
                    <StatCard value="15min" label="Average Response Time" />
                    <StatCard value="24/7" label="Real-time Monitoring" />
                    <StatCard value="500+" label="Active Sensors" />
                    <StatCard value="12+" label="Risk Factors Analyzed" />
                </div>
            </div>
        </div>
    );
}

export default StatsSection;