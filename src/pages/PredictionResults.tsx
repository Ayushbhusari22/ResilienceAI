import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  ArrowLeft, AlertTriangle, Shield, Wind,
  Droplets, Thermometer, Waves,
  CloudRain, Flame
} from 'lucide-react';
// import { format } from 'date-fns';
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
// import React from 'react';

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
}) => (
  <div className="bg-white rounded-lg p-4 shadow">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-gray-600" />
        <h3 className="font-medium text-gray-700">{title}</h3>
      </div>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-gray-500 text-sm">{unit}</span>
    </div>
    {status && (
      <div className={`mt-2 text-sm ${status === 'critical' ? 'text-red-500' :
        status === 'warning' ? 'text-yellow-500' :
          'text-green-500'
        }`}>
        {status === 'critical' ? 'Critical' :
          status === 'warning' ? 'Warning' :
            'Normal'}
      </div>
    )}
  </div>
);

const RiskIndicator = ({ level }: { level: string }) => {
  const getRiskColor = () => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      default: return 'text-green-500';
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
      <div className={`w-3 h-3 rounded-full mr-2 ${getRiskColor().replace('text', 'bg')}`}></div>
      <span className="font-medium">{getRiskLabel()}</span>
    </div>
  );
};

export default function DisasterDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { city } = location.state || {};

  const [disasterData, setDisasterData] = useState<DisasterData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [lastUpdated, setLastUpdated] = useState<string>('');

  // Simulate fetching data from your Python backend
  useEffect(() => {
    if (!city) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call to your Python backend
        const response = await fetch(`http://localhost:5000/disaster-monitor/${city}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Simulated response matching your Python backend structure
        // const mockData: DisasterData = {
        //   city: city,
        //   coordinates: {
        //     lat: 18.98,
        //     lon: 72.83,
        //     name: city,
        //     country: "India",
        //     admin1: "Maharashtra"
        //   },
        //   current_weather: {
        //     temperature: 28.2,
        //     humidity: 91,
        //     wind_speed: 2.1,
        //     pressure: 1013,
        //     precipitation: 0.0,
        //     conditions: "Clear",
        //     description: "Clear skies",
        //     timestamp: new Date().toISOString()
        //   },
        //   forecast: {
        //     temperature: 27.9,
        //     humidity: 87,
        //     wind_speed: 3.2,
        //     pressure: 1012,
        //     precipitation: 0.0,
        //     probability: 0,
        //     conditions: "Clear",
        //     description: "Clear skies",
        //     timestamp: new Date(Date.now() + 3600000).toISOString()
        //   },
        //   flood_data: {
        //     water_level: 0.0,
        //     risk_level: "low",
        //     probability: 0,
        //     terrain: "flat",
        //     timestamp: new Date().toISOString()
        //   },
        //   wildfire_data: {
        //     active_fires: [],
        //     nearby: false,
        //     risk_level: "low",
        //     timestamp: new Date().toISOString()
        //   },
        //   alerts: [],
        //   timestamp: new Date().toISOString()
        // };

        // // For Ooty simulation (uncomment to test)
        // if (city.toLowerCase() === 'ooty') {
        //   mockData.current_weather.precipitation = 8.5;
        //   mockData.current_weather.conditions = "Moderate Rain";
        //   mockData.current_weather.description = "Moderate rain (8.5mm)";
        //   mockData.forecast.precipitation = 12.0;
        //   mockData.forecast.probability = 85;
        //   mockData.forecast.conditions = "Heavy Rain";
        //   mockData.flood_data.water_level = 15.2;
        //   mockData.flood_data.risk_level = "high";
        //   mockData.flood_data.probability = 85;
        //   mockData.flood_data.terrain = "hilly";
        //   mockData.alerts = [
        //     {
        //       type: "weather",
        //       level: "high",
        //       message: "Heavy rain expected in the next hour: 12.0 mm"
        //     },
        //     {
        //       type: "flood",
        //       level: "high",
        //       message: "High flood risk! Water level: 15.2 mm"
        //     }
        //   ];
        // }

        // setDisasterData(mockData);
        setDisasterData(data);

        // setLastUpdated(format(new Date(), 'HH:mm:ss'));
      } catch (error) {
        console.error("Error fetching disaster data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Set up polling (every 5 minutes in this example)
    const interval = setInterval(fetchData, 300000);

    return () => clearInterval(interval);
  }, [city, navigate]);

  // Prepare chart data
  // const weatherHistory = [
  //   { time: '00:00', temp: 26, humidity: 85 },
  //   { time: '03:00', temp: 25, humidity: 88 },
  //   { time: '06:00', temp: 24, humidity: 90 },
  //   { time: '09:00', temp: 26, humidity: 87 },
  //   { time: '12:00', temp: 29, humidity: 80 },
  //   { time: '15:00', temp: 30, humidity: 75 },
  //   { time: '18:00', temp: 28, humidity: 82 },
  //   { time: '21:00', temp: 27, humidity: 85 },
  //   { time: '24:00', temp: 26, humidity: 88 }
  // ];

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
    // Flood risk contribution
    if (disasterData.flood_data.risk_level === 'high') score += 70;
    else if (disasterData.flood_data.risk_level === 'medium') score += 40;

    // Wildfire risk contribution
    if (disasterData.wildfire_data.risk_level === 'high') score += 70;
    else if (disasterData.wildfire_data.risk_level === 'medium') score += 40;

    // Weather risk contribution
    if (disasterData.current_weather.temperature > 35) score += 30;
    if (disasterData.current_weather.wind_speed > 15) score += 20;
    if (disasterData.current_weather.precipitation > 10) score += 25;

    return Math.min(100, score);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-700">Loading disaster data for {city}...</p>
        </div>
      </div>
    );
  }

  if (!disasterData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Link
          to="/"
          className="inline-flex items-center text-white hover:text-[#FACC15] transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold mb-2">Disaster Risk Dashboard</h1>
          <div className="flex items-center">
            <span className="text-lg text-yellow-400">
              {/* <MapPin size={14} /> */}
              {disasterData.city}, {disasterData.coordinates.country}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Risk Assessment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Risk Level */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Current Risk Assessment</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Flood Risk</h3>
                  <RiskIndicator level={disasterData.flood_data.risk_level} />
                  <p className="text-gray-600 text-sm mt-2">
                    Water level: {disasterData.flood_data.water_level}mm
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-orange-800 mb-2">Wildfire Risk</h3>
                  <RiskIndicator level={disasterData.wildfire_data.risk_level} />
                  <p className="text-gray-600 text-sm mt-2">
                    {disasterData.wildfire_data.active_fires.length} active fires
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">Overall Risk Score</h3>
                  <div className="flex items-center justify-between">
                    <div className={`text-3xl font-bold ${getRiskScore() > 70 ? 'text-red-500' :
                      getRiskScore() > 40 ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                      {getRiskScore()}%
                    </div>
                    <Shield className={`w-8 h-8 ${getRiskScore() > 70 ? 'text-red-500' :
                      getRiskScore() > 40 ? 'text-yellow-500' : 'text-green-500'
                      }`} />
                  </div>
                </div>
              </div>

              {/* Risk Trend Chart */}
              <div className="h-64 mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={floodRiskHistory}>
                    <defs>
                      <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E63946" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#E63946" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" domain={[0, 10]} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="level"
                      stroke="#1D3557"
                      fill="#1D3557"
                      fillOpacity={0.2}
                      name="Water Level (m)"
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="risk"
                      stroke="#E63946"
                      fill="url(#riskGradient)"
                      name="Risk Score (%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monitoring Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Weather Monitoring */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <CloudRain className="w-6 h-6 text-blue-500" />
                  Weather Monitor
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
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

                {/* Weather History Chart */}
                {/* <div className="h-64 mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weatherHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis yAxisId="temp" domain={['auto', 'auto']} />
                      <YAxis yAxisId="humidity" orientation="right" domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="temp"
                        type="monotone"
                        dataKey="temp"
                        stroke="#E63946"
                        name="Temperature (°C)"
                      />
                      <Line
                        yAxisId="humidity"
                        type="monotone"
                        dataKey="humidity"
                        stroke="#457B9D"
                        name="Humidity (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div> */}


              </div>


              {/* Flood & Fire Monitoring */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Waves className="w-6 h-6 text-blue-500" />
                  Hazard Monitor
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
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

                {/* Fire Distance Chart */}
                {disasterData.wildfire_data.active_fires.length > 0 && (
                  <div className="h-64 mt-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Active Fire Distances</h3>
                    <ResponsiveContainer width="100%" height="80%">
                      <BarChart
                        data={disasterData.wildfire_data.active_fires.slice(0, 5).map(fire => ({
                          name: `${fire.distance_km.toFixed(1)} km`,
                          distance: fire.distance_km,
                          intensity: fire.intensity
                        }))}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={80} />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="distance"
                          name="Distance (km)"
                          fill="#E63946"
                          radius={[0, 4, 4, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>

            {disasterData && (
              <EarthquakeDashboard coordinates={{
                lat: disasterData.coordinates.lat,
                lon: disasterData.coordinates.lon
              }} />
            )}
          </div>

          {/* Alerts and Recommendations */}
          <div className="space-y-8">
            {/* Live Alerts */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Active Alerts</h2>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-sm text-gray-500">Live Updates</span>
                </div>
              </div>
              <div className="space-y-4">
                {disasterData.alerts.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No active alerts</p>
                ) : (
                  disasterData.alerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${alert.level === 'high'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-yellow-50 border-yellow-200'
                        }`}
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className={`w-5 h-5 flex-shrink-0 ${alert.level === 'high' ? 'text-red-500' : 'text-yellow-500'
                          }`} />
                        <div>
                          <p className={`font-medium ${alert.level === 'high' ? 'text-red-800' : 'text-yellow-800'
                            }`}>
                            {alert.message}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {alert.type.toUpperCase()} ALERT
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Safety Recommendations */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Safety Recommendations</h2>
              <div className="space-y-4">
                {disasterData.flood_data.risk_level === 'high' && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">Flood Preparedness</h3>
                    <ul className="text-blue-600 text-sm list-disc pl-5 space-y-1">
                      <li>Move to higher ground if in flood-prone area</li>
                      <li>Avoid walking or driving through flood waters</li>
                      <li>Follow evacuation orders from local authorities</li>
                    </ul>
                  </div>
                )}
                {disasterData.wildfire_data.risk_level === 'high' && (
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h3 className="font-semibold text-orange-800 mb-2">Wildfire Safety</h3>
                    <ul className="text-orange-600 text-sm list-disc pl-5 space-y-1">
                      <li>Prepare an evacuation plan with multiple routes</li>
                      <li>Create defensible space around your property</li>
                      <li>Stay informed about fire spread directions</li>
                    </ul>
                  </div>
                )}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">Emergency Kit</h3>
                  <p className="text-green-600 text-sm">
                    Prepare an emergency kit with water, non-perishable food, medications,
                    flashlight, batteries, and important documents.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-purple-800 mb-2">Stay Informed</h3>
                  <p className="text-purple-600 text-sm">
                    Monitor official weather alerts and follow instructions from local authorities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}