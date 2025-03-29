import { create } from "zustand";
import {
  fetchPosts,
  fetchPostById,
  createPost,
  updatePost,
  deletePost,
} from "./api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostsStore = create((set) => ({
  // Zustand state
  selectedPost: null,
  setSelectedPost: (post) => set({ selectedPost: post }),

  // React Query Operations
  usePostsQuery: () =>
    useQuery({
      queryKey: ["posts"],
      queryFn: fetchPosts,
    }),

  usePostQuery: (id) =>
    useQuery({
      queryKey: ["post", id],
      queryFn: () => fetchPostById(id),
      enabled: !!id,
    }),

  useCreatePost: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: createPost,
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    });
  },

  useUpdatePost: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: updatePost,
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    });
  },

  useDeletePost: () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: deletePost,
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
    });
  },
}));
