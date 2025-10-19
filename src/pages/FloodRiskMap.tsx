import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FloodRiskMapProps } from '../models/types';
// import './new.css';

// Custom marker icon fix (important for correct positioning)
// This addresses the issue with default markers not loading properly
const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom CSS to fix zoom control styling
const customMapStyles = `
  .leaflet-control-zoom {
    border: none !important;
  }
  
  .leaflet-control-zoom a {
    width: 30px !important;
    height: 30px !important;
    line-height: 30px !important;
    border-radius: 4px !important;
    background-color: white !important;
    border: 1px solid #ccc !important;
    text-align: center !important;
    font-size: 18px !important;
    font-weight: bold !important;
    margin-bottom: 5px !important;
    box-shadow: 0 1px 5px rgba(0,0,0,0.15) !important;
  }
  
  .leaflet-control-zoom a:hover {
    background-color: #f4f4f4 !important;
  }
`;

const FloodRiskMap = ({ data, city }: FloodRiskMapProps) => {
    const mapRef = useRef<L.Map>(null);
    const markerRef = useRef<any>(null);

    // Function to determine circle color based on flood probability
    // const getCircleColor = (probability: number) => {
    //     if (probability > 70) return '#ff0000'; // Red
    //     if (probability > 40) return '#ff9900'; // Orange
    //     return '#ffcc00'; // Yellow
    // };

    // Add custom styles to document head
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = customMapStyles;
        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    // Open popup automatically when map is ready
    useEffect(() => {
        if (markerRef.current) {
            // Use setTimeout to ensure the map is fully initialized
            setTimeout(() => {
                markerRef.current.openPopup();
            }, 500);
        }
    }, [markerRef]);

    return (
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                Flood Risk Map
            </h2>
            <div className="h-96 rounded-lg overflow-hidden border border-gray-300">
                <MapContainer
                    center={[data.latitude, data.longitude]}
                    zoom={12}
                    style={{ height: '100%' }}
                    ref={mapRef}
                    zoomControl={false} // Remove default zoom control
                    whenReady={() => {
                        // This ensures the map is fully loaded before trying to open the popup
                        setTimeout(() => {
                            if (markerRef.current) {
                                markerRef.current.openPopup();
                            }
                        }, 500);
                    }}
                >
                    <ZoomControl position="topleft" /> {/* Add custom positioned zoom control */}
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {/* Render circle first to ensure it's beneath the marker */}
                    {/* <Circle
                        center={[data.latitude, data.longitude]}
                        radius={2000}
                        color={getCircleColor(data.flood_probability)}
                        fillColor={getCircleColor(data.flood_probability)}
                        fillOpacity={0.2}
                        weight={2}
                    /> */}

                    {/* Render marker after circle to ensure it's on top */}
                    <Marker
                        position={[data.latitude, data.longitude]}
                        ref={(ref) => {
                            if (ref) {
                                markerRef.current = ref;
                                // Open popup immediately when marker is ready
                                setTimeout(() => {
                                    ref.openPopup();
                                }, 500);
                            }
                        }}
                    >
                        <Popup className='mapok'>
                            <div className="map-popup ">
                                <h4 className="font-bold">{city}</h4>
                                <div className="popup-details">
                                    <p><strong>Flood Risk:</strong> {data.flood_prediction ? "High" : "Low"}</p>
                                    <p><strong>Probability:</strong> {data.flood_probability}%</p>
                                    <p><strong>24h Rainfall:</strong> {data.rainfall_24h} mm</p>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    );
};

export default FloodRiskMap;