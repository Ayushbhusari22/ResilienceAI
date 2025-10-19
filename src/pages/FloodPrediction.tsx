import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Droplet, History, Info, Globe, AlertTriangle, MapPin, Clock, Signal, Loader2, ArrowRight } from 'lucide-react';
import { predictFlood } from '../models/flood';
import type { ApiError } from '../models/types';
// import "./new.css"
const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Japan",
    "Germany",
    "France",
    "India",
    "Brazil",
    "South Africa",
].sort();

const soilTypes = [
    { name: "Sandy Soil", range: [5, 10] },
    { name: "Silt Soil", range: [20, 30] },
    { name: "Clay Soil", range: [30, 40] },
    { name: "Loamy Soil", range: [25, 35] },
    { name: "Peaty Soil", range: [40, 60] }
];

export default function FloodPrediction() {
    const navigate = useNavigate();
    const [selectedCountry, setSelectedCountry] = useState('');
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
        <div className="min-h-screen bg-slate-950">
            <div className="container mx-auto px-6 py-7">
                <Link
                    to="/"
                    className="inline-flex items-center text-slate-400 hover:text-purple-300 transition-colors mb-2 group"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-3">
                        <div className="flex justify-center mb-1">
                            <div className="w-12 h-12 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                <Globe className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-5xl font-bold text-white m-2">Flood Risk Assessment</h1>
                        <p className="text-slate-400 text-lg">
                            Enter your location to receive AI-powered disaster risk assessment
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-slate-800 relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl px-5">
                        <div className="relative z-10 p-8 md:p-12 bg-slate-800">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                                        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                        <p className="text-red-300 text-sm">{error.error}</p>
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Country Select */}
                                    <div>
                                        <label htmlFor="country" className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                                            <Globe className="w-4 h-4 text-cyan-400" />
                                            Select Country
                                        </label>
                                        <select
                                            id="country"
                                            value={selectedCountry}
                                            onChange={(e) => {
                                                setSelectedCountry(e.target.value);
                                                setError(null);
                                            }}
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="" className="bg-slate-900 text-slate-400">Choose a country...</option>
                                            {countries.map(country => (
                                                <option key={country} value={country} className="bg-slate-900 text-white">{country}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* City Input */}
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-cyan-400" />
                                            Enter City
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            value={city}
                                            onChange={(e) => {
                                                setCity(e.target.value);
                                                setError(null);
                                            }}
                                            required
                                            placeholder="e.g., New York, Mumbai, Sydney"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="dayOption" className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-cyan-400" />
                                            Prediction Period
                                        </label>
                                        <select
                                            id="dayOption"
                                            value={dayOption}
                                            onChange={(e) => setDayOption(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500 transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="" className="bg-slate-900 text-slate-400">Select period</option>
                                            <option value="3" className="bg-slate-900 text-slate-400">Next 3 days (Today)</option>
                                            <option value="4" className="bg-slate-900 text-slate-400">Next 4 days (Tomorrow)</option>
                                            <option value="5" className="bg-slate-900 text-slate-400">Next 5 days (Day after tomorrow)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="soilType" className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                                            <Droplet className="w-4 h-4 text-cyan-400" />
                                            Soil Type

                                        </label>
                                        <select
                                            id="soilType"
                                            value={soilType}
                                            onChange={(e) => setSoilType(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500 transition-all appearance-none cursor-pointer">
                                            <option value="">Select Soil Type</option>
                                            {soilTypes.map(soil => (
                                                <option key={soil.name} value={soil.name} className="bg-slate-900 text-slate-400">
                                                    {soil.name} ({soil.range[0]}%-{soil.range[1]}%)
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label htmlFor="reservoirLevel" className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                                                <Signal className="w-4 h-4 text-cyan-400" />
                                                Reservoir Level (%)
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => setShowReservoirPopup(true)}
                                                className="text-blue-600 font-size hover:text-blue-800 focus:outline-none justbtn"
                                                aria-label="Show reservoir level reference"
                                            >
                                                <Info className="w-5 h-5 text-cyan-400" />
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
                                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="previousFloods" className="block text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                                            <History className="w-4 h-4 text-cyan-400" />
                                            Previous Floods (last month)

                                        </label>
                                        <select
                                            id="previousFloods"
                                            name="previousFloods"
                                            value={previousFloods}
                                            onChange={(e) => setPreviousFloods(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500 transition-all appearance-none cursor-pointer"
                                            required
                                        >
                                            <option value="" className="bg-slate-900 text-slate-400">Select Option</option>
                                            <option value="yes" className="bg-slate-900 text-slate-400">Yes</option>
                                            <option value="no" className="bg-slate-900 text-slate-400">No</option>
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
                                    className={`w-full py-3 px-6 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-all ${loading
                                        ? 'bg-slate-700 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105'
                                        }`}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Analyzing Location...
                                        </>
                                    ) : (
                                        <>
                                            Start Prediction
                                            <ArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Reservoir Level Reference Popup */}
                    {showReservoirPopup && (
                        <div className="fixed inset-0 bg-slate-900/50 bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-slate-700 rounded-lg p-6 max-w-2xl relative">
                                <h3 className="text-lg text-white font-semibold mb-4">Reservoir Level Reference</h3>
                                <img
                                    src="https://i.ibb.co/JWh4WW97/combined.jpg"
                                    alt="Reservoir level reference chart"
                                    className="w-full h-auto rounded"
                                />
                                <div className="mt-4 flex justify-between items-center">
                                    <p className="text-sm text-white">
                                        Use this chart as a reference to estimate the current reservoir level percentage.
                                    </p>
                                    <button
                                        onClick={() => setShowReservoirPopup(false)}
                                        className="ok ml-4 text-white hover:text-white text-md"
                                        aria-label="Close popup"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
