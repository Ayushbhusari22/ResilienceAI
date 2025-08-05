import React, { useEffect, useState } from 'react';
import { Activity, ExternalLink } from 'lucide-react';
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

const EarthquakeDashboard: React.FC<{ coordinates: Coordinates }> = ({ coordinates }) => {
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
      } catch (err) {
        console.error('Error fetching earthquake data:', err);
        setError('Failed to load earthquake data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEarthquakeData();
  }, [coordinates]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading earthquake data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center text-red-500 py-4">
          <Activity className="w-8 h-8 mx-auto mb-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!earthquakeData) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Activity className="w-6 h-6 text-red-500" />
        Nearby Earthquake Activity (100km radius)
        <a
          href="https://earthquake.usgs.gov/earthquakes/map/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm ml-auto text-blue-500 hover:underline flex items-center"
        >
          View on USGS <ExternalLink className="w-4 h-4 ml-1" />
        </a>
      </h2>

      {earthquakeData.recent_earthquakes.length > 0 ? (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <DisasterMetricCard
              title="Earthquake Risk"
              icon={Activity}
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

          <div className="h-64 mb-6">
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  content={({ payload }) => {
                    if (payload && payload[0]) {
                      const quake = earthquakeData.recent_earthquakes
                        .find(q => q.magnitude === payload[0].payload.magnitude);
                      return (
                        <div className="bg-white p-2 border rounded shadow">
                          <p><strong>Magnitude:</strong> {payload[0].payload.magnitude.toFixed(1)}</p>
                          <p><strong>Depth:</strong> {payload[0].payload.depth.toFixed(1)} km</p>
                          <p><strong>Distance:</strong> {payload[0].payload.distance.toFixed(1)} km</p>
                          {quake && <p><strong>Time:</strong> {format(new Date(quake.timestamp), 'MMM dd, HH:mm')}</p>}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar
                  dataKey="magnitude"
                  name="Magnitude"
                  fill="#E63946"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="depth"
                  name="Depth (km)"
                  fill="#457B9D"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Most Significant Recent Earthquakes</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {earthquakeData.recent_earthquakes
                .sort((a, b) => b.significance - a.significance)
                .slice(0, 5)
                .map((quake, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <a
                          href={quake.usgsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:underline"
                        >
                          Magnitude {quake.magnitude.toFixed(1)} • {quake.distance_km.toFixed(1)} km away
                        </a>
                        <p className="text-sm text-gray-600">
                          {format(new Date(quake.timestamp), 'MMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${quake.magnitude >= 5 ? 'bg-red-100 text-red-800' :
                          quake.magnitude >= 3 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                        }`}>
                        {quake.magnitude >= 5 ? 'Strong' :
                          quake.magnitude >= 3 ? 'Moderate' : 'Light'}
                      </span>
                    </div>
                    <p className="text-sm mt-1 text-gray-500">
                      Depth: {quake.depth.toFixed(1)} km • {quake.location}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-500 text-center py-4">
          No earthquake activity detected nearby in the last 30 days (M2.5+)
        </p>
      )}
    </div>
  );
};

export default EarthquakeDashboard;