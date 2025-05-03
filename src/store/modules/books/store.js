import { create } from "zustand";
import {
  // AddFavorite,
  // CheckFavoriteBook,
  // DeleteFavorite,
  // fetchFavoritesBooks,
  fetchSearchBooks,
  postBook,
  editBook,
  deleteBook,
  uploadBookImage,
  fetchMyListings,
} from "./api";

export const useBooksStore = create((set, get) => ({
  // UI State
  showAdvanced: false,
  setShowAdvanced: (show) => set({ showAdvanced: show }),

  // Params
  searchParams: {
    PageNumber: 1,
    PageSize: 10,
    SearchTerm: "",
    MinPrice: "",
    MaxPrice: "",
    Condition: "",
    SortBy: "",
    SortDescending: false,
    Author: "",
  },
  setSearchParams: (patch) =>
    set((state) => ({
      searchParams: { ...state.searchParams, ...patch },
    })),

  // Books
  books: [],
  filteredBooks: [],
  setBooks: (books) => set({ books, filteredBooks: books }), // set both
  setFilteredBooks: (filtered) => set({ filteredBooks: filtered }),
  isLoading: false,

  // Fetch and Filter books
  fetchBooks: async (overrideParams = {}) => {
    set({ isLoading: true });
    try {
      const finalParams = { ...get().searchParams, ...overrideParams };
      const data = await fetchSearchBooks(finalParams);
      set({ books: data.data, filteredBooks: data.data });
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      set({ isLoading: false });
    }
  },
  filterBooks: (searchTerm) => {
    const books = get().books;
    if (!searchTerm) return set({ filteredBooks: books });

    const lowerCaseTerm = searchTerm.toLowerCase();
    const newBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerCaseTerm) ||
        book.author.toLowerCase().includes(lowerCaseTerm)
    );

    set({ filteredBooks: newBooks });
  },

  // My Listings
  myListings: [],
  setMyListings: (listings) => set({ myListings: listings }),
  fetchMyListings: async () => {
    set({ isLoading: true });
    try {
      const listings = await fetchMyListings();
      set({ myListings: listings });
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////

  // Mutations
  postBook: async (data) => {
    try {
      const response = await postBook(data);
      return response;
    } catch (error) {
      console.error("Failed to post book:", error);
      return null;
    }
  },
  editBook: async (id, data) => {
    try {
      const response = await editBook(id, data);
      return response;
    } catch (error) {
      console.error("Failed to edit book:", error);
      return null;
    }
  },
  deleteBook: async (id) => {
    try {
      const response = await deleteBook(id);
      return response;
    } catch (error) {
      console.error("Failed to delete book:", error);
      return null;
    }
  },
  uploadBookImage: async (data) => {
    try {
      const response = await uploadBookImage(data);
      return response;
    } catch (error) {
      console.error("Failed to upload book image:", error);
      return null;
    }
  },

  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////

  // // Favorite
  // favorites: [],
  // setFavorites: (favorites) => set({ favorites }),

  // fetchFavorites: async () => {
  //   set({ isLoading: true });
  //   try {
  //     const data = await fetchFavoritesBooks();
  //     set({ favorites: data.data });
  //   } catch (error) {
  //     console.error("Failed to fetch favorites:", error);
  //   } finally {
  //     set({ isLoading: false });
  //   }
  // },
  // checkFavorite: async (id) => {
  //   return await CheckFavoriteBook(id);
  // },
  // addFavorite: async (id) => {
  //   const isFavorite = await get().checkFavorite(id);
  //   if (isFavorite) {
  //     return "Already in favorites";
  //   } else {
  //     const added = await AddFavorite(id);
  //     return added ? "Added to favorites" : "Failed to add to favorites";
  //   }
  // },
  // deleteFavorite: async (id) => {
  //   return await DeleteFavorite(id);
  // },
}));
