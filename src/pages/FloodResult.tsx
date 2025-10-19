import { useEffect, useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Droplet, Thermometer, AlertTriangle, Cloud, Waves, Activity } from 'lucide-react';
import type { PredictionData } from '../models/types';
import FloodRiskMap from './FloodRiskMap';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import "./new.css"

ChartJS.register(ArcElement, Tooltip, Legend);

const FloodMetricCard = ({
    title,
    icon: Icon,
    value,
    unit,
    status
}: {
    title: string;
    icon: any;
    value: string | number;
    unit: string;
    status?: 'normal' | 'warning' | 'critical';
}) => {
    const statusColors = {
        critical: 'from-red-500/20 to-red-500/5 border-red-500/30 hover:border-red-500/50',
        warning: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 hover:border-yellow-500/50',
        normal: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 hover:border-emerald-500/50'
    };

    const statusTextColors = {
        critical: 'text-red-400',
        warning: 'text-yellow-400',
        normal: 'text-emerald-400'
    };

    const statusLabelColors = {
        critical: 'text-red-300',
        warning: 'text-yellow-300',
        normal: 'text-emerald-300'
    };

    const currentStatus = status || 'normal';

    return (
        <div className={`group relative rounded-xl p-4 bg-gradient-to-br ${statusColors[currentStatus]} backdrop-blur-xl border transition-all overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/5 group-hover:to-pink-600/5 transition-all"></div>
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${statusTextColors[currentStatus]}`} />
                        <h3 className="font-medium text-slate-300 text-sm">{title}</h3>
                    </div>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-bold text-white">{value}</span>
                    <span className="text-slate-400 text-xs">{unit}</span>
                </div>
                {status && (
                    <div className={`text-xs font-semibold ${statusLabelColors[currentStatus]}`}>
                        {status === 'critical' ? '🔴 Critical' :
                            status === 'warning' ? '🟡 Warning' :
                                '🟢 Normal'}
                    </div>
                )}
            </div>
        </div>
    );
};

