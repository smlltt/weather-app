export interface PlaceId {
  placeId: string;
}

export enum WeatherCondition {
  Thunderstorm = "Thunderstorm",
  Drizzle = "Drizzle",
  Rain = "Rain",
  Snow = "Snow",
  Clear = "Clear",
  Clouds = "Clouds",
  Mist = "Mist",
  Smoke = "Smoke",
  Haze = "Haze",
  Dust = "Dust",
  Fog = "Fog",
  Sand = "Sand",
  Ash = "Ash",
  Squall = "Squall",
  Tornado = "Tornado",
}

interface Weather {
  id: number;
  main: WeatherCondition;
  description: string;
  icon: string;
}

interface CurrentWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
}

export interface WeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
}
