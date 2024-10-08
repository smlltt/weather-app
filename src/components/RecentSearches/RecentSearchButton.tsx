import { FC } from "react";
import { PlaceId } from "../../queries/types.ts";
import { useSearchStore } from "../../zustand";
import clsx from "clsx";

interface RecentSearchButtonProps {
  placeId: PlaceId;
  placeName: string;
  color: string;
}
const RecentSearchButton: FC<RecentSearchButtonProps> = ({
  placeId,
  placeName,
}) => {
  const {
    setPlaceId,
    placeId: displayedPlaceId,
    setPlaceName,
  } = useSearchStore();
  return (
    <button
      onClick={() => {
        setPlaceId(placeId);
        setPlaceName(placeName);
      }}
      className={clsx(
        "rounded-lg shadow-md px-4 py-2",
        placeId === displayedPlaceId ? "bg-blue-300" : "bg-white",
      )}
    >
      {placeName}
    </button>
  );
};

export default RecentSearchButton;
