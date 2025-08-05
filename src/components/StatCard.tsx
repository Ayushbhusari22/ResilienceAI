import './App.css';

interface StatCardProps {
    value: string;
    label: string;
}

function StatCard({ value, label }: StatCardProps) {
    return (
        <div className="stat-card">
            <h3 className="stat-value">{value}</h3>
            <p className="stat-label">{label}</p>
        </div>
    );
}

export default StatCard;