import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { envConfig } from "../envConfig.ts";
import { PlaceId, WeatherData } from "./types.ts";
import { geocodeByPlaceId, getLatLng } from "react-google-places-autocomplete";
const fetchWeatherData = async (placeId): Promise<undefined | WeatherData> => {
  if (!placeId) {
    return undefined;
  }
  const results = await geocodeByPlaceId(placeId);
  const { lat, lng } = await getLatLng(results[0]);
  const { data } = await axios.get(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&exclude=minutely,daily,hourly,alerts&appid=${envConfig.openWeatherApiKey}`,
  );

  return data as WeatherData;
};

export const useWeatherData = ({ placeId }: { placeId?: PlaceId }) => {
  return useQuery({
    queryKey: ["weatherData", placeId],
    queryFn: () => fetchWeatherData(placeId),
    staleTime: 1000 * 60 * 10,
    enabled: !!placeId,
  });
};
