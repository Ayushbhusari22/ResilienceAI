import React, { useState } from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Prediction() {
  const navigate = useNavigate();
  const [selectedCountry] = useState('India'); // Set default to India and remove setter
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate initial processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Navigate to results page with location data
    navigate('/prediction/results', {
      state: { country: selectedCountry, city }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-[#1E3A8A] to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-white hover:text-[#FACC15] transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Link>

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Real-time Disaster Prediction</h1>
          <p className="text-gray-600 mb-8">
            Enter your location to receive AI-powered disaster risk assessment and early warnings.
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
    </div>
  );
}