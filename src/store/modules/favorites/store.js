import { create } from "zustand";
import { fetchBookById, fetchFavoriteListings } from "./api";

export const useFavoritesStore = create((set, get) => ({
  // State
  favorites: [],
  favoriteBooks: [], // New state for storing book details
  isLoading: false,
  setFavorites: (favorites) => set({ favorites }),
  setFavoriteBooks: (books) => set({ favoriteBooks: books }),

  // fetch book by id
  fetchBookById: async (id) => {
    try {
      const book = await fetchBookById(id);
      return book;
    } catch (error) {
      console.error("Failed to fetch book by id:", error);
    }
  },

  // Fetch multiple books by IDs
  fetchFavoriteBooks: async (bookIds) => {
    set({ isLoading: true });
    try {
      const bookPromises = bookIds.map((id) => get().fetchBookById(id));
      const books = await Promise.all(bookPromises);
      set({ favoriteBooks: books.filter((book) => book !== undefined) });
      return books;
    } catch (error) {
      console.error("Failed to fetch favorite books:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch favorites
  fetchFavorites: async () => {
    set({ isLoading: true });
    try {
      const data = await fetchFavoriteListings();
      console.log("Data received in store:", data);
      set({ favorites: data });

      // Extract book IDs and fetch their details
      const bookIds = data.map((fav) => fav.bookListingId);
      await get().fetchFavoriteBooks(bookIds);

      //console.log("Favorites state after setting:", get().favorites);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
