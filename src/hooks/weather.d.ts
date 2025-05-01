export interface WeatherData {
  name: string
  main: {
    temp: number
    feels_like: number
    humidity: number
  }
  weather: {
    description: string
    icon: string
    main: string
  }[]
  wind: {
    speed: number
  }
}

export interface ForecastData {
  list: {
    dt: number
    main: {
      temp: number
    }
    weather: {
      icon: string
      description: string
    }[]
  }[]
}
