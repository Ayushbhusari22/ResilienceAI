import { Satellite, Radar, Brain } from 'lucide-react';

function TechnologySection() {
    return (
        <div id="technology" className="bg-slate-950">
            <div className="py-20 border-t border-slate-800">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-white mb-16 text-center">Advanced Technology Stack</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Satellite, title: "Satellite Monitoring", desc: "Real-time satellite imagery analysis for global coverage" },
                            { icon: Radar, title: "Advanced Radar", desc: "High-precision weather monitoring systems" },
                            { icon: Brain, title: "AI & ML", desc: "Cutting-edge predictive algorithms" }
                        ].map((tech, idx) => (
                            <div key={idx} className="rounded-2xl p-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-cyan-500/50 transition-all group">
                                <tech.icon className="w-12 h-12 text-purple-400 mb-4 group-hover:text-pink-400 transition-colors" />
                                <h3 className="text-xl font-bold text-white mb-2">{tech.title}</h3>
                                <p className="text-slate-400">{tech.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TechnologySection;