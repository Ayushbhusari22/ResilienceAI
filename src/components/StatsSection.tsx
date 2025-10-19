import StatCard from './StatCard';
// import './StatsSection.css';

export default function StatsSection() {
    return (
        <div className="bg-slate-950">

            <div className="relative py-20 border-t border-slate-800">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <StatCard value="15min" label="Response Time" />
                        <StatCard value="24/7" label="Monitoring" />
                        <StatCard value="500+" label="Active Sensors" />
                        <StatCard value="12+" label="Risk Factors" />
                    </div>
                </div>
            </div>
        </div>
    );
}