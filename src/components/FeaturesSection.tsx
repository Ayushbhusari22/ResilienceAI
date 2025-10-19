import FeatureCard from './FeatureCard';
import { AlertTriangle, Brain, Command, Waves, Thermometer } from 'lucide-react';

function FeaturesSection() {
    return (
        <div id="features" className="bg-slate-950">
            <div className="py-20 border-t border-slate-800">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Powerful Capabilities</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Comprehensive suite of AI-driven tools for disaster prediction, response coordination, and population safety
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard icon={Brain} title="Real-time Prediction" description="Advanced ML algorithms predict disasters with unprecedented accuracy" />
                        <FeatureCard icon={AlertTriangle} title="Early Warning System" description="Real-time data processing for immediate threat detection" />
                        <FeatureCard icon={Waves} title="Flood Prediction" description="Machine learning models predicting flood risks" />
                        <FeatureCard icon={Command} title="Response Coordination" description="Automated emergency response and resource optimization" />
                        <FeatureCard icon={Thermometer} title="Heatwave Prediction" description="Health-impact focused heat alerts" />
                        {/* <FeatureCard icon={BarChart3} title="Data Analytics" description="Real-time visualization and predictive insights" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeaturesSection;