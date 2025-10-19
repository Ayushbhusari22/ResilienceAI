import { useNavigate } from 'react-router-dom';
import { UserPlus, Brain, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const navigate = useNavigate();

  return (
      <div className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">

            <div className="inline-block mb-6 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm">
              <p className="text-purple-300 text-sm font-medium">🚀 Next-Gen Disaster Management</p>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Predict. Prevent. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Protect Lives</span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl">
              Advanced AI-powered disaster response system that predicts catastrophes before they happen, coordinates emergency response, and saves lives through intelligent resource allocation.
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => navigate('/create-account')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2 group"
              >
                <UserPlus className="w-5 h-5" />
              Create Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/learn-more/prediction')}
                className="px-8 py-4 rounded-xl border-2 border-cyan-500/50 text-cyan-300 font-semibold hover:bg-cyan-500/10 transition-all flex items-center gap-2"
              >
                <Brain className="w-5 h-5" />
                Learn More
              </button>
            </div>

          </div>
        </div>
      </div>
  );
}