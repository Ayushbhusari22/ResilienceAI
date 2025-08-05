import type { 
    CitySuggestion, HeatwaveResponse, WeatherPrediction, CurrentWeather
  } from './types';
  
// const API_BASE_URL = 'https://integrate-3jvd.onrender.com';
// const API_BASE_URL = 'https://integrat.onrender.com';
const API_BASE_URL = 'http://127.0.0.1:5000';
  
  export const getCitySuggestions = async (query: string): Promise<CitySuggestion[]> => {
      const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
      );
      const data = await response.json();
      return data.results || [];
  };
  
  export const checkHeatwave = async (city: string): Promise<{
      city: string;
      heatwave_alert: boolean;
      message: string;
      forecast: WeatherPrediction[];
      current_weather: CurrentWeather;
  }> => {
      try {
          const response = await fetch(`${API_BASE_URL}/heatwave`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ city })
          });
  
          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Failed to get prediction');
          }
  
          const data: HeatwaveResponse = await response.json();
  
          // Process predictions to ensure valid dates
          const processedPredictions = data.predictions?.map(prediction => ({
              ...prediction,
              date: prediction.date ? prediction.date : formatDate(new Date()) // Fallback to current date if missing
          })) || [];
  
          return {
              city: data.city,
              heatwave_alert: processedPredictions.some(p => p.is_heatwave === 1),
              message: data.message,
              forecast: processedPredictions,
              current_weather: {
                  temperature: processedPredictions[0]?.temperature_2m_max || 0,
                  apparent_temperature: processedPredictions[0]?.apparent_temperature_max || 0,
                  humidity: processedPredictions[0]?.relative_humidity_2m_mean || 0,
                  wind_speed: processedPredictions[0]?.wind_speed_10m_max || 0,
                  cloud_cover: processedPredictions[0]?.cloud_cover_mean || 0,
                  precipitation: processedPredictions[0]?.precipitation_sum || 0
              }
          };
      } catch (error) {
          console.error('API Error:', error);
          throw new Error(error instanceof Error ? error.message : 'Network request failed');
      }
  };
  
  export async function fetchHistoricalData(city: string) {
      try {
          const response = await fetch(`${API_BASE_URL}/api/historical?city=${encodeURIComponent(city)}`);
          
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          
          // Process historical data to ensure valid dates
          if (data.historical_data) {
              data.historical_data = data.historical_data.map((item: any) => ({
                  ...item,
                  date: item.date ? item.date : formatDate(new Date()) // Fallback to current date if missing
              }));
          }
          
          return data;
      } catch (error) {
          console.error('Error fetching historical data:', error);
          throw error;
      }
  }
  
  // Helper function to format date as YYYY-MM-DD
  export function formatDate(date: Date): string {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  }
  
  // Helper function to format date for display
  export function formatDisplayDate(dateStr: string): string {
      try {
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) {
              return 'Invalid date';
          }
          return date.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
          });
      } catch (error) {
          console.error('Error formatting date:', error);
          return 'Invalid date';
      }
  }