const RiskIndicator = ({ level }: { level: string }) => {
    const getRiskColor = () => {
        switch (level.toLowerCase()) {
            case 'high': return 'text-red-400';
            case 'medium': return 'text-yellow-400';
            default: return 'text-emerald-400';
        }
    };

    const getRiskBg = () => {
        switch (level.toLowerCase()) {
            case 'high': return 'bg-red-400';
            case 'medium': return 'bg-yellow-400';
            default: return 'bg-emerald-400';
        }
    };

    const getRiskLabel = () => {
        switch (level.toLowerCase()) {
            case 'high': return 'High Risk';
            case 'medium': return 'Medium Risk';
            default: return 'Low Risk';
        }
    };

    return (
        <div className={`flex items-center ${getRiskColor()}`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${getRiskBg()} animate-pulse`}></div>
            <span className="font-semibold">{getRiskLabel()}</span>
        </div>
    );
};

const FloodResult = () => {
    const location = useLocation();
    const [isMapReady, setIsMapReady] = useState(false);
    const mapRef = useRef<any>(null);
    const [currentDateTime] = useState(new Date().toLocaleString());
    const [city] = useState(location.state?.city);

    const data: PredictionData = location.state?.prediction || {
        flood_prediction: false,
        flood_probability: 17.18,
        rainfall_24h: 12.5,
        rainfall_72h: 42.3,
        temperature: 28.5,
        latitude: 21.1498134,
        longitude: 79.0820556,
        soilType: 'Clay Soil',
        reservoir_level: 50,
        river_level: 45,
        previousFloodsSelection: 'no'
    };

    useEffect(() => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
        setIsMapReady(true);
    }, [location.state]);

    useEffect(() => {
        if (mapRef.current) {
            setTimeout(() => {
                mapRef.current.invalidateSize();
            }, 100);
        }
    }, [isMapReady]);

    const getRiskLevel = (probability: number) => {
        if (probability < 35) return 'Low';
        if (probability >= 35 && probability <= 70) return 'Medium';
        return 'High';
    };

    if (!isMapReady) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-slate-700 border-t-purple-500 animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header */}
            <div className="relative border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-6 py-8 relative z-10">
                    <Link
                        to="/"
                        className="flex items-center text-slate-400 hover:text-purple-300 transition-colors mb-6 group"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white mb-2">Flood Risk Assessment</h1>
                    <p className="text-slate-400 text-lg">
                        {city} • Last updated: {currentDateTime}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Current Risk Assessment */}
                        <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/5"></div>

                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold text-white mb-6">Current Risk Assessment</h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                    {/* Flood Risk */}
                                    <div className="rounded-xl p-4 bg-slate-800/50 border border-slate-700/50">
                                        <h3 className="text-sm font-medium text-slate-300 mb-3">Flood Risk</h3>
                                        <RiskIndicator level={getRiskLevel(data.flood_probability)} />
                                        <p className="text-slate-400 text-xs mt-3">
                                            Probability: <span className="text-white font-semibold">{data.flood_probability.toFixed(1)}%</span>
                                        </p>
                                    </div>

                                    {/* Rainfall Status */}
                                    <div className="rounded-xl p-4 bg-slate-800/50 border border-slate-700/50">
                                        <h3 className="text-sm font-medium text-slate-300 mb-3">Rainfall Status</h3>
                                        <div className="flex items-center gap-2 text-cyan-400">
                                            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                                            <span className="font-semibold">Active Monitoring</span>
                                        </div>
                                        <p className="text-slate-400 text-xs mt-3">
                                            24h: <span className="text-white font-semibold">{data.rainfall_24h}mm</span>
                                        </p>
                                    </div>

                                    {/* Overall Status */}
                                    <div className="rounded-xl p-4 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
                                        <h3 className="text-sm font-medium text-slate-300 mb-3">Overall Status</h3>
                                        <div className={`flex items-center gap-2 ${data.flood_prediction ? 'text-red-400' : 'text-emerald-400'}`}>
                                            <div className={`w-2 h-2 rounded-full ${data.flood_prediction ? 'bg-red-400' : 'bg-emerald-400'} animate-pulse`}></div>
                                            <span className="font-semibold">{data.flood_prediction ? 'Alert Active' : 'Normal'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Risk Meter */}
                                <div>
                                    <div className="relative h-8 bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500 rounded-full shadow-lg overflow-hidden">
                                        <div
                                            className="absolute top-0 h-8 w-1 bg-white shadow-lg"
                                            style={{
                                                left: `${data.flood_probability}%`,
                                                transform: 'translateX(-50%)'
                                            }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-3 text-xs font-semibold mt-3 px-2">
                                        <span className="text-emerald-300">Low (0-34%)</span>
                                        <span className="text-yellow-300 text-center">Medium (35-70%)</span>
                                        <span className="text-red-300 text-right">High (71-100%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Weather & Input Monitoring */}
                        
                        {/* Map */}
                        <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-4 shadow-2xl">
                            <FloodRiskMap data={data} city={city} />
                        </div>

                        {/* Pie Chart */}
                        <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl">
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold text-white mb-6 text-center">Flood Probability Distribution</h2>
                                <div className="h-64">
                                    <Pie
                                        data={{
                                            labels: ['Flood Probability', 'Non-Flood Probability'],
                                            datasets: [{
                                                data: [data.flood_probability, 100 - data.flood_probability],
                                                backgroundColor: [
                                                    data.flood_prediction ? 'rgba(239, 68, 68, 0.8)' : 'rgba(59, 130, 246, 0.8)',
                                                    'rgba(16, 185, 129, 0.8)'
                                                ],
                                                borderColor: [
                                                    data.flood_prediction ? 'rgba(239, 68, 68, 1)' : 'rgba(59, 130, 246, 1)',
                                                    'rgba(16, 185, 129, 1)'
                                                ],
                                                borderWidth: 2,
                                            }]
                                        }}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            plugins: {
                                                legend: {
                                                    position: 'bottom',
                                                    labels: {
                                                        color: '#cbd5e1',
                                                        font: {
                                                            size: 12,
                                                            weight: 'bold'
                                                        },
                                                        padding: 20
                                                    }
                                                },
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Risk Summary */}
                        <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-2xl">
                            <div className="relative z-10">
                                <h2 className="text-xl font-bold text-white mb-4">Risk Summary</h2>
                                <div className={`p-4 rounded-xl ${data.flood_prediction ? 'bg-red-500/10 border border-red-500/30' : 'bg-emerald-500/10 border border-emerald-500/30'}`}>
                                    <p className={`font-semibold ${data.flood_prediction ? 'text-red-300' : 'text-emerald-300'}`}>
                                        {data.flood_prediction ? 'Flood Warning Active' : 'No Flood Alert'}
                                    </p>
                                    <p className="text-slate-400 text-sm mt-2">
                                        Probability: {data.flood_probability.toFixed(2)}%
                                    </p>

                                </div>
                                <div className={`mt-7 p-4 rounded-xl ${data.flood_prediction ? 'bg-red-500/10 border border-red-500/30' : 'bg-emerald-500/10 border border-emerald-500/30'}`}>
                                    {data.flood_prediction ? (
                                        <p className="text-red-300 font-semibold">
                                            There is a {data.flood_probability.toFixed(2)}% chance of flooding based on current conditions.
                                        </p>
                                    ) : (
                                        <p className="text-emerald-300 font-semibold">
                                            There is a {(100 - data.flood_probability).toFixed(2)}% chance of no flooding based on current conditions.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl">
                            <div className="relative z-10">
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Cloud className="w-6 h-6 text-cyan-400" />
                                    Weather Monitor
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <FloodMetricCard
                                        title="Temperature"
                                        icon={Thermometer}
                                        value={data.temperature}
                                        unit="°C"
                                        status={data.temperature > 30 ? 'warning' : 'normal'}
                                    />
                                    <FloodMetricCard
                                        title="24h Rainfall"
                                        icon={Droplet}
                                        value={data.rainfall_24h}
                                        unit="mm"
                                        status={data.rainfall_24h > 20 ? 'critical' : data.rainfall_24h > 10 ? 'warning' : 'normal'}
                                    />
                                    <FloodMetricCard
                                        title="72h Rainfall"
                                        icon={Waves}
                                        value={data.rainfall_72h.toFixed(2)}
                                        unit="mm"
                                        status={data.rainfall_72h > 50 ? 'critical' : data.rainfall_72h > 30 ? 'warning' : 'normal'}
                                    />
                                    <FloodMetricCard
                                        title="River Level"
                                        icon={Activity}
                                        value={data.river_level}
                                        unit="%"
                                        status={data.river_level > 70 ? 'critical' : data.river_level > 50 ? 'warning' : 'normal'}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Hazard Monitor */}
                        <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl">
                            <div className="relative z-10">
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <AlertTriangle className="w-6 h-6 text-cyan-400" />
                                    Hazard Monitor
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <FloodMetricCard
                                        title="Soil Type"
                                        icon={Droplet}
                                        value={data.soilType}
                                        unit=""
                                    />
                                    <FloodMetricCard
                                        title="Flood Risk"
                                        icon={Waves}
                                        value={getRiskLevel(data.flood_probability).toUpperCase()}
                                        unit=""
                                        status={data.flood_prediction ? 'critical' : 'normal'}
                                    />
                                    <FloodMetricCard
                                        title="Reservoir Level"
                                        icon={Activity}
                                        value={data.reservoir_level}
                                        unit="%"
                                        status={data.reservoir_level > 70 ? 'critical' : data.reservoir_level > 50 ? 'warning' : 'normal'}
                                    />
                                    <FloodMetricCard
                                        title="Previous Floods"
                                        icon={AlertTriangle}
                                        value={data.previousFloodsSelection === "yes" ? "Yes" : "No"}
                                        unit=""
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Key Metrics */}
                        {/* <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-2xl">
                            <div className="relative z-10">
                                <h2 className="text-xl font-bold text-white mb-4">Key Metrics</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                                        <span className="text-slate-400 text-sm">24h Rainfall</span>
                                        <span className="text-white font-bold">{data.rainfall_24h}mm</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                                        <span className="text-slate-400 text-sm">72h Rainfall</span>
                                        <span className="text-white font-bold">{data.rainfall_72h.toFixed(2)}mm</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                                        <span className="text-slate-400 text-sm">Reservoir Level</span>
                                        <span className="text-white font-bold">{data.reservoir_level}%</span>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {/* Information */}
                        <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-2xl">
                            <div className="relative z-10">
                                <h2 className="text-xl font-bold text-white mb-4">Important Notice</h2>
                                <p className="text-slate-400 text-sm">
                                    Flood prediction data is based on historical and current weather conditions. Always follow local emergency guidelines and official warnings.
                                </p>
                            </div>
                        </div>
                    </div>/
                    
                </div>
            </div>
        </div>
    );
};

export default FloodResult;