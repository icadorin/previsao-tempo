export const weatherTranslations: Record<string, string> = {
  // Group 2xx: Thunderstorm
  'thunderstorm with light rain': 'trovoada com chuva leve',
  'thunderstorm with rain': 'trovoada com chuva',
  'thunderstorm with heavy rain': 'trovoada com chuva forte',
  'light thunderstorm': 'trovoada leve',
  'thunderstorm': 'trovoada',
  'heavy thunderstorm': 'trovoada intensa',
  'ragged thunderstorm': 'trovoada irregular',
  'thunderstorm with light drizzle': 'trovoada com garoa leve',
  'thunderstorm with drizzle': 'trovoada com garoa',
  'thunderstorm with heavy drizzle': 'trovoada com garoa intensa',

  // Group 3xx: Drizzle
  'light intensity drizzle': 'garoa leve',
  'drizzle': 'garoa',
  'heavy intensity drizzle': 'garoa intensa',
  'light intensity drizzle rain': 'chuva com garoa leve',
  'drizzle rain': 'chuva com garoa',
  'heavy intensity drizzle rain': 'chuva com garoa intensa',
  'shower rain and drizzle': 'chuva e garoa',
  'heavy shower rain and drizzle': 'chuva forte e garoa',
  'shower drizzle': 'garoa passageira',

  // Group 5xx: Rain
  'light rain': 'chuva leve',
  'moderate rain': 'chuva moderada',
  'heavy intensity rain': 'chuva forte',
  'very heavy rain': 'chuva muito forte',
  'extreme rain': 'chuva extrema',
  'freezing rain': 'chuva congelante',
  'light intensity shower rain': 'chuva passageira leve',
  'shower rain': 'chuva passageira',
  'heavy intensity shower rain': 'chuva passageira forte',
  'ragged shower rain': 'chuva passageira irregular',

  // Group 6xx: Snow
  'light snow': 'neve leve',
  'snow': 'neve',
  'heavy snow': 'neve intensa',
  'sleet': 'chuva com neve',
  'light shower sleet': 'chuva com neve leve',
  'shower sleet': 'chuva com neve',
  'light rain and snow': 'chuva e neve leves',
  'rain and snow': 'chuva e neve',
  'light shower snow': 'neve passageira leve',
  'shower snow': 'neve passageira',
  'heavy shower snow': 'neve passageira intensa',

  // Group 7xx: Atmosphere
  'mist': 'névoa',
  'smoke': 'fumaça',
  'haze': 'neblina',
  'sand/dust whirls': 'redemoinhos de areia/poeira',
  'fog': 'névoa densa',
  'sand': 'areia',
  'dust': 'poeira',
  'volcanic ash': 'cinza vulcânica',
  'squalls': 'rajadas de vento',
  'tornado': 'tornado',

  // Group 800: Clear
  'clear sky': 'céu limpo',

  // Group 80x: Clouds
  'few clouds': 'poucas nuvens',
  'scattered clouds': 'nuvens dispersas',
  'broken clouds': 'nuvens fragmentadas',
  'overcast clouds': 'nublado'
};

export const translateWeatherDescription = (description: string): string => {
  const lowerCaseDesc = description.toLowerCase();
  return weatherTranslations[lowerCaseDesc] || description;
};
