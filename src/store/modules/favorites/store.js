import { create } from "zustand";
import { fetchFavoriteListings } from "./api";

export const useFavoritesStore = create((set, get) => ({
  // State
  favorites: [],
  isLoading: false,
  setFavorites: (favorites) => set({ favorites }),

  // Fetch favorites
  fetchFavorites: async () => {
    set({ isLoading: true });
    try {
      const data = await fetchFavoriteListings();
      set({ favorites: data.data });
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
