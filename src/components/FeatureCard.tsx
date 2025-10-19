import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
    icon: any;
    title: string;
    description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        switch (title) {
            case "Real-time Prediction":
                navigate('/prediction');
                break;
            case "Response Coordination":
                navigate('/response-coordination');
                break;
            case "Heatwave Prediction":
                navigate('/heatwave-prediction');
                break;
            case "Early Warning System":
                navigate('/learn-more/early-warning');
                break;
            case "Geospatial Analysis":
                navigate('/geospatial-analysis');
                break;
            case "Data Analytics":
                navigate('/data-analytics');
                break;
            case "Flood Prediction":
                navigate('/flood-prediction');
                break;
            default:
                console.log(`Clicked on ${title}`);
        }
    };

    return (
        <button className="group relative rounded-2xl p-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 text-left overflow-hidden"
            onClick={(handleClick)}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300"></div>

            <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all">
                    <Icon className="w-7 h-7 text-purple-400 group-hover:text-pink-400 transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{description}</p>
                <div className="flex items-center text-purple-400 text-sm font-medium group-hover:text-pink-400 transition-colors">
                    Explore <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </button>
    );
}

export default FeatureCard;