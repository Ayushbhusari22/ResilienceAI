import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import './HeatwaveResult.css';

// Fix leaflet marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Define custom CSS for pulse animations
// const pulseCSS = `
//   @keyframes pulse {
//     0% {
//       transform: scale(0.95);
//       box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
//       opacity: 0.7;
//     }

//     70% {
//       transform: scale(1);
//       box-shadow: 0 0 0 10px rgba(255, 82, 82, 0);
//       opacity: 0.9;
//     }

//     100% {
//       transform: scale(0.95);
//       box-shadow: 0 0 0 0 rgba(255, 82, 82, 0);
//       opacity: 0.7;
//     }
//   }

//   .marker-pulse {
//     animation: pulse 2s infinite;
//   }

//   .severe-pulse {
//     animation: pulse 1.5s infinite;
//   }

//   .leaflet-heatwave-marker {
//     border-radius: 50%;
//     width: 16px;
//     height: 16px;
//     background: rgba(255, 0, 0, 0.6);
//     position: relative;
//   }

//   .leaflet-heatwave-marker::after {
//     content: '';
//     position: absolute;
//     top: -5px;
//     left: -5px;
//     right: -5px;
//     bottom: -5px;
//     border-radius: 50%;
//     border: 2px solid rgba(255, 0, 0, 0.5);
//     animation: pulse 2s infinite;
//   }
// `;

interface AnimatedCircleMarkerOptions extends L.CircleMarkerOptions {
    animate?: boolean;
    animationDuration?: number;
    animationInterval?: number;
}

// Type definitions
interface CityData {
    name: string;
    lat: number;
    lng: number;
    stateCode?: string;
}

interface ForecastDay {
    date: string;
    temperature: number;
    apparentTemp: number;
    humidity: number;
    windSpeed: number;
    heatwaveProbability: number;
    alertLevel: string;
    isHeatwave: boolean;
}

interface CurrentWeather {
    temperature: number;
    apparent_temperature: number;
    humidity: number;
    wind_speed: number;
    cloud_cover: number;
}

// Custom animated marker class
class AnimatedCircleMarker extends L.CircleMarker {
    private _radius: number;
    private _originalOpacity: number;
    private _animationInterval: number | null = null;

    constructor(latlng: L.LatLngExpression, options?: AnimatedCircleMarkerOptions) {
        const baseOptions: L.CircleMarkerOptions = {
            radius: options?.radius || 10,
            fillOpacity: options?.fillOpacity || 0.7,
            ...options
        };

        super(latlng, baseOptions);
        this._radius = baseOptions.radius || 10;
        this._originalOpacity = baseOptions.fillOpacity || 0.7;
    }

    onAdd(map: L.Map): this {
        super.onAdd(map);
        const options = this.options as AnimatedCircleMarkerOptions;
        if (options.animate) {
            this._startAnimation(options);
        }
        return this;
    }

    onRemove(map: L.Map): this {
        this._stopAnimation();
        super.onRemove(map);
        return this;
    }

    private _startAnimation(options: AnimatedCircleMarkerOptions): void {
        const duration = options.animationDuration || 2000;
        const interval = options.animationInterval || 3000;

        this._animationInterval = window.setInterval(() => {
            const startTime = Date.now();
            const animate = () => {
                const elapsed = Date.now() - startTime;
                if (elapsed < duration) {
                    const progress = elapsed / duration;
                    const easeOutQuad = 1 - Math.pow(1 - progress, 2);
                    const scale = 1 + easeOutQuad * 0.5;
                    const opacity = this._originalOpacity * (1 - easeOutQuad * 0.7);

                    this.setRadius(this._radius * scale);
                    this.setStyle({ fillOpacity: opacity });

                    requestAnimationFrame(animate);
                } else {
                    this.setRadius(this._radius);
                    this.setStyle({ fillOpacity: this._originalOpacity });
                }
            };
            requestAnimationFrame(animate);
        }, interval);
    }

    private _stopAnimation(): void {
        if (this._animationInterval !== null) {
            clearInterval(this._animationInterval);
            this._animationInterval = null;
        }
    }
}

