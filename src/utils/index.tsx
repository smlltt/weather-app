import {
  WiThunderstorm,
  WiRain,
  WiSnow,
  WiDaySunny,
  WiCloudy,
  WiFog,
  WiShowers,
  WiNightClear,
  WiNightThunderstorm,
  WiNightCloudy,
  WiNightShowers,
  WiNightFog,
  WiNightSnow,
  WiNightRain,
  WiAlien,
  WiTornado,
  WiNightCloudyGusts,
  WiCloudyGusts,
} from "react-icons/wi";
import { WeatherCondition } from "../queries/types.ts";

export const getWeatherIcon = (
  weatherCondition: WeatherCondition,
  hasTheSunSet: boolean,
) => {
  switch (weatherCondition) {
    case WeatherCondition.Thunderstorm:
      return hasTheSunSet ? <WiNightThunderstorm /> : <WiThunderstorm />;
    case WeatherCondition.Drizzle:
      return hasTheSunSet ? <WiNightShowers /> : <WiShowers />;
    case WeatherCondition.Rain:
      return hasTheSunSet ? <WiNightRain /> : <WiRain />;
    case WeatherCondition.Snow:
      return hasTheSunSet ? <WiNightSnow /> : <WiSnow />;
    case WeatherCondition.Clear:
      return hasTheSunSet ? <WiNightClear /> : <WiDaySunny />;
    case WeatherCondition.Clouds:
      return hasTheSunSet ? <WiNightCloudy /> : <WiCloudy />;
    case WeatherCondition.Mist:
      return hasTheSunSet ? <WiNightFog /> : <WiFog />;
    case WeatherCondition.Smoke:
      return hasTheSunSet ? <WiNightFog /> : <WiFog />;
    case WeatherCondition.Haze:
      return hasTheSunSet ? <WiNightFog /> : <WiFog />;
    case WeatherCondition.Dust:
      return hasTheSunSet ? <WiNightFog /> : <WiFog />;
    case WeatherCondition.Fog:
      return hasTheSunSet ? <WiNightFog /> : <WiFog />;
    case WeatherCondition.Sand:
      return hasTheSunSet ? <WiNightFog /> : <WiFog />;
    case WeatherCondition.Ash:
      return hasTheSunSet ? <WiNightFog /> : <WiFog />;
    case WeatherCondition.Squall:
      return hasTheSunSet ? <WiNightCloudyGusts /> : <WiCloudyGusts />;
    case WeatherCondition.Tornado:
      return <WiTornado />;
    default:
      return <WiAlien />;
  }
};

export const hasTheSunSet = (input: string): boolean => input.includes("n");

export const formatTemperature = (temperature: number) =>
  `${Math.round(temperature)} °C`;

type RadarMapper = (value: number) => number;
const createRadarMapper = (minInput: number, maxInput: number): RadarMapper => {
  return (value: number): number => {
    const minRadar = 1;
    const maxRadar = 10;
    if (value <= minInput) {
      return minRadar;
    }
    if (value >= maxInput) {
      return maxRadar;
    }

    return (
      ((value - minInput) / (maxInput - minInput)) * (maxRadar - minRadar) +
      minRadar
    );
  };
};

export const mapTemperatureToRadar = createRadarMapper(-10, 40);
export const mapHumidityToRadar = createRadarMapper(10, 90);
export const mapWindSpeedToRadar = createRadarMapper(0, 30);

export const getDataSetColor = (opacity): string =>
  `rgba(54, 162, 235, ${opacity})`;
