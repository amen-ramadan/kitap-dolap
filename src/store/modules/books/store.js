import { create } from "zustand";
import {
  fetchBooks,
  fetchSearchBooks,
  // fetchBookById,
  // createBook,
  // updateBook,
  // deleteBook,
} from "./api";
import { useQuery } from "@tanstack/react-query";

export const useBooksStore = create((set, get) => ({
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
  showAdvanced: false,
  setShowAdvanced: (show) => set({ showAdvanced: show }),

  // updater
  setSearchParams: (patch) => {
    set((state) => ({
      searchParams: { ...state.searchParams, ...patch },
    }));
  },

  books: [],
  filteredBooks: [],
  setBooks: (books) => set({ books }),
  setFilteredBooks: (filteredBooks) => set({ filteredBooks }),

  // React Query Operations
  useBooksQuery: () =>
    useQuery({
      queryKey: ["books"],
      queryFn: fetchBooks,
      onSuccess: (data) => {
        set({ books: data });
      },
    }),

  useSearchBooksQuery: () => {
    const params = get().searchParams;
    return useQuery({
      queryKey: ["searchBooks", params],
      queryFn: () => fetchSearchBooks(params),
      keepPreviousData: true,
      onSuccess: (data) => {
        set({ filteredBooks: data });
      },
    });
  },

  filterBooks: (books, searchTerm) => {
    if (!searchTerm) return books;
    const lowerCaseTerm = searchTerm.toLowerCase();
    const newBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerCaseTerm) ||
        book.author.toLowerCase().includes(lowerCaseTerm)
    );
    set({ filteredBooks: newBooks });
    return newBooks;
  },
}));

// useBookQuery: (id) =>
//   useQuery({
//     queryKey: ["book", id],
//     queryFn: () => fetchBookById(id),
//     enabled: !!id,
//   }),

// useCreateBook: () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: createBook,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["books"]);
//     },
//   });
// },

// useUpdateBook: () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: updateBook,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["books"]);
//     },
//   });
// },

// useDeleteBook: () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: deleteBook,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["books"]);
//     },
//   });
// },
// }));

// , useMutation, useQueryClient
