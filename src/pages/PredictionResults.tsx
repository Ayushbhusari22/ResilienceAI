import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  ArrowLeft, AlertTriangle, Shield, Wind,
  Droplets, Thermometer, Waves,
  CloudRain, Flame,
} from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import EarthquakeDashboard from './EarthquakeDashboard';

interface DisasterData {
  city: string;
  coordinates: {
    lat: number;
    lon: number;
    name: string;
    country: string;
    admin1: string;
  };
  current_weather: {
    temperature: number;
    humidity: number;
    wind_speed: number;
    pressure: number;
    precipitation: number;
    conditions: string;
    description: string;
    timestamp: string;
  };
  forecast: {
    temperature: number;
    humidity: number;
    wind_speed: number;
    pressure: number;
    precipitation: number;
    probability: number;
    conditions: string;
    description: string;
    timestamp: string;
  };
  flood_data: {
    water_level: number;
    risk_level: string;
    probability: number;
    terrain: string;
    timestamp: string;
  };
  wildfire_data: {
    active_fires: Array<{
      lat: number;
      lng: number;
      distance_km: number;
      intensity: number;
    }>;
    nearby: boolean;
    risk_level: string;
    timestamp: string;
  };
  earthquake_data: {
    recent_earthquakes: Array<{
      lat: number;
      lon: number;
      magnitude: number;
      depth: number;
      distance_km: number;
      timestamp: string;
      location: string;
    }>;
    risk_level: string;
    timestamp: string;
  };
  alerts: Array<{
    type: string;
    level: string;
    message: string;
  }>;
  timestamp: string;
}

