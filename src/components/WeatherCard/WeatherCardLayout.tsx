import { FC, ReactNode } from "react";
import clsx from "clsx";

interface WeatherCardLayoutProps {
  isActualContent?: boolean;
  children: {
    header: ReactNode;
    conditions: ReactNode;
  };
}

const WeatherCardLayout: FC<WeatherCardLayoutProps> = ({
  isActualContent,
  children,
}) => {
  return (
    <div className="pt-5">
      <div className="sm:px-20 flex justify-center pt-5 rounded-t-2xl bg-white relative">
        <div>{children.header}</div>
      </div>
      <div
        className={clsx(
          "justify-between rounded-b-2xl shadow-lg p-2 bg-white sm:py-5 sm:px-6",
          { "sm:flex": isActualContent },
        )}
      >
        {children.conditions}
      </div>
    </div>
  );
};

export default WeatherCardLayout;