// Fix leaflet default icon
const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const HeatwaveMap: React.FC<{
    cityData: CityData;
    forecastData: ForecastDay[];
    currentWeather: CurrentWeather;
}> = ({ cityData, forecastData, currentWeather }) => {
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const [mapError, setMapError] = useState<string | null>(null);
    const markersLayerRef = useRef<L.LayerGroup>(L.layerGroup());

    // Inject styles for pulse animation
    // useEffect(() => {
    //     const styleElement = document.createElement('style');
    //     styleElement.innerHTML = pulseCSS;
    //     document.head.appendChild(styleElement);

    //     return () => {
    //         document.head.removeChild(styleElement);
    //     };
    // }, []);

    // Initialize map
    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current !== null) return;

        try {
            // Initialize map
            const map = L.map(mapContainerRef.current, {
                renderer: L.canvas(),
                preferCanvas: true
            }).setView([cityData.lat, cityData.lng], 6);

            // Add satellite tile layer (only layer)
            L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
                maxZoom: 20,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                // attribution: '&copy; Google Maps'
            }).addTo(map);

            // const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

            // L.tileLayer(`https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${MAPTILER_API_KEY}`, {
            //     attribution: '&copy; MapTiler & OpenStreetMap contributors',
            //     tileSize: 512,
            //     zoomOffset: -1,
            //     maxZoom: 20
            // }).addTo(map);

            // Add layer group for markers
            const markersLayer = L.layerGroup().addTo(map);
            markersLayerRef.current = markersLayer;

            // Store map reference
            mapRef.current = map;

            // Add scale control
            L.control.scale({ position: 'bottomleft', imperial: false }).addTo(map);

        } catch (error) {
            console.error('Map initialization error:', error);
            setMapError('Failed to load map. Please try refreshing.');
        }

        return () => {
            mapRef.current?.remove();
            mapRef.current = null;
        };
    }, [cityData]);

    // Add markers
    useEffect(() => {
        if (!mapRef.current) return;

        markersLayerRef.current.clearLayers();

        // Add city marker
        L.circleMarker([cityData.lat, cityData.lng], {
            radius: 15,
            fillColor: getColor(currentWeather.temperature),
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        }).bindPopup(`
      <div style="min-width: 200px">
        <h3 style="margin: 0 0 5px 0; font-weight: bold">${cityData.name}</h3>
        <p>Current: ${currentWeather.temperature}°C</p>
        <p>Feels like: ${currentWeather.apparent_temperature}°C</p>
      </div>
    `).addTo(markersLayerRef.current);

        // Add forecast markers
        forecastData.forEach((day, index) => {
            const angle = (index / forecastData.length) * Math.PI * 2;
            const distance = 0.1 + (index * 0.02);
            const lat = cityData.lat + Math.sin(angle) * distance;
            const lng = cityData.lng + Math.cos(angle) * distance;

            new AnimatedCircleMarker([lat, lng], {
                radius: 10 + (day.heatwaveProbability / 10),
                fillColor: getColor(day.temperature),
                color: '#fff',
                weight: 1,
                fillOpacity: 0.7,
                animate: day.heatwaveProbability > 50
            }).bindPopup(`
        <div style="min-width: 150px">
          <h4>${day.date}</h4>
          <p>Max: ${day.temperature}°C</p>
          <p>Risk: ${day.heatwaveProbability}%</p>
        </div>
      `).addTo(markersLayerRef.current);
        });
    }, [cityData, currentWeather, forecastData]);

    // Color function
    const getColor = (temp: number): string => {
        return temp > 40 ? '#800026' :
            temp > 38 ? '#BD0026' :
                temp > 36 ? '#E31A1C' :
                    temp > 34 ? '#FC4E2A' :
                        temp > 32 ? '#FD8D3C' :
                            temp > 30 ? '#FEB24C' :
                                temp > 28 ? '#FED976' :
                                    '#FFEDA0';
    };

    if (mapError) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                {mapError}
                <button
                    onClick={() => setMapError(null)}
                    className="mt-2 px-3 py-1 bg-red-100 rounded hover:bg-red-200"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
            <div className="p-3 bg-gray-50 border-b">
                <h3 className="font-medium text-gray-800">Heatwave Map: {cityData.name}</h3>
            </div>
            <div
                ref={mapContainerRef}
                className="w-full h-[500px] z-0"
                style={{ minHeight: '500px' }}
            />
            <div className="p-3 bg-gray-50 border-t flex flex-wrap gap-2">
                {[['#FFEDA0', '< 28°C'], ['#FED976', '28-30°C'], ['#FEB24C', '30-32°C'],
                ['#FD8D3C', '32-34°C'], ['#FC4E2A', '34-36°C'], ['#E31A1C', '36-38°C'],
                ['#BD0026', '38-40°C'], ['#800026', '>40°C']].map(([color, label]) => (
                    <div key={label} className="flex items-center text-sm">
                        <span className="w-4 h-4 inline-block mr-1 rounded-sm" style={{ backgroundColor: color }}></span>
                        <span>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HeatwaveMap;