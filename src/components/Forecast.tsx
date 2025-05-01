import styles from '../styles/Forecast.module.css';
import { ForecastData } from '../hooks/weather';

interface ForecastProps {
  data: ForecastData | null;
}

export default function Forecast({ data }: ForecastProps) {
  if (!data) return null;

  // console.log(data);

  const forecastsByDay = data.list.reduce<Record<string, typeof data.list[0]>>((acc, forecast) => {
    const date = new Date(forecast.dt * 1000);

    const dayKey = date.toLocaleDateString('pt-BR', {
      timeZone: 'America/Sao_Paulo'
    });

    // console.log(dayKey);

    const hour = date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      timeZone: 'America/Sao_Paulo'
    });

    // console.log(hour);

    if (!acc[dayKey] || hour.includes('12')) {
      acc[dayKey] = forecast;
    }

    console.log("ACC: ", acc);

    return acc;
  }, {});

  const dailyForecast = Object.values(forecastsByDay).slice(0, 5);

  return (
    <div className={styles.forecastContainer}>
      <h3>Próximos Dias</h3>
      <div className={styles.daysGrid}>
        {dailyForecast.map((day) => {
          const date = new Date(day.dt * 1000);
          const weekday = date.toLocaleDateString('pt-BR', {
            weekday: 'short',
            timeZone: 'America/Sao_Paulo'
          });

          return (
            <div key={day.dt} className={styles.dayCard}>
              <p>{weekday}</p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
              />
              <p>{Math.round(day.main.temp)}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
