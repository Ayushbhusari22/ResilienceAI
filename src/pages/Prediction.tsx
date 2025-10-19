import React, { useState } from 'react';
import { ArrowLeft, Globe, MapPin, AlertTriangle, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';


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
  "Other"
].sort();

export default function Prediction() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCountry || !city) {
      setError('Please select a country and enter a city');
      return;
    }

    setError('');
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    navigate('/prediction/results', {
      state: { country: selectedCountry, city }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-slate-400 hover:text-purple-300 transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-3">
              Real-time Disaster Prediction
            </h1>
            <p className="text-slate-400 text-md">
              Enter your location to receive AI-powered disaster risk assessment and early warnings
            </p>
          </div>

          {/* Form Card */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
            <div className="relative z-10 p-8 md:p-12 bg-slate-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}

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
                      setError('');
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
                      setError('');
                    }}
                    required
                    placeholder="e.g., New York, Mumbai, Sydney"
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500 transition-all"
                  />
                </div>

                {/* Submit Button */}
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
        </div>
      </div>
    </div>
  );
}