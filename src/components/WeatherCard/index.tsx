import { useWeatherData } from "../../queries";
import { useSearchStore } from "../../zustand";
import { formatTemperature, getWeatherIcon, hasTheSunSet } from "../../utils";
import { IconContext } from "react-icons";
import ConditionInfo from "./ConditionInfo.tsx";
import { WiHumidity, WiThermometer, WiWindy } from "react-icons/wi";
import { useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import WeatherSkeleton from "./WeatherSkeleton.tsx";
import WeatherCardLayout from "./WeatherCardLayout.tsx";

const WeatherCard = () => {
  const { placeId, updateRecentSearch, recentSearches, placeName } =
    useSearchStore();
  const { data, isLoading, isFetching, error } = useWeatherData({ placeId });

  useEffect(() => {
    const currentData = data?.current;
    if (currentData && placeId) {
      updateRecentSearch(placeId, {
        temperature: currentData.temp,
        humidity: currentData.humidity,
        windSpeed: currentData.wind_speed,
      });
    }
  }, [data, placeId]);

  if (error) {
    return (
      <div className={"text-center pt-5 text-xl text-red-400"}>
        Something went wrong. Try later
      </div>
    );
  }

  if (isLoading || isFetching) {
    return <WeatherSkeleton />;
  }

  if (!data) {
    return null;
  }

  const content = {
    header: (
      <>
        <div className="text-center text-xs max-w-30 sm:left-4 sm:text-sm sm:max-w-28 sm:absolute sm:text-left">
          {placeName}
        </div>
        <div className="flex gap-5">
          <IconContext.Provider value={{ size: "150" }}>
            {getWeatherIcon(
              data.current.weather[0].main,
              hasTheSunSet(data.current.weather[0].icon),
            )}
          </IconContext.Provider>
          <div className="content-center text-center">
            <div className="text-4xl font-semibold">
              {formatTemperature(data.current.temp)}
            </div>
            <div className="pt-1">{data.current.weather[0].description}</div>
          </div>
        </div>
      </>
    ),
    conditions: (
      <>
        <ConditionInfo
          condition={"Temperature"}
          value={formatTemperature(data.current.temp)}
          icon={<WiThermometer />}
        />
        <ConditionInfo
          condition={"Humidity"}
          value={`${data.current.humidity}%`}
          icon={<WiHumidity />}
        />
        <ConditionInfo
          condition={"Wind"}
          value={`${data.current.wind_speed} m/s`}
          icon={<WiWindy />}
        />
      </>
    ),
  };

  return <WeatherCardLayout isActualContent>{content}</WeatherCardLayout>;
};

export default WeatherCard;
