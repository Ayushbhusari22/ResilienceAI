import { UserPlus, ArrowRight, Radio } from "lucide-react"; 
import { useNavigate } from 'react-router-dom';

export default function CTASection() {
    const navigate = useNavigate();

    return (
        <div className="bg-slate-950">

            <div className="py-20 border-t border-slate-800 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Save Lives?</h2>
                    <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                        Join the global network of emergency responders and disaster management professionals
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <button
                            onClick={() => navigate('/create-account')}
                            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 group"
                        >
                            <UserPlus className="w-5 h-5" />
                            Create Account
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={() => navigate('/response-coordination')}
                            className="px-8 py-4 rounded-xl border-2 border-cyan-500/50 text-cyan-300 font-semibold hover:bg-cyan-500/10 transition-all flex items-center justify-center gap-2 group"
                        >
                            Emergency Access
                            <Radio className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}