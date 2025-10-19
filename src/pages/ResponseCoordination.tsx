import { useState } from 'react';
import {
  AlertCircle, Phone, MapPin, Shield, Thermometer,
  Waves, Flame, Wind, ArrowLeft, Zap, ChevronDown, ChevronUp,
  AlertTriangle, Users, Book, Download, Sparkles
} from 'lucide-react';

export default function ResponseCoordination() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto px-6 py-6">
        <button
          onClick={() => window.location.href = '/'}
          className="inline-flex items-center text-slate-400 hover:text-purple-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Home</span>
        </button>

        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-3">
            <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Zap className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-6xl md:text-6xl font-bold text-white mb-3 leading-tight">
            Disaster <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Response Guide</span>
          </h1>
          <div className="flex items-center justify-center gap-6 text-lg md:text-md text-slate-300 font-semibold flex-wrap">
            <span className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
              <AlertTriangle className="w-5 h-5 text-cyan-400" />
              Prediction
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
              <Shield className="w-5 h-5 text-purple-400" />
              Preparation
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-slate-700">
              <Users className="w-5 h-5 text-pink-400" />
              Response
            </span>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="relative rounded-2xl overflow-hidden p-8 mb-12 border border-slate-700/50">
          <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 via-pink-600/5 to-slate-900/0"></div>
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-8">
              <Phone className="w-8 h-8 text-red-400" />
              Emergency Contacts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'National Emergency', number: '112', priority: true },
                { title: 'NDRF Helpline', number: '011-24363260', priority: false },
                { title: 'Ambulance', number: '108', priority: true },
                { title: 'Fire Department', number: '101', priority: true },
                { title: 'Police', number: '100', priority: true },
                { title: 'Women Safety', number: '1091', priority: false }
              ].map((contact, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-6 bg-slate-800/50 backdrop-blur-xl border transition-all hover:shadow-lg hover:shadow-red-500/20 ${contact.priority ? 'border-red-500/50 hover:border-red-500' : 'border-slate-700/50 hover:border-purple-500/50'
                    }`}
                >
                  <p className="text-slate-400 text-sm mb-2">{contact.title}</p>
                  <p className={`font-bold text-3xl ${contact.priority ? 'text-red-400' : 'text-purple-400'}`}>
                    {contact.number}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Critical Alert Banner */}
        <div className="relative rounded-2xl overflow-hidden p-6 mb-12 border border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <AlertCircle className="w-8 h-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-white">Emergency Situation?</h3>
                <p className="text-slate-300 text-sm">Call 112 immediately or contact nearest authority</p>
              </div>
            </div>
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all flex items-center gap-2 flex-shrink-0">
              <Download className="w-4 h-4" />
              Emergency Guide
            </button>
          </div>
        </div>

        {/* Disaster Types */}
        <div className="space-y-8 mb-12">
          {/* Floods */}
          <div className={`group relative rounded-2xl overflow-hidden transition-all ${expandedSections.floods ? 'ring-2 ring-cyan-500/50' : ''
            }`}>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl border border-slate-700/50 p-8">
              <button
                onClick={() => toggleSection('floods')}
                className="w-full text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                      <Waves className="w-7 h-7 text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Floods</h2>
                  </div>
                  <div className="text-slate-400 hover:text-cyan-400 transition-colors">
                    {expandedSections.floods ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </div>
                </div>
              </button>

              {!expandedSections.floods && (
                <p className="text-slate-400 mt-4">Continuous heavy rainfall, rising water levels, IMD warnings</p>
              )}

              {expandedSections.floods && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Alert Signs
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-cyan-400 flex-shrink-0">•</span><span>Heavy rainfall for 24+ hours</span></li>
                      <li className="flex gap-2"><span className="text-cyan-400 flex-shrink-0">•</span><span>Rising water levels in rivers and dams</span></li>
                      <li className="flex gap-2"><span className="text-cyan-400 flex-shrink-0">•</span><span>IMD warnings for specific regions</span></li>
                      <li className="flex gap-2"><span className="text-cyan-400 flex-shrink-0">•</span><span>Backing up of drains or sewers</span></li>
                    </ul>
                  </div>

                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Safety Measures
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Move to higher ground immediately</span></li>
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Avoid walking through flood waters</span></li>
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Disconnect electrical appliances</span></li>
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Keep emergency kit ready</span></li>
                    </ul>
                  </div>

                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Prone Areas
                    </h3>
                    <p className="text-slate-300 text-sm">Assam, Bihar, Uttarakhand, West Bengal, Odisha, Kerala, Maharashtra, Gujarat</p>
                  </div>

                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-cyan-300 mb-4">Regional Helplines</h3>
                    <div className="space-y-2 text-sm">
                      <div><p className="text-slate-400">Bihar SDRF</p><p className="text-cyan-400 font-bold">0612-2294204</p></div>
                      <div><p className="text-slate-400">Assam SDRF</p><p className="text-cyan-400 font-bold">0361-2237011</p></div>
                      <div><p className="text-slate-400">Kerala SDMA</p><p className="text-cyan-400 font-bold">0471-2331345</p></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Heatwaves */}
          <div className={`group relative rounded-2xl overflow-hidden transition-all ${expandedSections.heatwaves ? 'ring-2 ring-orange-500/50' : ''
            }`}>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl border border-slate-700/50 p-8">
              <button
                onClick={() => toggleSection('heatwaves')}
                className="w-full text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                      <Thermometer className="w-7 h-7 text-orange-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Heatwaves</h2>
                  </div>
                  <div className="text-slate-400 hover:text-orange-400 transition-colors">
                    {expandedSections.heatwaves ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </div>
                </div>
              </button>

              {!expandedSections.heatwaves && (
                <p className="text-slate-400 mt-4">Temperatures exceeding 40°C, IMD Red Alert warnings, prolonged high heat</p>
              )}

              {expandedSections.heatwaves && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-orange-300 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Alert Signs
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span><span>Temps exceeding 40°C in plains</span></li>
                      <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span><span>IMD Red Alert warnings</span></li>
                      <li className="flex gap-2"><span className="text-orange-400 flex-shrink-0">•</span><span>Prolonged heat for 4-5 days</span></li>
                    </ul>
                  </div>

                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-orange-300 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Safety Measures
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Stay indoors during 11am-3pm</span></li>
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Stay hydrated with water and ORS</span></li>
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Wear light-colored clothes</span></li>
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Cover head outdoors</span></li>
                    </ul>
                  </div>

                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-orange-300 mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Prone Areas
                    </h3>
                    <p className="text-slate-300 text-sm">Rajasthan, Vidarbha, Telangana, Andhra Pradesh, Punjab, Haryana, Delhi</p>
                  </div>

                  <div className="rounded-xl p-6 bg-red-500/10 border border-red-500/30">
                    <h3 className="text-lg font-bold text-red-300 mb-4">Heat Stroke Symptoms</h3>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-red-400 flex-shrink-0">⚠</span><span>Body temp above 103°F</span></li>
                      <li className="flex gap-2"><span className="text-red-400 flex-shrink-0">⚠</span><span>Hot, red, dry skin</span></li>
                      <li className="flex gap-2"><span className="text-red-400 flex-shrink-0">⚠</span><span>Rapid pulse, throbbing headache</span></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Earthquakes */}
          <div className={`group relative rounded-2xl overflow-hidden transition-all ${expandedSections.earthquakes ? 'ring-2 ring-purple-500/50' : ''
            }`}>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl border border-slate-700/50 p-8">
              <button
                onClick={() => toggleSection('earthquakes')}
                className="w-full text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                      <AlertTriangle className="w-7 h-7 text-purple-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Earthquakes</h2>
                  </div>
                  <div className="text-slate-400 hover:text-purple-400 transition-colors">
                    {expandedSections.earthquakes ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </div>
                </div>
              </button>

              {!expandedSections.earthquakes && (
                <p className="text-slate-400 mt-4">Drop, Cover, Hold - Get under sturdy furniture immediately</p>
              )}

              {expandedSections.earthquakes && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-purple-300 mb-4">During Earthquake</h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-purple-400 flex-shrink-0">•</span><span><strong>Drop, Cover, Hold:</strong> Under sturdy furniture</span></li>
                      <li className="flex gap-2"><span className="text-purple-400 flex-shrink-0">•</span><span>Stay away from windows</span></li>
                      <li className="flex gap-2"><span className="text-purple-400 flex-shrink-0">•</span><span>If outdoors, move to open areas</span></li>
                      <li className="flex gap-2"><span className="text-purple-400 flex-shrink-0">•</span><span>If in vehicle, pull over safely</span></li>
                    </ul>
                  </div>

                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-purple-300 mb-4">After Earthquake</h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Check for injuries</span></li>
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Check for structural damage</span></li>
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Turn off utilities if damaged</span></li>
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Be prepared for aftershocks</span></li>
                    </ul>
                  </div>

                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      High Risk Zones
                    </h3>
                    <p className="text-slate-300 text-sm">Himalayan belt, Kashmir, Himachal Pradesh, Uttarakhand, North Bihar, Northeast India</p>
                  </div>

                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-purple-300 mb-4">Emergency Contacts</h3>
                    <div className="space-y-2 text-sm">
                      <div><p className="text-slate-400">Seismology Centre</p><p className="text-purple-400 font-bold">011-24611842</p></div>
                      <div><p className="text-slate-400">Geological Survey</p><p className="text-purple-400 font-bold">033-22861693</p></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Wildfires */}
          <div className={`group relative rounded-2xl overflow-hidden transition-all ${expandedSections.wildfires ? 'ring-2 ring-red-500/50' : ''
            }`}>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl border border-slate-700/50 p-8">
              <button
                onClick={() => toggleSection('wildfires')}
                className="w-full text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                      <Flame className="w-7 h-7 text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Wildfires</h2>
                  </div>
                  <div className="text-slate-400 hover:text-red-400 transition-colors">
                    {expandedSections.wildfires ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </div>
                </div>
              </button>

              {!expandedSections.wildfires && (
                <p className="text-slate-400 mt-4">Smoke, fires in forest areas, Forest Dept warnings, extended dry periods</p>
              )}

              {expandedSections.wildfires && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-red-300 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Alert Signs
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-red-400 flex-shrink-0">•</span><span>Smoke or fire in forests</span></li>
                      <li className="flex gap-2"><span className="text-red-400 flex-shrink-0">•</span><span>Forest Dept warnings</span></li>
                      <li className="flex gap-2"><span className="text-red-400 flex-shrink-0">•</span><span>Extended dry periods</span></li>
                    </ul>
                  </div>

                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-red-300 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Safety Measures
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Evacuate immediately</span></li>
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Cover nose with wet cloth</span></li>
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Follow evacuation routes</span></li>
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Report to forest dept</span></li>
                    </ul>
                  </div>

                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-red-300 mb-4">Prone Areas</h3>
                    <p className="text-slate-300 text-sm">Uttarakhand, Himachal Pradesh, J&K, Northeast states, Maharashtra, Odisha, Chhattisgarh</p>
                  </div>

                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-red-300 mb-4">Regional Contacts</h3>
                    <div className="space-y-2 text-sm">
                      <div><p className="text-slate-400">Forest Survey of India</p><p className="text-red-400 font-bold">0135-2752872</p></div>
                      <div><p className="text-slate-400">Uttarakhand Helpline</p><p className="text-red-400 font-bold">1800-180-4111</p></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cyclones */}
          <div className={`group relative rounded-2xl overflow-hidden transition-all ${expandedSections.cyclones ? 'ring-2 ring-cyan-500/50' : ''
            }`}>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl border border-slate-700/50 p-8">
              <button
                onClick={() => toggleSection('cyclones')}
                className="w-full text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center">
                      <Wind className="w-7 h-7 text-cyan-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Cyclones</h2>
                  </div>
                  <div className="text-slate-400 hover:text-cyan-400 transition-colors">
                    {expandedSections.cyclones ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </div>
                </div>
              </button>

              {!expandedSections.cyclones && (
                <p className="text-slate-400 mt-4">IMD cyclone warnings, unusual ocean waves, rapid wind changes</p>
              )}

              {expandedSections.cyclones && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Alert Signs
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-cyan-400 flex-shrink-0">•</span><span>IMD cyclone warnings</span></li>
                      <li className="flex gap-2"><span className="text-cyan-400 flex-shrink-0">•</span><span>Unusually large ocean waves</span></li>
                      <li className="flex gap-2"><span className="text-cyan-400 flex-shrink-0">•</span><span>Rapid wind changes</span></li>
                      <li className="flex gap-2"><span className="text-cyan-400 flex-shrink-0">•</span><span>Government evacuation notices</span></li>
                    </ul>
                  </div>

                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Safety Measures
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Evacuate when ordered</span></li>
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Move to cyclone shelters</span></li>
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Store drinking water and food</span></li>
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Secure loose items outside</span></li>
                    </ul>
                  </div>

                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Prone Areas
                    </h3>
                    <p className="text-slate-300 text-sm">Eastern coast (Odisha, West Bengal, Andhra Pradesh, Tamil Nadu), Western coast (Gujarat, Maharashtra, Goa, Kerala)</p>
                  </div>

                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-cyan-300 mb-4">Emergency Contacts</h3>
                    <div className="space-y-2 text-sm">
                      <div><p className="text-slate-400">IMD Cyclone Warning</p><p className="text-cyan-400 font-bold">1800-220-161</p></div>
                      <div><p className="text-slate-400">Odisha Disaster Helpline</p><p className="text-cyan-400 font-bold">1077/1070</p></div>
                      <div><p className="text-slate-400">West Bengal Disaster</p><p className="text-cyan-400 font-bold">1070</p></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Landslides */}
          <div className={`group relative rounded-2xl overflow-hidden transition-all ${expandedSections.landslides ? 'ring-2 ring-amber-500/50' : ''
            }`}>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-xl border border-slate-700/50 p-8">
              <button
                onClick={() => toggleSection('landslides')}
                className="w-full text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center">
                      <MapPin className="w-7 h-7 text-amber-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Landslides</h2>
                  </div>
                  <div className="text-slate-400 hover:text-amber-400 transition-colors">
                    {expandedSections.landslides ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </div>
                </div>
              </button>

              {!expandedSections.landslides && (
                <p className="text-slate-400 mt-4">Ground cracks, water seeping from hills, tilting trees, unusual debris sounds</p>
              )}

              {expandedSections.landslides && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-amber-300 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Warning Signs
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-amber-400 flex-shrink-0">•</span><span>Cracks in ground or slopes</span></li>
                      <li className="flex gap-2"><span className="text-amber-400 flex-shrink-0">•</span><span>Water seeping from hillsides</span></li>
                      <li className="flex gap-2"><span className="text-amber-400 flex-shrink-0">•</span><span>Tilting trees, poles, walls</span></li>
                      <li className="flex gap-2"><span className="text-amber-400 flex-shrink-0">•</span><span>Sounds from moving debris</span></li>
                    </ul>
                  </div>

                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-amber-300 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Safety Measures
                    </h3>
                    <ul className="space-y-3 text-slate-300 text-sm">
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Evacuate immediately</span></li>
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Move away from landslide path</span></li>
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Alert neighbors if possible</span></li>
                      <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Watch for flooding</span></li>
                    </ul>
                  </div>

                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-amber-300 mb-4">Prone Areas</h3>
                    <p className="text-slate-300 text-sm">Himalayan states (Uttarakhand, Himachal Pradesh, J&K), Northeast states, Western Ghats (Kerala, Karnataka, Tamil Nadu)</p>
                  </div>

                  <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-amber-300 mb-4">Emergency Contacts</h3>
                    <div className="space-y-2 text-sm">
                      <div><p className="text-slate-400">Geological Survey of India</p><p className="text-amber-400 font-bold">0135-2740008</p></div>
                      <div><p className="text-slate-400">Himachal Disaster Management</p><p className="text-amber-400 font-bold">1077</p></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Emergency Preparedness Kit */}
        <div className="relative rounded-2xl overflow-hidden p-8 mb-12 border border-slate-700/50">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-green-600/5 to-slate-900/0"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-8">
              <Shield className="w-8 h-8 text-emerald-400" />
              Emergency Preparedness Kit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                <h3 className="text-lg font-bold text-emerald-300 mb-4">Essential Supplies</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Drinking water (3-day supply)</span></li>
                  <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Non-perishable food items</span></li>
                  <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>First aid kit with medicines</span></li>
                  <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Flashlight with batteries</span></li>
                  <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Battery-powered radio</span></li>
                  <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Whistle for signaling</span></li>
                </ul>
              </div>

              <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                <h3 className="text-lg font-bold text-emerald-300 mb-4">Important Documents</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>ID documents (Aadhaar, PAN)</span></li>
                  <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Insurance policies</span></li>
                  <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Bank account information</span></li>
                  <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Cash or travelers checks</span></li>
                  <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Emergency contact list</span></li>
                  <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Medical prescriptions</span></li>
                </ul>
              </div>

              <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                <h3 className="text-lg font-bold text-emerald-300 mb-4">Special Needs</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Prescription medicines</span></li>
                  <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Infant formula, diapers</span></li>
                  <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Pet food and water</span></li>
                  <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Glasses, contact lenses</span></li>
                  <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Activities for children</span></li>
                  <li className="flex gap-2"><span className="text-emerald-400 flex-shrink-0">✓</span><span>Assistive devices</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Disaster Management Apps */}
        <div className="relative rounded-2xl overflow-hidden p-8 mb-12 border border-slate-700/50">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-slate-900/0"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-8">
              <Sparkles className="w-8 h-8 text-purple-400" />
              Disaster Management Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'NDMA App', desc: 'Official National Disaster Management Authority app with early warnings' },
                { name: 'Meghdoot', desc: 'Weather forecasting by IMD providing weather warnings' },
                { name: 'Damini', desc: 'Lightning alert app with real-time thunderstorm warnings' },
                { name: 'SACHET', desc: 'Early Warning System for cyclones and tsunami alerts' },
                { name: 'IFLOWS', desc: 'Integrated Flood Warning System for urban flood alerts' },
                { name: 'Official Websites', desc: 'NDMA: ndma.gov.in | IMD: mausam.imd.gov.in' }
              ].map((app, idx) => (
                <div key={idx} className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10">
                  <h3 className="font-bold text-purple-300 mb-2 text-lg">{app.name}</h3>
                  <p className="text-slate-300 text-sm">{app.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Training & Resources */}
        <div className="relative rounded-2xl overflow-hidden p-8 border border-slate-700/50">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-600/5 to-slate-900/0"></div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-8">
              <Book className="w-8 h-8 text-cyan-400" />
              Training & Preparation Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                <h3 className="text-lg font-bold text-cyan-300 mb-3">First Aid Training</h3>
                <p className="text-slate-300 text-sm mb-2">Indian Red Cross Society: www.indianredcross.org</p>
                <p className="text-slate-300 text-sm">St. John Ambulance India: stjohnambulanceindia.org</p>
              </div>

              <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                <h3 className="text-lg font-bold text-cyan-300 mb-3">Community Preparedness</h3>
                <p className="text-slate-300 text-sm mb-2">Aapda Mitra Scheme - Volunteer training for disaster response</p>
                <p className="text-slate-300 text-sm">Contact local District Disaster Management Authority</p>
              </div>

              <div className="rounded-xl p-6 bg-slate-800/50 border border-slate-700/50">
                <h3 className="text-lg font-bold text-cyan-300 mb-3">Online Resources</h3>
                <p className="text-slate-300 text-sm mb-2">NDMA Training: ndma.gov.in/training</p>
                <p className="text-slate-300 text-sm">NIDM E-Learning: nidm.gov.in/online_course.asp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}