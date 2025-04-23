import { create } from "zustand";
import { fetchBlogs } from "./api";

export const useBlogsStore = create((set) => ({
  // Data
  isLoading: false,
  blogs: [],
  setBlogs: (blogs) => set({ blogs }),

  // Fetch
  fetchBlogs: async () => {
    set({ isLoading: true });
    try {
      const blogs = await fetchBlogs();
      set({ blogs, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      set({ isLoading: false });
    }
  },
}));
