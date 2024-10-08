import { useSearchStore } from "../../zustand";
import RecentSearchButton from "./RecentSearchButton.tsx";

const RecentSearches = () => {
  const { recentSearches } = useSearchStore();
  return (
    <div className={"flex min-h-10 py-2 gap-1 flex-wrap"}>
      {recentSearches.map(({ placeId, placeName, color }) => (
        <RecentSearchButton
          key={placeId}
          placeId={placeId}
          placeName={placeName}
          color={color}
        />
      ))}
    </div>
  );
};

export default RecentSearches;
