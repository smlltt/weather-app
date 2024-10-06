import { IconContext } from "react-icons";
import { FC, JSX } from "react";

interface ConditionInfoProps {
  condition: string;
  value: string;
  icon: JSX.Element;
}
const ConditionInfo: FC<ConditionInfoProps> = ({ condition, value, icon }) => {
  return (
    <div className="text-center">
      <div className={"text-blue-400"}>{condition}</div>
      <div className={"my-2 text-xl font-medium"}>{value}</div>

      <div className="flex justify-center">
        <IconContext.Provider value={{ size: "35" }}>
          {icon}
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default ConditionInfo;
