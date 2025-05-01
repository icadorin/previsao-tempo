import styles from '../styles/WeatherCard.module.css'
import { WeatherData } from '../hooks/weather'

interface WeatherCardProps {
  data: WeatherData | null
  loading: boolean
}

export default function WeatherCard({ data, loading }: WeatherCardProps) {
  if (loading) return <div className={styles.loading}>Carregando...</div>
  if (!data) return null

  return (
    <div className={styles.card}>
      <h2>{data.name}</h2>
      <div className={styles.mainInfo}>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
        />
        <span>{Math.round(data.main.temp)}°C</span>
      </div>
      <p className={styles.description}>{data.weather[0].description}</p>
      <div className={styles.details}>
        <div>Sensação: {Math.round(data.main.feels_like)}°C</div>
        <div>Vento: {data.wind.speed} m/s</div>
        <div>Umidade: {data.main.humidity}%</div>
      </div>
    </div>
  )
}
