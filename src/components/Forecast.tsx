import styles from '../styles/Forecast.module.css';
import { ForecastData } from '../hooks/weather';

interface ForecastProps {
  data: ForecastData | null;
}

export default function Forecast({ data }: ForecastProps) {
  if (!data) return null;

  console.log('Forecast data received:', data);

  const now = new Date();
  const currentDate = now.toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
  });

  const futureForecasts = data.list.filter((forecast) => {
    const forecastDate = new Date(forecast.dt * 1000);
    return forecastDate >= now;
  });

  console.log('Future forecasts:', futureForecasts);

  const forecastsByDay = futureForecasts.reduce(
    (acc, forecast) => {
      const date = new Date(forecast.dt * 1000);
      const dayKey = date.toLocaleDateString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
      });

      if (dayKey === currentDate) return acc;

      if (!acc[dayKey]) {
        acc[dayKey] = [];
      }

      acc[dayKey].push(forecast);
      return acc;
    },
    {} as Record<string, typeof data.list>,
  );

  console.log('Forecasts by day:', forecastsByDay);

  const dailyForecast = Object.entries(forecastsByDay)
    .map(([day, forecasts]) => {
      const noonForecast = forecasts.find((forecast) => {
        const hour = new Date(forecast.dt * 1000).getHours();
        return hour >= 11 && hour <= 13;
      });

      return noonForecast || forecasts[0];
    })
    .slice(0, 5);

  console.log('Daily forecast to display:', dailyForecast);

  if (dailyForecast.length === 0) {
    return (
      <div className={styles.forecastContainer}>
        <h3 className={styles.nextDays}>Próximos Dias</h3>
        <p>Nenhuma previsão disponível para os próximos dias.</p>
      </div>
    );
  }

  return (
    <div className={styles.forecastContainer}>
      <h3 className={styles.nextDays}>Próximos Dias</h3>
      <div className={styles.daysGrid}>
        {dailyForecast.map((day) => {
          const date = new Date(day.dt * 1000);
          const weekday = date.toLocaleDateString('pt-BR', {
            weekday: 'short',
            timeZone: 'America/Sao_Paulo',
          });

          const dayMonth = date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            timeZone: 'America/Sao_Paulo',
          });

          return (
            <div key={day.dt} className={styles.dayCard}>
              <p className={styles.weekday}>{weekday}</p>
              <p className={styles.dayMonth}>{dayMonth}</p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
                className={styles.weatherIcon}
              />
              <p className={styles.temperature}>
                {Math.round(day.main.temp)}°C
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
