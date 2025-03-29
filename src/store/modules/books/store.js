import { create } from "zustand";
import {
  fetchBooks,
  fetchBookById,
  createBook,
  updateBook,
  deleteBook,
} from "./api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useBooksStore = create((set) => ({
  // Zustand state
  selectedBook: null,
  setSelectedBook: (book) => set({ selectedBook: book }),

  // React Query Operations
  useBooksQuery: () =>
    useQuery({
      queryKey: ["books"],
      queryFn: fetchBooks,
    }),

  useBookQuery: (id) =>
    useQuery({
      queryKey: ["book", id],
      queryFn: () => fetchBookById(id),
      enabled: !!id,
    }),

  useCreateBook: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: createBook,
      onSuccess: () => {
        queryClient.invalidateQueries(["books"]);
      },
    });
  },

  useUpdateBook: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: updateBook,
      onSuccess: () => {
        queryClient.invalidateQueries(["books"]);
      },
    });
  },

  useDeleteBook: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: deleteBook,
      onSuccess: () => {
        queryClient.invalidateQueries(["books"]);
      },
    });
  },
}));
