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
      <div className={"pt-5 mt-5 bg-white rounded-2xl shadow-2xl flex justify-center items-center"}>
        <div className={"h-full md:block"}>
          <div className={"pb-5 font-medium text-center text-2xl md:hidden"}>
            Compare your last searches:
          </div>
          <Radar data={data} />
        </div>
      </div>
  );
};

export default Chart;
