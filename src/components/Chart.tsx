import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { useSearchStore } from "../zustand";
import {
  getDataSetColor,
  mapHumidityToRadar,
  mapTemperatureToRadar,
  mapWindSpeedToRadar,
} from "../utils";
import { useEffect, useState } from "react";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const Chart = () => {
  const { recentSearches } = useSearchStore();
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  if (recentSearches.length === 0) {
    return null;
  }

  const datasets = recentSearches.map((search, index) => {
    return {
      label: search.placeName,
      data: [
        mapTemperatureToRadar(search.temperature as number),
        mapHumidityToRadar(search.humidity as number),
        mapWindSpeedToRadar(search.windSpeed as number),
      ],
      fill: true,
      backgroundColor: getDataSetColor(index, 0.2),
      borderColor: getDataSetColor(index, 1),
      pointBackgroundColor: getDataSetColor(index, 1),
    };
  });

  const data = {
    labels: ["Temperature", "Humidity", "Wind Speed"],
    datasets,
  };
  return (
    <div className={"pt-5 mt-5 bg-white my-auto rounded-2xl shadow-2xl"}>
      <div className={"pb-5 font-medium text-center text-2xl md:hidden"}>
        Compare your last searches:
      </div>
      <Radar
        data={data}
        options={{ aspectRatio: 1 }}
        //done like this because tailwind's md:hidden lead to unpredictable behavior
        //and made it tricky to center the chart on small screens
        //also for small screen I want to keep the default style with aspectRatio set to 1 because I like the way it looks
        style={{ display: isLargeScreen ? "none" : "block" }}
      />

      <div className={"h-[400] hidden md:block"}>
        <Radar data={data} />
      </div>
    </div>
  );
};

export default Chart;