const DisasterMetricCard = ({
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

export default function DisasterDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { city } = location.state || {};

  const [disasterData, setDisasterData] = useState<DisasterData | null>(null);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!city) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/disaster-monitor/${city}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDisasterData(data);
      } catch (error) {
        console.error("Error fetching disaster data:", error);
      } finally {
        // setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, [city, navigate]);

  const floodRiskHistory = [
    { time: '00:00', level: 0.5, risk: 20 },
    { time: '03:00', level: 0.7, risk: 25 },
    { time: '06:00', level: 1.2, risk: 35 },
    { time: '09:00', level: 2.5, risk: 50 },
    { time: '12:00', level: 3.8, risk: 65 },
    { time: '15:00', level: 5.2, risk: 75 },
    { time: '18:00', level: 4.5, risk: 70 },
    { time: '21:00', level: 3.2, risk: 60 },
    { time: '24:00', level: 2.8, risk: 55 }
  ];

  const getRiskScore = () => {
    if (!disasterData) return 0;

    let score = 0;
    if (disasterData.flood_data.risk_level === 'high') score += 70;
    else if (disasterData.flood_data.risk_level === 'medium') score += 40;

    if (disasterData.wildfire_data.risk_level === 'high') score += 70;
    else if (disasterData.wildfire_data.risk_level === 'medium') score += 40;

    if (disasterData.current_weather.temperature > 35) score += 30;
    if (disasterData.current_weather.wind_speed > 15) score += 20;
    if (disasterData.current_weather.precipitation > 10) score += 25;

    return Math.min(100, score);
  };

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-slate-950 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="w-16 h-16 rounded-full border-2 border-slate-700 border-t-purple-500 animate-spin mx-auto mb-6"></div>
  //         <p className="text-lg text-slate-400">Loading disaster data for {city}...</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (!disasterData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Link to="/" className="inline-flex items-center text-slate-400 hover:text-purple-300 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
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
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-slate-400 hover:text-purple-300 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">Disaster Risk Dashboard</h1>
          <p className="text-slate-400 text-lg">
            {disasterData.city}, {disasterData.coordinates.country}
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
                    <RiskIndicator level={disasterData.flood_data.risk_level} />
                    <p className="text-slate-400 text-xs mt-3">
                      Water level: <span className="text-white font-semibold">{disasterData.flood_data.water_level}mm</span>
                    </p>
                  </div>

                  {/* Wildfire Risk */}
                  <div className="rounded-xl p-4 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-sm font-medium text-slate-300 mb-3">Wildfire Risk</h3>
                    <RiskIndicator level={disasterData.wildfire_data.risk_level} />
                    <p className="text-slate-400 text-xs mt-3">
                      Active fires: <span className="text-white font-semibold">{disasterData.wildfire_data.active_fires.length}</span>
                    </p>
                  </div>

                  {/* Overall Risk Score */}
                  <div className="rounded-xl p-4 bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
                    <h3 className="text-sm font-medium text-slate-300 mb-3">Overall Risk Score</h3>
                    <div className="flex items-center justify-between">
                      <div className={`text-3xl font-bold ${
                        getRiskScore() > 70 ? 'text-red-400' :
                        getRiskScore() > 40 ? 'text-yellow-400' : 'text-emerald-400'
                      }`}>
                        {getRiskScore()}%
                      </div>
                      <Shield className={`w-8 h-8 ${
                        getRiskScore() > 70 ? 'text-red-400' :
                        getRiskScore() > 40 ? 'text-yellow-400' : 'text-emerald-400'
                      }`} />
                    </div>
                  </div>
                </div>

                {/* Risk Trend Chart */}
                <div className="h-64 rounded-xl overflow-hidden bg-slate-800/30 p-4 border border-slate-700/50">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={floodRiskHistory}>
                      <defs>
                        <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="time" stroke="#94a3b8" />
                      <YAxis yAxisId="left" domain={[0, 10]} stroke="#94a3b8" />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 100]} stroke="#94a3b8" />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#e2e8f0' }} />
                      <Legend />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="level"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.2}
                        name="Water Level (m)"
                      />
                      <Area
                        yAxisId="right"
                        type="monotone"
                        dataKey="risk"
                        stroke="#ef4444"
                        fill="url(#riskGradient)"
                        name="Risk Score (%)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Monitoring Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Weather Monitor */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl">
                <div className="relative z-10">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <CloudRain className="w-6 h-6 text-cyan-400" />
                    Weather Monitor
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <DisasterMetricCard
                      title="Temperature"
                      icon={Thermometer}
                      value={disasterData.current_weather.temperature}
                      unit="°C"
                      status={disasterData.current_weather.temperature > 35 ? 'critical' :
                        disasterData.current_weather.temperature > 30 ? 'warning' : 'normal'}
                    />
                    <DisasterMetricCard
                      title="Wind Speed"
                      icon={Wind}
                      value={disasterData.current_weather.wind_speed.toFixed(2)}
                      unit="m/s"
                      status={disasterData.current_weather.wind_speed > 20 ? 'critical' :
                        disasterData.current_weather.wind_speed > 15 ? 'warning' : 'normal'}
                    />
                    <DisasterMetricCard
                      title="Humidity"
                      icon={Droplets}
                      value={disasterData.current_weather.humidity}
                      unit="%"
                    />
                    <DisasterMetricCard
                      title="Precipitation"
                      icon={CloudRain}
                      value={disasterData.current_weather.precipitation}
                      unit="mm"
                      status={disasterData.current_weather.precipitation > 10 ? 'critical' :
                        disasterData.current_weather.precipitation > 5 ? 'warning' : 'normal'}
                    />
                  </div>
                </div>
              </div>

              {/* Hazard Monitor */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl">
                <div className="relative z-10">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Waves className="w-6 h-6 text-cyan-400" />
                    Hazard Monitor
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <DisasterMetricCard
                      title="Flood Risk"
                      icon={Waves}
                      value={disasterData.flood_data.risk_level.toUpperCase()}
                      unit=""
                      status={disasterData.flood_data.risk_level === 'high' ? 'critical' :
                        disasterData.flood_data.risk_level === 'medium' ? 'warning' : 'normal'}
                    />
                    <DisasterMetricCard
                      title="Fire Risk"
                      icon={Flame}
                      value={disasterData.wildfire_data.risk_level.toUpperCase()}
                      unit=""
                      status={disasterData.wildfire_data.risk_level === 'high' ? 'critical' :
                        disasterData.wildfire_data.risk_level === 'medium' ? 'warning' : 'normal'}
                    />
                    <DisasterMetricCard
                      title="Rain Probability"
                      icon={CloudRain}
                      value={disasterData.forecast.probability}
                      unit="%"
                    />
                    <DisasterMetricCard
                      title="Active Fires"
                      icon={Flame}
                      value={disasterData.wildfire_data.active_fires.length}
                      unit=""
                    />
                  </div>

                  {disasterData.wildfire_data.active_fires.length > 0 && (
                    <div className="h-48 rounded-xl overflow-hidden bg-slate-800/30 p-4 border border-slate-700/50 mt-4">
                      <h3 className="text-sm font-medium text-slate-300 mb-3">Active Fire Distances</h3>
                      <ResponsiveContainer width="100%" height="80%">
                        <BarChart
                          data={disasterData.wildfire_data.active_fires.slice(0, 5).map(fire => ({
                            name: `${fire.distance_km.toFixed(1)} km`,
                            distance: fire.distance_km,
                            intensity: fire.intensity
                          }))}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis type="number" stroke="#94a3b8" />
                          <YAxis dataKey="name" type="category" width={80} stroke="#94a3b8" />
                          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#e2e8f0' }} />
                          <Bar dataKey="distance" name="Distance (km)" fill="#ef4444" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {disasterData && (
              <EarthquakeDashboard coordinates={{
                lat: disasterData.coordinates.lat,
                lon: disasterData.coordinates.lon
              }} />
            )}
          </div>

          {/* Sidebar - Alerts & Recommendations */}
          <div className="space-y-8">
            {/* Live Alerts */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-2xl">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Active Alerts</h2>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    <span className="text-xs text-slate-400">Live</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {disasterData.alerts.length === 0 ? (
                    <p className="text-slate-500 text-center py-4 text-sm">No active alerts</p>
                  ) : (
                    disasterData.alerts.map((alert, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-xl border backdrop-blur-sm ${alert.level === 'high'
                          ? 'bg-red-500/10 border-red-500/30 hover:border-red-500/50'
                          : 'bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500/50'
                        } transition-all`}
                      >
                        <div className="flex items-start gap-3">
                          <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${alert.level === 'high' ? 'text-red-400' : 'text-yellow-400'
                            }`} />
                          <div>
                            <p className={`font-medium text-sm ${alert.level === 'high' ? 'text-red-300' : 'text-yellow-300'
                              }`}>
                              {alert.message}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              {alert.type.toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Safety Recommendations */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-6 shadow-2xl">
              <div className="relative z-10">
                <h2 className="text-xl font-bold text-white mb-6">Safety Recommendations</h2>
                <div className="space-y-3">
                  {disasterData.flood_data.risk_level === 'high' && (
                    <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/30">
                      <h3 className="font-semibold text-blue-300 mb-2 text-sm">Flood Preparedness</h3>
                      <ul className="text-blue-400/80 text-xs list-disc pl-5 space-y-1">
                        <li>Move to higher ground if in flood-prone area</li>
                        <li>Avoid walking through flood waters</li>
                        <li>Follow evacuation orders</li>
                      </ul>
                    </div>
                  )}
                  {disasterData.wildfire_data.risk_level === 'high' && (
                    <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-500/30">
                      <h3 className="font-semibold text-orange-300 mb-2 text-sm">Wildfire Safety</h3>
                      <ul className="text-orange-400/80 text-xs list-disc pl-5 space-y-1">
                        <li>Prepare evacuation plan</li>
                        <li>Create defensible space</li>
                        <li>Monitor fire spread</li>
                      </ul>
                    </div>
                  )}
                  <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
                    <h3 className="font-semibold text-emerald-300 mb-2 text-sm">Emergency Kit</h3>
                    <p className="text-emerald-400/80 text-xs">
                      Prepare water, food, medications, flashlight, batteries, and documents.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30">
                    <h3 className="font-semibold text-purple-300 mb-2 text-sm">Stay Informed</h3>
                    <p className="text-purple-400/80 text-xs">
                      Monitor official alerts and follow local authority instructions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}