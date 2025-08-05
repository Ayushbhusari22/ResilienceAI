import axios from 'axios';
import type { FloodPredictionRequest, FloodPrediction, ApiError } from '../models/types';
// const FLOOD_API_BASE_URL = 'https://integrat.onrender.com';
// const FLOOD_API_BASE_URL = 'https://integrate-3jvd.onrender.com';
const FLOOD_API_BASE_URL = 'http://localhost:5000';


export const predictFlood = async (request: FloodPredictionRequest): Promise<FloodPrediction> => {
    try {
        const response = await axios.post<FloodPrediction>(
            `${FLOOD_API_BASE_URL}/flood`,
            {
                city: request.city,
                date: request.date,
                soilMoisture: request.soilMoisture,
                riverLevel: request.riverLevel,
                reservoirLevel: request.reservoirLevel,
                previousFloods: request.previousFloods
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Flood API Error:', error);
        if (axios.isAxiosError(error)) {
            const apiError = error.response?.data as ApiError;
            throw new Error(apiError?.error || 'Failed to get flood prediction');
        }
        throw new Error(error instanceof Error ? error.message : 'Network request failed');
    }
};

// Optional: City suggestions if needed
interface CitySuggestion {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
}

export const getCitySuggestions = async (query: string): Promise<CitySuggestion[]> => {
    try {
        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=ad7eb287720940e2897103b45aecdf85`
        );
        const data = await response.json();
        return data.results?.map((result: any) => ({
            id: result.annotations.geohash,
            name: result.formatted,
            latitude: result.geometry.lat,
            longitude: result.geometry.lng,
            country: result.components.country
        })) || [];
    } catch (error) {
        console.error('Geocoding API Error:', error);
        return [];
    }
};