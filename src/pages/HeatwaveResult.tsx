import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, ComposedChart, Area, CartesianGrid, Cell } from 'recharts';
import { Thermometer, Droplet, Wind, AlertTriangle, MapIcon, ArrowLeft } from 'lucide-react';
import "./new.css"

const alertColors = {
    Normal: '#4CAF50',
    Caution: '#FFC107',
    Warning: '#FF9800',
    Emergency: '#F44336'
} as const;
import HeatwaveMap from './HeatwaveMap';
import 'leaflet/dist/leaflet.css';
import { format } from 'date-fns';

// type AlertLevel = keyof typeof alertColors;

// const getCoordinates = async (city: string) => {
//     try {
//         const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)}`);
//         const data = await response.json();
//         if (data.length > 0) {
//             return {
//                 lat: parseFloat(data[0].lat),
//                 lng: parseFloat(data[0].lon)
//             };
//         }
//         return { lat: 0, lng: 0 };
//     } catch (error) {
//         return { lat: 0, lng: 0 };
//     }
// };



export default function HeatwaveResults() {
    const navigate = useNavigate();
    const { state } = useLocation();

    if (!state || !state.result) {
        console.error("Missing result data in state");
        setTimeout(() => navigate('/heatwave-prediction'), 100);
        return (
            <div className="min-h-screen bg-white text-gray-800 flex items-center justify-center">
                <p>Loading results...</p>
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
    const historical_data = result?.historical_data || [];
    const heatwave_alert = result?.heatwave_alert || false;
    const message = result?.message || "";

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

    // const alertCounts = forecastData.reduce((acc, day) => {
    //     const level = day.alertLevel || 'Normal';
    //     acc[level] = (acc[level] || 0) + 1;
    //     return acc;
    // }, {} as Record<string, number>);

    // const alertDistribution = Object.keys(alertColors).map((level) => ({
    //     name: level,
    //     value: alertCounts[level] || 0,
    //     color: alertColors[level as AlertLevel]
    // }));

    const heatwaveProbabilityData = forecastData.map(day => ({
        date: day.date,
        probability: day.heatwaveProbability,
        alertLevel: day.alertLevel
    }));

    const historicalChartData = (Array.isArray(historical_data) ? historical_data : []).map(item => {
        const safeItem = {
            year: item?.year || new Date().getFullYear(),
            heatwave_occurred: item?.heatwave_occurred || false,
            max_temp: item?.max_temp || 0
        };

        return {
            year: safeItem.year,  // Keep as number
            heatwaves: safeItem.heatwave_occurred ? 1 : 0,
            maxTemp: safeItem.max_temp,
            alertColor: safeItem.heatwave_occurred ? '#F44336' : '#4CAF50'
        };
    });



    return (
        <div className="min-h-screen bg-white text-gray-800">
            <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
                <Link
                    to="/"
                    className="inline-flex items-center text-black hover:text-[#FACC15] transition-colors mb-2"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Home
                </Link>
                {/* Header Section - Responsive */}
                <div className="bk mb-2 bg-blue-600 rounded-lg p-4 sm:p-6 border border-blue-700 shadow-md">
                    <div className=" sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">Heatwave Analysis for {city}</h1>
                            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4">
                                <div className={`px-2 py-1 size rounded-full ${heatwave_alert ? 'text-red-800' : 'text-green-800'}`}>
                                    {heatwave_alert ? 'Heatwave Alert' : 'Normal Conditions'}
                                </div>
                                <div className="text-blue-100 text-sm sm:text-base">Last updated: {new Date().toLocaleString()}</div>
                            </div>
                        </div>
                        {/* <div className="flex items-center gap-2 px-1 py-2 rounded-lg text-yellow-800">
                            <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="font-medium text-sm sm:text-base">AI Analysis</span>
                        </div> */}
                    </div>

                    {message && (
                        <div className="mt-4 p-3 bg-blue-700 rounded-lg">
                            <p className="text-white text-sm sm:text-base">{message}</p>
                        </div>
                    )}
                </div>

                {/* Add this after your header section */}
               {/* // Update the map component to use the coordinates */}
                <div className="mt-6 mb-6">
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

                <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
                    {/* Weather Summary Cards - Responsive */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-6">
                        {/* Temperature Card */}
                        <div className="bg-blue-50 p-4 sm:p-5 rounded-lg border border-blue-100">
                            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <Thermometer className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
                                <h3 className="text-base sm:text-lg font-semibold">Temperature</h3>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-end gap-1 sm:gap-2">
                                <p className="text-3xl sm:text-4xl font-bold">{current_weather.temperature || 0}°C</p>
                                <p className="text-blue-600 text-sm sm:text-base">Feels like {current_weather.apparent_temperature || 0}°C</p>
                            </div>
                        </div>

                        {/* Humidity Card */}
                        <div className="bg-teal-50 p-4 sm:p-5 rounded-lg border border-teal-100">
                            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <Droplet className="text-teal-600 w-5 h-5 sm:w-6 sm:h-6" />
                                <h3 className="text-base sm:text-lg font-semibold">Humidity</h3>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-3xl sm:text-4xl font-bold">{current_weather.humidity || 0}%</p>
                                <div className="w-full mt-1 sm:mt-2">
                                    <div className="h-2 w-full bg-teal-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-teal-500 rounded-full"
                                            style={{ width: `${current_weather.humidity || 0}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Wind Speed Card */}
                        <div className="bg-purple-50 p-4 sm:p-5 rounded-lg border border-purple-100">
                            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <Wind className="text-purple-600 w-5 h-5 sm:w-6 sm:h-6" />
                                <h3 className="text-base sm:text-lg font-semibold">Wind Speed</h3>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-3xl sm:text-4xl font-bold">{current_weather.wind_speed || 0} km/h</p>
                                <p className="text-purple-600 text-sm sm:text-base mt-1 sm:mt-2">
                                    {current_weather.wind_speed < 10 ? 'Light breeze' :
                                        current_weather.wind_speed < 20 ? 'Moderate breeze' :
                                            current_weather.wind_speed < 30 ? 'Strong breeze' : 'Very strong wind'}
                                </p>
                            </div>
                        </div>

                        {/* Conditions Card */}
                        <div className="bg-indigo-50 p-4 sm:p-5 rounded-lg border border-indigo-100">
                            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <div className="text-xl sm:text-2xl">{
                                    (current_weather.cloud_cover || 0) > 70 ? '☁️' :
                                        (current_weather.cloud_cover || 0) > 30 ? '⛅' : '☀️'
                                }</div>
                                <h3 className="text-base sm:text-lg font-semibold">Conditions</h3>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-xl sm:text-2xl font-bold">{
                                    (current_weather.cloud_cover || 0) > 70 ? 'Cloudy' :
                                        (current_weather.cloud_cover || 0) > 30 ? 'Partly Cloudy' : 'Clear Sky'
                                }</p>
                                <p className="text-indigo-600 text-sm sm:text-base mt-1 sm:mt-2">{current_weather.cloud_cover || 0}% cloud cover</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content - Responsive */}
                    <div className="p-4 sm:p-6">
                        {forecastData.length > 0 ? (
                            <>
                                {/* Temperature Forecast Chart */}
                                <div className="sml3 mb-8 sm:mb-12">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
                                        <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                                            <MapIcon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                                            <span>7-Day Temperature Forecast</span>
                                        </h2>
                                        {/* <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm sm:text-base">
                                            <Info size={16} className="sm:w-5 sm:h-5" />
                                            <span>Details</span>
                                        </button> */}
                                    </div>
                                    <div className="h-64 sm:h-80 md:h-96 bg-white border border-gray-200 rounded-lg p-2 sm:p-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <ComposedChart data={forecastData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                                <XAxis
                                                    dataKey="date"
                                                    tick={{ fill: '#6b7280' }}
                                                    axisLine={{ stroke: '#d1d5db' }}
                                                />
                                                <YAxis
                                                    domain={['dataMin - 2', 'dataMax + 2']}
                                                    tick={{ fill: '#6b7280' }}
                                                    axisLine={{ stroke: '#d1d5db' }}
                                                    label={{
                                                        value: 'Temperature (°C)',
                                                        angle: -90,
                                                        position: 'insideLeft',
                                                        fill: '#4b5563'
                                                    }}
                                                />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: '#ffffff',
                                                        borderColor: '#e5e7eb',
                                                        borderRadius: '0.5rem',
                                                        color: '#111827'
                                                    }}
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="temperature"
                                                    fill="#3b82f6"
                                                    stroke="transparent"
                                                    fillOpacity={0.1}
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="temperature"
                                                    stroke="#3b82f6"
                                                    strokeWidth={3}
                                                    dot={{ r: 4, fill: "#3b82f6" }}
                                                    activeDot={{ r: 6 }}
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="apparentTemp"
                                                    stroke="#ef4444"
                                                    strokeWidth={3}
                                                    dot={{ r: 4, fill: "#ef4444" }}
                                                    activeDot={{ r: 6 }}
                                                />
                                            </ComposedChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Heatwave Probability Chart */}
                                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                                    <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                                        <span>Heatwave Risk Probability</span>
                                    </h3>
                                    <div className="h-64 sm:h-80">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={heatwaveProbabilityData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                                <XAxis
                                                    dataKey="date"
                                                    tick={{ fill: '#6b7280' }}
                                                    axisLine={{ stroke: '#d1d5db' }}
                                                    tickFormatter={(dateStr) => format(new Date(dateStr), 'MMM d')}
                                                />
                                                <YAxis
                                                    domain={[0, 100]}
                                                    tick={{ fill: '#6b7280' }}
                                                    axisLine={{ stroke: '#d1d5db' }}
                                                    label={{
                                                        value: 'Probability (%)',
                                                        angle: -90,
                                                        position: 'insideLeft',
                                                        fill: '#4b5563'
                                                    }}
                                                />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: '#ffffff',
                                                        borderColor: '#e5e7eb',
                                                        borderRadius: '0.5rem',
                                                        color: '#111827',
                                                        // idth: '200px',
                                                        padding: '8px 12px',
                                                        fontSize: '14px'
                                                    }}
                                                    formatter={(value: any) => [
                                                        `${parseFloat(value).toFixed(2) }%`,
                                                        'Probability'
                                                    ]}
                                                    labelFormatter={(label) => `Date: ${label}`}
                                                />
                                                <Bar
                                                    dataKey="probability"
                                                    name="Heatwave Probability"
                                                    radius={[4, 4, 0, 0]}
                                                >
                                                    {heatwaveProbabilityData.map((entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={alertColors[entry.alertLevel as keyof typeof alertColors] || '#10b981'}
                                                        />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Historical Data Chart - Responsive */}
                                {historicalChartData.length > 0 && (
                                    <div className="mb-8 sm:mb-12">
                                        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Historical Heatwave Occurrences</h2>
                                        <div className="h-64 sm:h-80 md:h-96 bg-white border border-gray-200 rounded-lg p-2 sm:p-4">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={historicalChartData}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                                    <XAxis
                                                        dataKey="year"
                                                        tick={{ fill: '#6b7280' }}
                                                        axisLine={{ stroke: '#d1d5db' }}
                                                    />
                                                    <YAxis
                                                        yAxisId="left"
                                                        orientation="left"
                                                        tick={{ fill: '#6b7280' }}
                                                        axisLine={{ stroke: '#d1d5db' }}
                                                        label={{
                                                            value: 'Occurrences',
                                                            angle: -90,
                                                            position: 'insideLeft',
                                                            fill: '#4b5563'
                                                        }}
                                                    />
                                                    <YAxis
                                                        yAxisId="right"
                                                        orientation="right"
                                                        tick={{ fill: '#6b7280' }}
                                                        axisLine={{ stroke: '#d1d5db' }}
                                                        label={{
                                                            value: 'Max Temp (°C)',
                                                            angle: -90,
                                                            position: 'insideRight',
                                                            fill: '#4b5563'
                                                        }}
                                                    />
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor: '#ffffff',
                                                            borderColor: '#e5e7eb',
                                                            borderRadius: '0.5rem',
                                                            color: '#111827'
                                                        }}
                                                    />
                                                    <Bar
                                                        yAxisId="left"
                                                        dataKey="heatwaves"
                                                        name="Heatwave Occurred"
                                                    >
                                                        {historicalChartData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.alertColor} />
                                                        ))}
                                                    </Bar>
                                                    <Bar
                                                        yAxisId="right"
                                                        dataKey="maxTemp"
                                                        name="Max Temp (°C)"
                                                        fill="#84cc16"
                                                    />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                )}

                                {/* Detailed Forecast Table */}
                                <div className="forecast-table-container">
                                    <h2 className="forecast-table-title text-lg sm:text-xl" style={{ color: '#111827' }}>Detailed Forecast</h2>
                                    <div className="table-wrapper">
                                        <table className="forecast-table">
                                            <thead>
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Temp (°C)</th>
                                                    <th>Feels Like</th>
                                                    <th>Humidity</th>
                                                    <th>Wind</th>
                                                    <th>Heatwave Risk</th>
                                                    <th>Alert Level</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {forecastData.map((day, index) => (
                                                    <tr key={index}>
                                                        <td>{day.date}</td>
                                                        <td>{day.temperature}°C</td>
                                                        <td>{day.apparentTemp}°C</td>
                                                        <td>{day.humidity}%</td>
                                                        <td>{day.windSpeed} km/h</td>
                                                        <td>{day.heatwaveProbability.toFixed(1)}%</td>
                                                        <td>
                                                            <span
                                                                className={`alert-badge ${day.alertLevel === 'Emergency' ? 'emergency' :
                                                                    day.alertLevel === 'Warning' ? 'warning' :
                                                                        day.alertLevel === 'Caution' ? 'caution' : 'normal'
                                                                    }`}
                                                            >
                                                                {day.alertLevel}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="p-4 sm:p-8 text-center">
                                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">No forecast data available</h2>
                                <p className="text-gray-600 text-sm sm:text-base">Unable to load forecast data for this location.</p>
                                <button
                                    onClick={() => navigate('/heatwave-prediction')}
                                    className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base"
                                >
                                    Try another location
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}