import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { useSearchStore } from "../../zustand";
import {
  getDataSetColor,
  mapHumidityToRadar,
  mapTemperatureToRadar,
  mapWindSpeedToRadar,
} from "../../utils";
import CustomRadialLinearScale from "./CustomRadarLinearScale.tsx";
import CustomRadarController from "./CustomRadarController.tsx";
import { chartBackgroundColors, radarOptions } from "./config.ts";

ChartJS.register(PointElement, LineElement, Filler, Tooltip, Legend);

ChartJS.register(CustomRadarController, CustomRadialLinearScale);

const Chart = () => {
  const { recentSearches, placeId } = useSearchStore();
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
      backgroundColor: getDataSetColor(search.placeId === placeId ? 1 : 0.3),
      borderColor: "transparent",
      pointStyle: false,
    };
  });

  const data = {
    labels: ["Temperature", "Humidity", "Wind Speed"],
    datasets: [...datasets, ...chartBackgroundColors],
  };

  return (
    <div
      className={
        "pt-5 mt-5 bg-white rounded-2xl shadow-2xl flex justify-center items-center"
      }
    >
      <div className={"h-full md:block"}>
        <Radar type="derivedRadar" data={data} options={radarOptions} />
      </div>
    </div>
  );
};

export default Chart;
