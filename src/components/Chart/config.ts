import { colors } from "../../constants";
import { ChartOptions } from "chart.js";

export const chartBackgroundColors = [
  {
    backgroundColor: colors.chartBackground.center,
    pointRadius: 0,
    borderWidth: 0,
    data: [1.9, 1.9, 1.9],
  },
  {
    backgroundColor: colors.chartLines.center,
    pointRadius: 0,
    borderWidth: 0,
    data: [2, 2, 2],
  },
  {
    backgroundColor: colors.chartBackground.middleToCenter,
    pointRadius: 0,
    borderWidth: 0,
    data: [3.9, 3.9, 3.9],
  },
  {
    backgroundColor: colors.chartLines.middleToCenter,
    pointRadius: 0,
    borderWidth: 0,
    data: [4, 4, 4],
  },
  {
    backgroundColor: colors.chartBackground.middleToOuter,
    pointRadius: 0,
    borderWidth: 0,
    data: [5.9, 5.9, 5.9],
  },
  {
    backgroundColor: colors.chartLines.middleToOuter,
    pointRadius: 0,
    borderWidth: 0,
    data: [6, 6, 6],
  },
  {
    backgroundColor: colors.chartBackground.outer,
    pointRadius: 0,
    borderWidth: 0,
    data: [7.9, 7.9, 7.9],
  },
  {
    backgroundColor: colors.chartLines.outer,
    pointRadius: 0,
    borderWidth: 0,
    data: [8, 8, 8],
  },
  {
    backgroundColor: colors.chartBackground.outermost,
    pointRadius: 0,
    borderWidth: 0,
    data: [9.9, 9.9, 9.9],
  },
  {
    backgroundColor: colors.chartLines.outermost,
    pointRadius: 0,
    borderWidth: 0,
    data: [10, 10, 10],
  },
];

export const radarOptions = {
  scales: {
    r: {
      type: "derivedRadialLinearScale",
      ticks: {
        display: false,
      },
    },
  },
  animation: {
    duration: 0,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
} as ChartOptions<"radar">;
