import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PlaceId } from "../queries/types.ts";

interface SearchState {
  placeId: PlaceId | undefined;
  placeName: string | undefined;
  recentSearches: Array<{
    placeId: PlaceId;
    placeName: string;
    temperature?: number;
    humidity?: number;
    windSpeed?: number;
  }>;
  setPlaceId: (placeId: PlaceId) => void;
  setPlaceName: (placeName?: string) => void;
  addRecentSearch: (placeId: PlaceId, placeName: string) => void;
  updateRecentSearch: (
    placeId: PlaceId,
    updates: {
      temperature?: number;
      humidity?: number;
      windSpeed?: number;
    },
  ) => void;
}

export const useSearchStore = create<SearchState>(
  persist(
    (set) => ({
      placeId: "ChIJAZ-GmmbMHkcR_NPqiCq-8HI",
      placeName: "Warsaw, Poland",
      recentSearches: [],
      setPlaceId: (placeId) => set({ placeId }),
      setPlaceName: (placeName) => set({ placeName: placeName || "" }),
      addRecentSearch: (placeId, placeName) =>
        set((state) => {
          const existingSearchIndex = state.recentSearches.findIndex(
            (search) => search.placeId === placeId,
          );
          if (existingSearchIndex !== -1) {
            const updatedSearches = [...state.recentSearches];
            const [existingSearch] = updatedSearches.splice(
              existingSearchIndex,
              1,
            );
            updatedSearches.unshift(existingSearch);
            return { recentSearches: updatedSearches };
          }
          return {
            recentSearches: [
              { placeId, placeName },
              ...state.recentSearches.slice(0, 3),
            ],
          };
        }),
      updateRecentSearch: (placeId, updates) =>
        set((state) => {
          const updatedSearches = state.recentSearches.map((search) =>
            search.placeId === placeId ? { ...search, ...updates } : search,
          );
          return { recentSearches: updatedSearches };
        }),
    }),
    {
      name: "search-storage",
    },
  ),
);
