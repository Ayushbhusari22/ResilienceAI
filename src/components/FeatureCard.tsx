import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './App.css';

interface FeatureCardProps {
    icon: any;
    title: string;
    description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        switch (title) {
            case "Real-time Disaster Monitoring":
                navigate('/prediction');
                break;
            case "Flood Prediction":
                navigate('/flood-prediction');
                break;
            case "Heatwave Prediction":
                navigate('/heatwave-prediction');
                break;
            case "Early Warning System":
                navigate('/learn-more/early-warning');
                break;
            case "Cyclone Analysis":
                navigate('/cyclone-analysis');
                break;
            case "Data Analytics":
                navigate('/data-analytics');
                break;
            default:
                console.log(`Clicked on ${title}`);
        }
    };

    return (
        <button
            onClick={handleClick}
            className="feature-card"
        >
            <div className="feature-icon-container">
                <Icon className="feature-icon" />
            </div>
            <div className="feature-content">
                <div>
                    <h3 className="feature-title">{title}</h3>
                    <p className="feature-description">{description}</p>
                </div>
                <ChevronRight className="feature-chevron" />
            </div>
        </button>
    );
}

export default FeatureCard;