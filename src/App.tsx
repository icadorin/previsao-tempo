import { useState } from 'react'
import useWeather from './hooks/useWeather'
import Header from './components/Header'
import WeatherCard from './components/WeatherCard'
import Forecast from './components/Forecast'
import './styles/global.css'
import styles from './styles/App.module.css'

export default function App() {
  const [location, setLocation] = useState('Joinville')
  const { weatherData, forecastData, loading } = useWeather(location)

  return (
    <div className={styles.appContainer}>
      <Header onSearch={setLocation} />
      <WeatherCard data={weatherData} loading={loading} />
      <Forecast data={forecastData} />
    </div>
  )
}
