interface StatCardProps {
    value: string;
    label: string;
}

function StatCard({ value, label }: StatCardProps) {
    return (
        <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/20 group hover:border-cyan-500/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:via-cyan-500/5 group-hover:to-cyan-500/0 transition-all"></div>
            <div className="relative z-10">
                <p className="text-cyan-400 text-sm font-medium mb-2 uppercase tracking-wider">{label}</p>
                <h3 className="text-4xl font-bold text-white">{value}</h3>
            </div>
        </div>
    );
}
export default StatCard;