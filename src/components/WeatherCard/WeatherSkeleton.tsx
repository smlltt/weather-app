import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import WeatherCardLayout from "./WeatherCardLayout";
const WeatherSkeleton = () => {
  const skeletonContent = {
    header: (
      <>
        <div className="flex gap-5">
          <Skeleton circle={true} height={150} width={150} />
          <div className="content-center text-center">
            <Skeleton height={40} width={100} />
            <Skeleton height={20} width={80} />
          </div>
        </div>
      </>
    ),
    conditions: (
      <>
        <Skeleton height={80} />
        <div className={"sm:hidden"}>
          <Skeleton height={80} />
          <Skeleton height={80} />
        </div>
      </>
    ),
  };

  return <WeatherCardLayout>{skeletonContent}</WeatherCardLayout>;
};

export default WeatherSkeleton;
