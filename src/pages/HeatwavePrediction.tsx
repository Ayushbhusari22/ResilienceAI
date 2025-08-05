import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowLeft, AlertCircle } from 'lucide-react';
import { checkHeatwave, fetchHistoricalData } from '../models/heatwave';
import type { ApiError } from '../models/types';
import { Link } from 'react-router-dom';

// Define interfaces for the data structure
interface HeatwaveData {
    [key: string]: any; // Base properties from checkHeatwave
}

interface ResultData extends HeatwaveData {
    historical_data?: any[];
    historical_error?: string;
    latitude?: number;
    longitude?: number;
}

// List of countries for the dropdown
// const countries = [
//     "United States",
//     "Canada",
//     "United Kingdom",
//     "Australia",
//     "Japan",
//     "Germany",
//     "France",
//     "India",
//     "Brazil",
//     "South Africa",
// ].sort();

const fetchCoordinates = async (city: string): Promise<{ lat: number, lng: number }> => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)},India`
        );
        const data = await response.json();
        if (data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lng: parseFloat(data[0].lon)
            };
        }
        return { lat: 0, lng: 0 };
    } catch (error) {
        console.error("Geocoding error:", error);
        return { lat: 0, lng: 0 };
    }
};

export default function HeatwavePrediction() {
    const navigate = useNavigate();
    const [selectedCountry] = useState('');
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!city.trim()) {
            setError({ error: 'Validation Error', message: 'Please enter a city name' });
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await checkHeatwave(city);
            const coordinates = await fetchCoordinates(city);

            let result: ResultData = {
                ...data,
                coordinates,
                latitude: coordinates.lat,
                longitude: coordinates.lng
            };            // };

            // Then try fetching historical data
            try {
                const historicalData = await fetchHistoricalData(city);
                console.log("Historical data received:", historicalData); // Debug log

                // Add historical data to result
                result.historical_data = historicalData;
            } catch (historicalError) {
                console.error("Historical data error:", historicalError); // Debug log

                // If historical data fails, include error info but continue
                result.historical_data = [];
                result.historical_error = historicalError instanceof Error
                    ? historicalError.message
                    : "Failed to fetch historical data";
            }

            // Log the final result before navigation for debugging
            // console.log("Navigating to results with data:", result);

            // Use setTimeout to ensure state is properly set before navigation
            setTimeout(() => {
                navigate('/heatwave-result', {
                    state: { result }
                });
            }, 100);

        } catch (err) {
            console.error("API error:", err);
            setError({
                error: 'API Error',
                message: err instanceof Error ? err.message : "Failed to fetch heatwave data"
            });
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-900 via-[#1E3A8A] to-blue-900">
            <div className="container mx-auto px-4 py-8">
                <Link
                    to="/"
                    className="inline-flex items-center text-white hover:text-[#FACC15] transition-colors mb-8"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Home
                </Link>

                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-8">
                    <h1 className="text-3xl font-bold text-blue-900 mb-2">Heatwave Risk Analysis</h1>
                    <p className="text-gray-600 mb-8">
                        Enter your location to receive AI-powered heatwave risk assessment and early warnings.
                    </p>

                    <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded whitespace-nowrap">
                        <div className="flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                            <span className="whitespace-nowrap"><strong>Note:</strong> This service is currently only available for India.</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                                Country
                            </label>
                            <select
                                id="country"
                                value={selectedCountry}
                                disabled
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100 cursor-not-allowed"
                            >
                                <option value="India">India</option>
                            </select>
                        </div>

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
                                placeholder="Enter your city"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
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
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                                    Analyzing...
                                </span>
                            ) : 'Predict'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}