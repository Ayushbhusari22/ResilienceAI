import { useEffect, useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Droplet, Thermometer, Calendar, MapPin, AlertTriangle } from 'lucide-react';
import type { PredictionData } from '../models/types';
import FloodRiskMap from './FloodRiskMap';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import "./new.css"

ChartJS.register(ArcElement, Tooltip, Legend);

const FloodResult = () => {
    // const navigate = useNavigate();
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
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-6">
            <div className="max-w-5xl mx-auto px-4">
                <Link
                    to="/"
                    className="inline-flex items-center text-black hover:text-[#FACC15] transition-colors mb-8 shadow-sm bg-white px-4 py-2 rounded-lg"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Prediction
                </Link>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden ">
                    {/* Enhanced Header */}
                    <div className="okk text-white p-6 shadow-lg">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-bold">Flood Prediction Results</h1>
                                <div className="flex items-center mt-2">
                                    <MapPin className="w-4 h-4 mr-1 text-blue-200" />
                                    <p className="text-blue-100 text-lg font-medium ml-2">{city}</p>
                                </div>
                                <p className="text-blue-200 mt-1">
                                    Flood Risk Assessment
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center text-blue-100 justify-end">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    <span className="text-sm ml-2 mb-2">Last Updated</span>
                                </div>
                                <p className="text-white font-medium">{currentDateTime}</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="p-6 space-y-8">
                        {/* Risk Summary */}
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 shadow-lg">
                            <div className={`text-center p-6 rounded-lg shadow-lg transition-all duration-300 ${data.flood_prediction
                                ? 'bg-gradient-to-r from-red-100 to-red-50 text-red-900 border border-red-200 shadow-red-200/50 hover:shadow-red-300/50'
                                : 'bg-gradient-to-r from-green-100 to-green-50 text-green-900 border border-green-200 shadow-green-200/50 hover:shadow-green-300/50'
                                }`}>
                                <div className="flex justify-center mb-3">
                                    <AlertTriangle className={`w-8 h-8 ${data.flood_prediction ? 'text-red-500' : 'text-green-500'}`} />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">
                                    {data.flood_prediction ? "HIGH FLOOD RISK" : "LOW FLOOD RISK"}
                                </h2>
                                <p className="text-lg">
                                    Probability: <span className="font-bold">{data.flood_probability}%</span>
                                </p>
                                <p className="mt-2">
                                    Risk Level: <span className="font-bold">{getRiskLevel(data.flood_probability)}</span>
                                </p>
                            </div>

                            {/* Risk Meter */}
                            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                                <div className="relative h-6 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full shadow-inner">
                                    <div
                                        className="absolute top-0 h-6 w-2 bg-white border-2 border-gray-800 rounded-full shadow-lg"
                                        style={{
                                            left: `${data.flood_probability}%`,
                                            transform: 'translateX(-50%)'
                                        }}
                                    />
                                </div>
                                <div className="grid grid-cols-3 text-sm font-medium mt-2 text-center">
                                    <span className="text-green-700 drop-shadow-sm">Low (0-34%)</span>
                                    <span className="text-yellow-700 drop-shadow-sm">Medium (35-70%)</span>
                                    <span className="text-red-700 drop-shadow-sm">High (71-100%)</span>
                                </div>
                            </div>
                        </div>

                        {/* Weather and Water Level Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <Thermometer className="w-5 h-5 mr-2 text-blue-600" />
                                    Weather Conditions
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">24h Rainfall:</span>
                                        <span className="font-medium text-gray-900 bg-blue-50 px-3 py-1 rounded-lg shadow-inner">
                                            {data.rainfall_24h} mm
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">72h Rainfall:</span>
                                        <span className="font-medium text-gray-900 bg-blue-50 px-3 py-1 rounded-lg shadow-inner">
                                            {data.rainfall_72h} mm
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Temperature:</span>
                                        <span className="font-medium text-gray-900 bg-blue-50 px-3 py-1 rounded-lg shadow-inner">
                                            {data.temperature} °C
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <Droplet className="w-5 h-5 mr-2 text-blue-600" />
                                    Input Summary
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Soil Type:</span>
                                        <span className="font-medium text-gray-900 bg-blue-50 px-3 py-1 rounded-lg shadow-inner">
                                            {data.soilType}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Previous Floods:</span>
                                        <span className="font-medium text-gray-900 bg-blue-50 px-3 py-1 rounded-lg shadow-inner">
                                            {data.previousFloodsSelection === "yes" ? "Yes" : "No"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Reservoir Level:</span>
                                        <div className="w-32">
                                            <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                                                <div
                                                    className="bg-blue-600 h-4 rounded-full shadow-md"
                                                    style={{ width: `${data.reservoir_level}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs text-gray-600 text-right block mt-1">{data.reservoir_level}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map component */}
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <FloodRiskMap data={data} city={city} />
                        </div>

                        {/* Pie Chart */}
                        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Flood Probability Breakdown</h2>
                            <div className="h-64">
                                <Pie
                                    data={{
                                        labels: ['Flood Probability', 'Non-Flood Probability'],
                                        datasets: [{
                                            data: [data.flood_probability, 100 - data.flood_probability],
                                            backgroundColor: [
                                                data.flood_prediction ? 'rgba(239, 68, 68, 0.7)' : 'rgba(245, 158, 11, 0.7)',
                                                'rgba(16, 185, 129, 0.7)'
                                            ],
                                            borderWidth: 1,
                                        }]
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'bottom',
                                            },
                                        }
                                    }}
                                />
                            </div>
                            <div className="mt-4 text-sm text-gray-600 text-center">
                                {data.flood_prediction ? (
                                    <p className="text-red-600">
                                        There is a {data.flood_probability.toFixed(2)}% chance of flooding based on current conditions.
                                    </p>
                                ) : (
                                    <p className="text-green-600">
                                        There is a {(100 - data.flood_probability).toFixed(2)}% chance of no flooding based on current conditions.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-gray-50 p-4 border-t border-gray-200 text-center text-gray-500 text-sm shadow-inner">
                            Flood prediction data is based on historical and current weather conditions. Always follow local emergency guidelines.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FloodResult;