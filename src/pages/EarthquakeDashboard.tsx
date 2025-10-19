import React, { useEffect, useState } from 'react';
import { Activity, ExternalLink, AlertTriangle, MapPin, Zap } from 'lucide-react';
import { format } from 'date-fns';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface DisasterMetricCardProps {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string | number;
  unit: string;
  status?: 'normal' | 'warning' | 'critical';
}

const DisasterMetricCard: React.FC<DisasterMetricCardProps> = ({
  title,
  icon: Icon,
  value,
  unit,
  status
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

interface EarthquakeFeature {
  properties: {
    mag: number;
    place: string;
    time: number;
    url: string;
    sig: number;
  };
  geometry: {
    coordinates: [number, number, number];
  };
}

interface USGSResponse {
  features: EarthquakeFeature[];
}

interface EarthquakeData {
  recent_earthquakes: Array<{
    lat: number;
    lon: number;
    magnitude: number;
    depth: number;
    distance_km: number;
    timestamp: string;
    location: string;
    usgsUrl: string;
    significance: number;
  }>;
  risk_level: 'low' | 'medium' | 'high';
  timestamp: string;
}

interface Coordinates {
  lat: number;
  lon: number;
}

export interface EarthquakeAlert {
  type: string;
  level: string;
  message: string;
}

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const calculateRiskLevel = (earthquakes: EarthquakeFeature[]): 'low' | 'medium' | 'high' => {
  const significantQuakes = earthquakes.filter(q => q.properties.mag >= 4.5);
  const recentQuakes = earthquakes.filter(q =>
    new Date(q.properties.time) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );

  if (significantQuakes.length > 0 || recentQuakes.length >= 3) return 'high';
  if (recentQuakes.length > 0) return 'medium';
  return 'low';
};

const EarthquakeDashboard: React.FC<{ 
  coordinates: Coordinates;
  onAlertsUpdate?: (alerts: EarthquakeAlert[]) => void;
}> = ({ coordinates, onAlertsUpdate }) => {
  const [earthquakeData, setEarthquakeData] = useState<EarthquakeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEarthquakeData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const radiusDegrees = 0.9;
        const minLat = coordinates.lat - radiusDegrees;
        const maxLat = coordinates.lat + radiusDegrees;
        const minLon = coordinates.lon - radiusDegrees;
        const maxLon = coordinates.lon + radiusDegrees;

        const response = await fetch(
          `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${format(
            new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            'yyyy-MM-dd'
          )}&minmagnitude=2.5&minlatitude=${minLat}&maxlatitude=${maxLat}&minlongitude=${minLon}&maxlongitude=${maxLon}`
        );

        if (!response.ok) throw new Error('Failed to fetch earthquake data');

        const data: USGSResponse = await response.json();

        const processedData: EarthquakeData = {
          recent_earthquakes: data.features.map((feature) => {
            const earthquakeLat = feature.geometry.coordinates[1];
            const earthquakeLon = feature.geometry.coordinates[0];
            const distance = calculateDistance(
              coordinates.lat,
              coordinates.lon,
              earthquakeLat,
              earthquakeLon
            );

            return {
              lat: earthquakeLat,
              lon: earthquakeLon,
              magnitude: feature.properties.mag,
              depth: feature.geometry.coordinates[2],
              distance_km: distance,
              timestamp: new Date(feature.properties.time).toISOString(),
              location: feature.properties.place,
              usgsUrl: feature.properties.url,
              significance: feature.properties.sig
            };
          }),
          risk_level: calculateRiskLevel(data.features),
          timestamp: new Date().toISOString()
        };

        setEarthquakeData(processedData);

        // Generate and send alerts to parent component
        const generatedAlerts: EarthquakeAlert[] = [];
        
        if (processedData.recent_earthquakes.length > 0) {
          // Get the most recent earthquake
          const mostRecent = processedData.recent_earthquakes[0];
          
          if (mostRecent.magnitude >= 5) {
            generatedAlerts.push({
              type: 'earthquake',
              level: 'high',
              message: `Strong earthquake M${mostRecent.magnitude.toFixed(1)} detected ${mostRecent.distance_km.toFixed(1)}km away at ${mostRecent.location}`
            });
          } else if (mostRecent.magnitude >= 4) {
            generatedAlerts.push({
              type: 'earthquake',
              level: 'high',
              message: `Moderate earthquake M${mostRecent.magnitude.toFixed(1)} detected ${mostRecent.distance_km.toFixed(1)}km away`
            });
          } else if (mostRecent.magnitude >= 3.5) {
            generatedAlerts.push({
              type: 'earthquake',
              level: 'medium',
              message: `Light earthquake M${mostRecent.magnitude.toFixed(1)} detected ${mostRecent.distance_km.toFixed(1)}km away`
            });
          }

          // Check for multiple earthquakes indicating aftershocks
          if (processedData.recent_earthquakes.length >= 3) {
            const last24hours = processedData.recent_earthquakes.filter(q =>
              new Date(q.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
            );
            
            if (last24hours.length >= 3) {
              generatedAlerts.push({
                type: 'earthquake',
                level: 'medium',
                message: `Multiple earthquakes detected - possible aftershock sequence with ${last24hours.length} events in last 24 hours`
              });
            }
          }
        }

        // Call parent callback with alerts
        if (onAlertsUpdate) {
          onAlertsUpdate(generatedAlerts);
        }

      } catch (err) {
        console.error('Error fetching earthquake data:', err);
        setError('Failed to load earthquake data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEarthquakeData();
  }, [coordinates, onAlertsUpdate]);

  if (isLoading) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-2 border-slate-700 border-t-purple-500 animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading earthquake data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl">
        <div className="text-center text-red-400 py-4">
          <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!earthquakeData) {
    return null;
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-800 to-slate-900 p-8 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/5"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-red-400" />
            Nearby Earthquake Activity
            <span className="text-xs font-medium text-slate-400 ml-1">(100km radius)</span>
          </h2>
          <a
            href="https://earthquake.usgs.gov/earthquakes/map/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-500/50"
          >
            View on USGS <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {earthquakeData.recent_earthquakes.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <DisasterMetricCard
                title="Earthquake Risk"
                icon={Zap}
                value={earthquakeData.risk_level.toUpperCase()}
                unit=""
                status={earthquakeData.risk_level === 'high' ? 'critical' :
                  earthquakeData.risk_level === 'medium' ? 'warning' : 'normal'}
              />
              <DisasterMetricCard
                title="Recent Quakes"
                icon={Activity}
                value={earthquakeData.recent_earthquakes.length}
                unit="(M2.5+, 30 days)"
              />
            </div>

            {/* Chart */}
            <div className="h-64 rounded-xl overflow-hidden bg-slate-800/30 p-4 border border-slate-700/50 mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={earthquakeData.recent_earthquakes
                    .slice(0, 5)
                    .sort((a, b) => b.magnitude - a.magnitude)
                    .map(quake => ({
                      name: `M${quake.magnitude.toFixed(1)}`,
                      magnitude: quake.magnitude,
                      depth: quake.depth,
                      distance: quake.distance_km
                    }))}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#e2e8f0' }}
                    content={({ payload }) => {
                      if (payload && payload[0]) {
                        const quake = earthquakeData.recent_earthquakes
                          .find(q => q.magnitude === payload[0].payload.magnitude);
                        return (
                          <div className="bg-slate-900 p-3 border border-slate-700 rounded-lg shadow-lg">
                            <p className="text-slate-200"><strong>Magnitude:</strong> {payload[0].payload.magnitude.toFixed(1)}</p>
                            <p className="text-slate-200"><strong>Depth:</strong> {payload[0].payload.depth.toFixed(1)} km</p>
                            <p className="text-slate-200"><strong>Distance:</strong> {payload[0].payload.distance.toFixed(1)} km</p>
                            {quake && <p className="text-slate-200"><strong>Time:</strong> {format(new Date(quake.timestamp), 'MMM dd, HH:mm')}</p>}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="magnitude" name="Magnitude" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="depth" name="Depth (km)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Earthquake List */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Most Significant Recent Earthquakes</h3>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {earthquakeData.recent_earthquakes
                  .sort((a, b) => b.significance - a.significance)
                  .slice(0, 5)
                  .map((quake, index) => (
                    <a
                      key={index}
                      href={quake.usgsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative rounded-xl p-4 bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/50 transition-all overflow-hidden block"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all"></div>
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                                Magnitude {quake.magnitude.toFixed(1)} • {quake.distance_km.toFixed(1)} km away
                              </p>
                              <p className="text-xs text-slate-400 mt-1">
                                {format(new Date(quake.timestamp), 'MMM dd, yyyy HH:mm')}
                              </p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-lg text-xs font-semibold flex-shrink-0 ${quake.magnitude >= 5 ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                              quake.magnitude >= 3 ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                                'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}>
                            {quake.magnitude >= 5 ? 'Strong' :
                              quake.magnitude >= 3 ? 'Moderate' : 'Light'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          <span className="text-slate-300 font-medium">Depth:</span> {quake.depth.toFixed(1)} km • {quake.location}
                        </p>
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Activity className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-400">
              No earthquake activity detected nearby in the last 30 days (M2.5+)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EarthquakeDashboard;