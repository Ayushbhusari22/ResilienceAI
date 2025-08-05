/**
 * Types for Heatwave Prediction API
 */
export interface HeatwaveResultData {
  city: string;
  current_weather: {
    temperature: number;
    apparent_temperature: number;
    humidity: number;
    wind_speed: number;
    cloud_cover: number;
  };
  forecast: Array<{
    date: string;
    temperature_2m_max: number;
    apparent_temperature_max: number;
    relative_humidity_2m_mean: number;
    wind_speed_10m_max: number;
    is_heatwave: number;
    alert_level: string;
    heatwave_probability: number;
  }>;
  historical_data?: Array<{
    year: number;
    heatwave_occurred: boolean;
    max_temp: number;
  }>;
  heatwave_alert: boolean;
  message?: string;
}

// City suggestion from geocoding API
export interface CitySuggestion {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;  // State/region
    country_code?: string;
    timezone?: string;
    population?: number;
}

// Weather prediction data point
export interface WeatherPrediction {
    date: string;
    temperature_2m_max: number;
    apparent_temperature_max: number;
    relative_humidity_2m_mean: number;
    wind_speed_10m_max: number;
    cloud_cover_mean: number;
    precipitation_sum: number;
    is_heatwave: number;  // 0 or 1
    weather_code?: number;
    sunrise?: string;
    sunset?: string;
    alert_level?: string;
}

// Response from /heatwave endpoint
export interface HeatwaveResponse {
    city: string;
    predictions: WeatherPrediction[];
    message: string;
    status: 'success' | 'error';
    warnings?: string[];
}

// Current weather summary
export interface CurrentWeather {
    temperature: number;
    apparent_temperature: number;
    humidity: number;
    wind_speed: number;
    cloud_cover: number;
    precipitation: number;
    weather_icon?: string;
    condition?: string;
}

// Historical weather data point
export interface HistoricalDataItem {
    date: string;
    max_temp: number;
    min_temp: number;
    avg_temp: number;
    precipitation: number;
    humidity: number;
    heatwave_occurred: boolean;
    year: number;
}

// Formatted historical data with display dates
export interface FormattedHistoricalData extends Omit<HistoricalDataItem, 'date'> {
    date: string;           // YYYY-MM-DD
    display_date: string;   // Formatted for UI
}

// Error response structure
export interface ApiError {
    error: string;
    message?: string;
    statusCode?: number;
    details?: Record<string, unknown>;
}

// Combined response for frontend consumption
export interface HeatwaveAlert {
    city: string;
    heatwave_alert: boolean;
    message: string;
    forecast: WeatherPrediction[];
    current_weather: CurrentWeather;
    historical_data?: FormattedHistoricalData[];
}

// flood.ts
export interface FloodPrediction {
    latitude: number;
    longitude: number;
    rainfall_24h: number;
    rainfall_72h: number;
    temperature: number;
    soil_moisture: number;
    river_level: number;
    reservoir_level: number;
    previous_floods: number;
    year: number;
    month: number;
    day: number;
    flood_prediction: 0 | 1;
    flood_probability: number;
}

export interface FloodPredictionRequest {
    city: string;
    date: string;
    soilMoisture: number;
    riverLevel: number;
    reservoirLevel: number;
    previousFloods: number;
    soilType: string; 
}

export interface ApiError {
    error: string;
    message?: string;
    statusCode?: number;
}

export interface PredictionData {
    city: string;
    flood_prediction: boolean;
    flood_probability: number;
    rainfall_24h: number;
    rainfall_72h: number;
    temperature: number;
    latitude: number;
    longitude: number;
    soilType: string;
    reservoir_level: number;
    river_level: number;
    previousFloodsSelection: string;
}

export interface FloodData {
    latitude: number;
    longitude: number;
    flood_probability: number;
    flood_prediction: boolean;
    rainfall_24h: number;
    river_level: number;
}

export interface FloodRiskMapProps {
    data: FloodData;
    city: string;
}