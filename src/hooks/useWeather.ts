import axios from 'axios'
import { useState, useEffect } from 'react'
import { WeatherData, ForecastData } from '../hooks/weather'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

if (!API_KEY) {
  console.error("Variáveis de ambiente:", import.meta.env);
  throw new Error("Chave de API não configurada.");
}

export default function useWeather(location: string) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const isCoordinateSearch = location.includes(',');

        const weatherUrl = isCoordinateSearch
          ? `https://api.openweathermap.org/data/2.5/weather?lat=${location.split(',')[0]}&lon=${location.split(',')[1]}&units=metric&appid=${API_KEY}`
          : `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

        const forecastUrl = isCoordinateSearch
          ? `https://api.openweathermap.org/data/2.5/forecast?lat=${location.split(',')[0]}&lon=${location.split(',')[1]}&units=metric&appid=${API_KEY}`
          : `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`;

        const [weatherResponse, forecastResponse] = await Promise.all([
          axios.get<WeatherData>(weatherUrl),
          axios.get<ForecastData>(forecastUrl)
        ]);

        setWeatherData(weatherResponse.data);
        setForecastData(forecastResponse.data);
      } catch (err) {
        setError('Localização não encontrada');
        console.error('Erro ao buscar dados:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  return { weatherData, forecastData, loading, error };
}
