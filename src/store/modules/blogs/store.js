import { create } from "zustand";
import {
  fetchBlogs,
  postBlog,
  editBlog,
  deleteBlog,
  fetchMyBlogPosts,
} from "./api";

export const useBlogsStore = create((set, get) => ({
  // Data
  isLoading: false,
  blogs: [],
  setBlogs: (blogs) => set({ blogs }),

  // State
  myBlogs: [],
  lastAction: null, // Track the last action performed

  // Actions
  setMyBlogs: (blogs) => set({ myBlogs: blogs }),
  setLastAction: (action) => set({ lastAction: action }),

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

  // My Blogs
  fetchMyBlogs: async () => {
    set({ isLoading: true });
    try {
      const data = await fetchMyBlogPosts();
      set({ myBlogs: data });
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Mutations
  postBlog: async (data) => {
    try {
      const response = await postBlog(data);
      set({ lastAction: "create" }); // Update lastAction after successful creation
      return response;
    } catch (error) {
      console.error("Failed to post blog:", error);
      return null;
    }
  },

  editBlog: async (id, data) => {
    try {
      const response = await editBlog(id, data);
      set({ lastAction: "update" }); // Update lastAction after successful update
      return response;
    } catch (error) {
      console.error("Failed to edit blog:", error);
      return null;
    }
  },

  deleteBlog: async (id) => {
    try {
      await deleteBlog(id);
      set({ lastAction: "delete" }); // Update lastAction after successful deletion
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  },
}));
