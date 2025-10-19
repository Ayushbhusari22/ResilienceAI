import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart, Area, CartesianGrid, Cell } from 'recharts';
import { Thermometer, Droplet, Wind, AlertTriangle, ArrowLeft, Cloud, Activity, TrendingUp } from 'lucide-react';
// import "./new.css"
import HeatwaveMap from './HeatwaveMap';
import 'leaflet/dist/leaflet.css';
import { format } from 'date-fns';

const alertColors = {
    Normal: '#10b981',
    Caution: '#f59e0b',
    Warning: '#f97316',
    Emergency: '#ef4444'
} as const;

const HeatwaveMetricCard = ({
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

export default function HeatwaveResults() {
    const navigate = useNavigate();
    const { state } = useLocation();

    if (!state || !state.result) {
        console.error("Missing result data in state");
        setTimeout(() => navigate('/heatwave-prediction'), 100);
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full border-2 border-slate-700 border-t-purple-500 animate-spin"></div>
            </div>
        );
    }

    const result = state.result;
    const city = result?.city || "Unknown location";
    const current_weather = result?.current_weather || {
        temperature: 0,
        apparent_temperature: 0,
        humidity: 0,
        wind_speed: 0,
        cloud_cover: 0
    };
    const forecast = result?.forecast || [];
    // const historical_data = result?.historical_data || [];
    const heatwave_alert = result?.heatwave_alert || false;
    // const message = result?.message || "";

    const forecastData = (Array.isArray(forecast) ? forecast : []).map((item) => {
        const safeItem = {
            date: item?.date || "Unknown",
            temperature_2m_max: item?.temperature_2m_max || 0,
            apparent_temperature_max: item?.apparent_temperature_max || 0,
            relative_humidity_2m_mean: item?.relative_humidity_2m_mean || 0,
            wind_speed_10m_max: item?.wind_speed_10m_max || 0,
            is_heatwave: item?.is_heatwave || 0,
            alert_level: item?.alert_level || 'Normal',
            heatwave_probability: item?.heatwave_probability || 0
        };

        return {
            date: safeItem.date,
            temperature: safeItem.temperature_2m_max,
            apparentTemp: safeItem.apparent_temperature_max,
            humidity: safeItem.relative_humidity_2m_mean,
            windSpeed: safeItem.wind_speed_10m_max,
            heatwaveProbability: safeItem.heatwave_probability * 100,
            alertLevel: safeItem.alert_level,
            isHeatwave: safeItem.is_heatwave === 1
        };
    });

    const heatwaveProbabilityData = forecastData.map(day => ({
        date: day.date,
        probability: day.heatwaveProbability,
        alertLevel: day.alertLevel
    }));

    // const historicalChartData = (Array.isArray(historical_data) ? historical_data : []).map(item => {
    //     const safeItem = {
    //         year: item?.year || new Date().getFullYear(),
    //         heatwave_occurred: item?.heatwave_occurred || false,
    //         max_temp: item?.max_temp || 0
    //     };

    //     return {
    //         year: safeItem.year,
    //         heatwaves: safeItem.heatwave_occurred ? 1 : 0,
    //         maxTemp: safeItem.max_temp,
    //         alertColor: safeItem.heatwave_occurred ? '#ef4444' : '#10b981'
    //     };
    // });

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header */}
            <div className="relative border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
                <div className="container mx-auto px-6 py-8 relative z-10">
                    <Link
                        to="/"
                        className="flex items-center text-slate-400 hover:text-purple-300 transition-colors mb-6 group"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl font-bold text-white mb-2">Heatwave Risk Assessment</h1>
                    <p className="text-slate-400 text-lg">
                        {city} • Last updated: {new Date().toLocaleString()}
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
                                    {/* Heatwave Risk */}
                                    <div className="rounded-xl p-4 bg-slate-800/50 border border-slate-700/50">
                                        <h3 className="text-sm font-medium text-slate-300 mb-3">Heatwave Risk</h3>
                                        <RiskIndicator level={heatwave_alert ? 'high' : 'low'} />
                                        <p className="text-slate-400 text-xs mt-3">
                                            Status: <span className="text-white font-semibold">{heatwave_alert ? 'Active' : 'Normal'}</span>
                                        </p>
                                    </div>

                                    {/* Temperature Status */}
                                    <div className="rounded-xl p-4 bg-slate-800/50 border border-slate-700/50">
                                        <h3 className="text-sm font-medium text-slate-300 mb-3">Temperature Status</h3>
                                        <div className="flex items-center gap-2 text-orange-400">
                                            <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
                                            <span className="font-semibold">Active Monitoring</span>
                                        </div>
                                        <p className="text-slate-400 text-xs mt-3">
                                            Current: <span className="text-white font-semibold">{current_weather.temperature}°C</span>
                                        </p>
                                    </div>

                                    {/* Overall Status */}
                                    <div className="rounded-xl p-4 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
                                        <h3 className="text-sm font-medium text-slate-300 mb-3">Overall Status</h3>
                                        <div className={`flex items-center gap-2 ${heatwave_alert ? 'text-red-400' : 'text-emerald-400'}`}>
                                            <div className={`w-2 h-2 rounded-full ${heatwave_alert ? 'bg-red-400' : 'bg-emerald-400'} animate-pulse`}></div>
                                            <span className="font-semibold">{heatwave_alert ? 'Alert Active' : 'Normal'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-4 shadow-2xl">
                            <HeatwaveMap
                                cityData={{
                                    name: city,
                                    lat: state.result?.coordinates?.lat || state.result?.latitude || 0,
                                    lng: state.result?.coordinates?.lng || state.result?.longitude || 0
                                }}
                                forecastData={forecastData}
                                currentWeather={current_weather}
                            />
                        </div>

                        {/* Temperature Forecast Chart */}
                        {forecastData.length > 0 && (
                            <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl">
                                <div className="relative z-10">
                                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                        <TrendingUp className="w-6 h-6 text-cyan-400" />
                                        7-Day Temperature Forecast
                                    </h2>
                                    <div className="h-80 rounded-xl overflow-hidden bg-slate-800/50 border border-slate-700/50 p-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <ComposedChart data={forecastData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                                <XAxis dataKey="date" stroke="#94a3b8" />
                                                <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#94a3b8" />
                                                <Tooltip contentStyle={{
                                                    backgroundColor: '#1e293b',
                                                    border: '1px solid #475569',
                                                    borderRadius: '8px',
                                                    color: '#e2e8f0'
                                                }} />
                                                <Area
                                                    type="monotone"
                                                    dataKey="temperature"
                                                    fill="#f97316"
                                                    stroke="transparent"
                                                    fillOpacity={0.1}
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="temperature"
                                                    stroke="#f97316"
                                                    strokeWidth={3}
                                                    dot={{ r: 4, fill: "#f97316" }}
                                                    activeDot={{ r: 6 }}
                                                    name="Temperature"
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="apparentTemp"
                                                    stroke="#ef4444"
                                                    strokeWidth={3}
                                                    dot={{ r: 4, fill: "#ef4444" }}
                                                    activeDot={{ r: 6 }}
                                                    name="Feels Like"
                                                />
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Heatwave Probability Chart */}
                        {forecastData.length > 0 && (
                            <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl">
                                <div className="relative z-10">
                                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                        <AlertTriangle className="w-6 h-6 text-red-400" />
                                        Heatwave Risk Probability
                                    </h2>
                                    <div className="h-80 rounded-xl overflow-hidden bg-slate-800/50 border border-slate-700/50 p-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={heatwaveProbabilityData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                                <XAxis dataKey="date" stroke="#94a3b8" tickFormatter={(dateStr) => format(new Date(dateStr), 'MMM d')} />
                                                <YAxis domain={[0, 100]} stroke="#94a3b8" />
                                                <Tooltip contentStyle={{
                                                    backgroundColor: '#1e293b',
                                                    border: '1px solid #475569',
                                                    borderRadius: '8px',
                                                    color: '#e2e8f0',
                                                    padding: '8px 12px',
                                                    fontSize: '14px'
                                                }} />
                                                <Bar dataKey="probability" name="Heatwave Probability" radius={[4, 4, 0, 0]}>
                                                    {heatwaveProbabilityData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={alertColors[entry.alertLevel as keyof typeof alertColors] || '#10b981'} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Risk Summary */}
                        <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-2xl">
                            <div className="relative z-10">
                                <h2 className="text-xl font-bold text-white mb-4">Risk Summary</h2>
                                <div className={`p-4 rounded-xl ${heatwave_alert ? 'bg-red-500/10 border border-red-500/30' : 'bg-emerald-500/10 border border-emerald-500/30'}`}>
                                    <p className={`text-sm font-semibold ${heatwave_alert ? 'text-red-300' : 'text-emerald-300'}`}>
                                        {heatwave_alert ? 'Heatwave Warning' : 'Normal Conditions'}
                                    </p>
                                    <p className="text-slate-400 text-xs mt-2">
                                        Temperature: {current_weather.temperature}°C
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Weather Monitor */}
                        <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl">
                            <div className="relative z-10">
                                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Cloud className="w-6 h-6 text-cyan-400" />
                                    Weather Monitor
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <HeatwaveMetricCard
                                        title="Temperature"
                                        icon={Thermometer}
                                        value={current_weather.temperature}
                                        unit="°C"
                                        status={current_weather.temperature > 35 ? 'critical' :
                                            current_weather.temperature > 30 ? 'warning' : 'normal'}
                                    />
                                    <HeatwaveMetricCard
                                        title="Feels Like"
                                        icon={Thermometer}
                                        value={current_weather.apparent_temperature}
                                        unit="°C"
                                        status={current_weather.apparent_temperature > 35 ? 'critical' :
                                            current_weather.apparent_temperature > 30 ? 'warning' : 'normal'}
                                    />
                                    <HeatwaveMetricCard
                                        title="Humidity"
                                        icon={Droplet}
                                        value={current_weather.humidity}
                                        unit="%"
                                    />
                                    <HeatwaveMetricCard
                                        title="Wind Speed"
                                        icon={Wind}
                                        value={current_weather.wind_speed.toFixed(1)}
                                        unit="m/s"
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
                                    <HeatwaveMetricCard
                                        title="Heatwave Risk"
                                        icon={AlertTriangle}
                                        value={heatwave_alert ? 'HIGH' : 'LOW'}
                                        unit=""
                                        status={heatwave_alert ? 'critical' : 'normal'}
                                    />
                                    <HeatwaveMetricCard
                                        title="Cloud Cover"
                                        icon={Cloud}
                                        value={current_weather.cloud_cover}
                                        unit="%"
                                    />
                                    <HeatwaveMetricCard
                                        title="Alert Status"
                                        icon={Activity}
                                        value={heatwave_alert ? 'ALERT' : 'NORMAL'}
                                        unit=""
                                        status={heatwave_alert ? 'critical' : 'normal'}
                                    />
                                    <HeatwaveMetricCard
                                        title="Forecast Days"
                                        icon={Activity}
                                        value={forecastData.length}
                                        unit="days"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Information */}
                        <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-2xl">
                            <div className="relative z-10">
                                <h2 className="text-xl font-bold text-white mb-4">Important Notice</h2>
                                <p className="text-slate-400 text-sm">
                                    Heatwave predictions are based on current weather data and historical patterns. Always follow local heat alerts and health guidelines.
                                </p>
                            </div>
                        </div>
                    </div>
            </div>

            {/* Detailed Forecast Dropdown */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl mt-7">
                <details className="group">
                    <summary className="cursor-pointer list-none p-6 text-white font-semibold text-lg bg-slate-800/60 hover:bg-slate-800/80 transition-colors flex items-center justify-between">
                        <span>📊 Detailed Forecast Table</span>
                        <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>

                    <div className="p-8 border-t border-slate-700/50">
                        {forecastData.length > 0 ? (
                            <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-2xl">
                                <div className="relative z-10">
                                    <h2 className="text-2xl font-bold text-white mb-6">Detailed Forecast</h2>
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-slate-700">
                                                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Date</th>
                                                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Temp (°C)</th>
                                                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Feels Like</th>
                                                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Humidity</th>
                                                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Wind</th>
                                                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Heatwave Risk</th>
                                                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">Alert Level</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {forecastData.map((day, index) => (
                                                    <tr key={index} className="border-b border-slate-700/50 hover:bg-slate-800/50 transition-colors">
                                                        <td className="py-3 px-4 text-slate-300 text-sm">{day.date}</td>
                                                        <td className="py-3 px-4 text-white font-semibold">{day.temperature}°C</td>
                                                        <td className="py-3 px-4 text-slate-300">{day.apparentTemp}°C</td>
                                                        <td className="py-3 px-4 text-slate-300">{day.humidity}%</td>
                                                        <td className="py-3 px-4 text-slate-300">{day.windSpeed} km/h</td>
                                                        <td className="py-3 px-4 text-slate-300">{day.heatwaveProbability.toFixed(1)}%</td>
                                                        <td className="py-3 px-4">
                                                            <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${day.alertLevel === 'Emergency' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                                                                day.alertLevel === 'Warning' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                                                                    day.alertLevel === 'Caution' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                                                                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                                                }`}>
                                                                {day.alertLevel}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-6 text-slate-400">
                                No forecast data available.
                            </div>
                        )}
                    </div>
                </details>
            </div>
            </div>
        </div>

    );
}