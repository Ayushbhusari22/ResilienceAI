import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Droplet, CloudRain, History, AlertCircle, Info } from 'lucide-react';
import { predictFlood } from '../models/flood';
import type { ApiError } from '../models/types';
// import "./new.css"

const soilTypes = [
    { name: "Sandy Soil", range: [5, 10] },
    { name: "Silt Soil", range: [20, 30] },
    { name: "Clay Soil", range: [30, 40] },
    { name: "Loamy Soil", range: [25, 35] },
    { name: "Peaty Soil", range: [40, 60] }
];

export default function FloodPrediction() {
    const navigate = useNavigate();
    const [city, setCity] = useState('');
    const [dayOption, setDayOption] = useState('');
    const [soilType, setSoilType] = useState('');
    const [riverLevel] = useState('');
    const [reservoirLevel, setReservoirLevel] = useState('');
    const [previousFloods, setPreviousFloods] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);
    const [showReservoirPopup, setShowReservoirPopup] = useState(false);

    const calculateDate = (daysOption: string) => {
        const daysToAdd = parseInt(daysOption) - 3; // 3=Today, 4=Tomorrow, 5=Day after
        const date = new Date();
        date.setDate(date.getDate() + daysToAdd);
        return date.toISOString().split('T')[0];
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!city || !dayOption) {
            setError({ error: 'Validation Error', message: 'City and prediction period are required' });
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const calculatedDate = calculateDate(dayOption);

            const selectedSoil = soilTypes.find(soil => soil.name === soilType);
            const soilMoisture = selectedSoil
                ? Math.floor(Math.random() * (selectedSoil.range[1] - selectedSoil.range[0] + 1)) + selectedSoil.range[0]
                : 0;

            const previousFloodsValue = previousFloods === "yes" ? 1.0 : 0.0;

            const prediction = await predictFlood({
                city,
                date: calculatedDate,
                soilType,
                soilMoisture,
                riverLevel: parseFloat(riverLevel) || 0,
                reservoirLevel: parseFloat(reservoirLevel) || 0,
                previousFloods: previousFloodsValue
            });

            navigate('/flood-result', {
                state: {
                    prediction: {
                        ...prediction,
                        soilType,
                        previousFloodsSelection: previousFloods
                    },
                    city
                }
            });
        } catch (err) {
            setError({
                error: 'API Error',
                message: err instanceof Error ? err.message : "Failed to fetch flood prediction"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-900 via-[#1E3A8A] to-blue-900">
            <div className="container mx-auto px-6 py-8">
                <Link
                    to="/"
                    className="inline-flex items-center text-white hover:text-[#FACC15] transition-colors mb-8"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Home
                </Link>

                <div className="max-w-[30rem] mx-auto bg-white rounded-xl shadow-xl p-6">
                    <h1 className="text-2xl font-bold text-blue-900 mb-2">Flood Risk Assessment</h1>
                    <p className="text-gray-600 mb-4">
                        Enter location and environmental data for AI-powered flood risk prediction
                    </p>

                    <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded whitespace-nowrap">
                        <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                            <span className="whitespace-nowrap"><strong>Note:</strong> This service is currently only available for India.</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    placeholder="Enter city name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="dayOption" className="block text-sm font-medium text-gray-700 mb-2">
                                    Prediction Period
                                </label>
                                <select
                                    id="dayOption"
                                    value={dayOption}
                                    onChange={(e) => setDayOption(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select period</option>
                                    <option value="3">Next 3 days (Today)</option>
                                    <option value="4">Next 4 days (Tomorrow)</option>
                                    <option value="5">Next 5 days (Day after tomorrow)</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="soilType" className="block text-sm font-medium text-gray-700 mb-2">
                                    <span className="inline-flex items-center">
                                        <Droplet className="inline w-4 h-4 mr-2" />
                                        Soil Type
                                    </span>
                                </label>
                                <select
                                    id="soilType"
                                    value={soilType}
                                    onChange={(e) => setSoilType(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select Soil Type</option>
                                    {soilTypes.map(soil => (
                                        <option key={soil.name} value={soil.name}>
                                            {soil.name} ({soil.range[0]}%-{soil.range[1]}%)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="reservoirLevel" className="block text-sm font-medium text-gray-700">
                                        <span className="inline-flex items-center" >
                                            <CloudRain className="inline w-4 h-4 mr-2" />
                                            Reservoir Level (%)
                                        </span>
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setShowReservoirPopup(true)}
                                        className="text-blue-600 hover:text-blue-800 focus:outline-none justbtn"
                                        aria-label="Show reservoir level reference"
                                    >
                                        <Info className="w-4 h-4" />
                                    </button>
                                </div>
                                <input
                                    type="number"
                                    id="reservoirLevel"
                                    value={reservoirLevel}
                                    onChange={(e) => setReservoirLevel(e.target.value)}
                                    min="0"
                                    max="100"
                                    step="0.1"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="previousFloods" className="block text-sm font-medium text-gray-700 mb-2">
                                    <span className="inline-flex items-center">
                                        <History className="w-4 h-4 mr-2" />
                                        Previous Floods (last month)
                                    </span>
                                </label>
                                <select
                                    id="previousFloods"
                                    name="previousFloods"
                                    value={previousFloods}
                                    onChange={(e) => setPreviousFloods(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Select Option</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                                <strong>{error.error}:</strong> {error.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-6 rounded-lg text-white font-semibold transition-all ${loading
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-[#E63946] hover:bg-red-700 hover:scale-[1.02]'
                                }`}
                        >
                            {loading ? 'Analyzing...' : 'Predict'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Reservoir Level Reference Popup */}
            {showReservoirPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl relative">
                        <h3 className="text-lg font-semibold mb-4">Reservoir Level Reference</h3>
                        <img
                            src="https://i.ibb.co/JWh4WW97/combined.jpg"
                            alt="Reservoir level reference chart"
                            className="w-full h-auto rounded"
                        />
                        <div className="mt-4 flex justify-between items-center">
                            <p className="text-sm text-gray-600">
                                Use this chart as a reference to estimate the current reservoir level percentage.
                            </p>
                            <button
                                onClick={() => setShowReservoirPopup(false)}
                                className="ok ml-4 text-gray-500 hover:text-gray-700 text-sm"
                                aria-label="Close popup"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}