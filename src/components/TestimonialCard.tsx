import { Sparkles } from "lucide-react";

export default function TestimonialCard({ quote, author, role }: { quote: string; author: string; role: string }) {
    return (
        <div className="rounded-2xl p-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-cyan-500/50 transition-all">
            <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed italic">"{quote}"</p>
            <div>
                <p className="font-semibold text-white">{author}</p>
                <p className="text-sm text-cyan-400/80">{role}</p>
            </div>
        </div>
    );
}