import styles from '../styles/WeatherCard.module.css'
import { WeatherData } from '../hooks/weather'
import { FiDroplet, FiWind, FiThermometer } from 'react-icons/fi'
import { translateWeatherDescription } from '../utils/weatherTranslations';

interface WeatherCardProps {
  data: WeatherData | null
  loading: boolean
}

export default function WeatherCard({ data, loading }: WeatherCardProps) {
  if (loading) return <div className={styles.loading}>Carregando...</div>
  if (!data) return null

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.cityName}>{data.name}</h2>
        <p className={styles.weatherDescription}>
          {translateWeatherDescription(data.weather[0].description)}
        </p>
      </div>

      <div className={styles.weatherMain}>
        <div className={styles.temperatureContainer}>
          <span className={styles.temperature}>{Math.round(data.main.temp)}°C</span>
          <div className={styles.weatherIconContainer}>
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              alt={data.weather[0].description}
              className={styles.weatherIcon}
            />
          </div>
        </div>
      </div>

      <div className={styles.detailsContainer}>
        <div className={styles.detailCard}>
          <FiThermometer className={styles.detailIcon} />
          <div>
            <span className={styles.detailLabel}>Sensação</span>
            <span className={styles.detailValue}>{Math.round(data.main.feels_like)}°C</span>
          </div>
        </div>

        <div className={styles.detailCard}>
          <FiWind className={styles.detailIcon} />
          <div>
            <span className={styles.detailLabel}>Vento</span>
            <span className={styles.detailValue}>{data.wind.speed} m/s</span>
          </div>
        </div>

        <div className={styles.detailCard}>
          <FiDroplet className={styles.detailIcon} />
          <div>
            <span className={styles.detailLabel}>Umidade</span>
            <span className={styles.detailValue}>{data.main.humidity}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
