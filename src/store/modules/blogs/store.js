import { create } from "zustand";
import {
  fetchBlogs,
  postBlog,
  editBlog,
  deleteBlog,
  fetchMyBlogPosts,
} from "./api";

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

  // My Blogs
  myBlogs: [],
  setMyBlogs: (blogs) => set({ myBlogs: blogs }),
  fetchMyBlogs: async () => {
    set({ isLoading: true });
    try {
      const blogs = await fetchMyBlogPosts();
      set({ myBlogs: blogs });
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
      return response;
    } catch (error) {
      console.error("Failed to post blog:", error);
      return null;
    }
  },
  editBlog: async (id, data) => {
    try {
      const response = await editBlog(id, data);
      return response;
    } catch (error) {
      console.error("Failed to edit blog:", error);
      return null;
    }
  },
  deleteBlog: async (id) => {
    try {
      const response = await deleteBlog(id);
      return response;
    } catch (error) {
      console.error("Failed to delete blog:", error);
      return null;
    }
  },
}));
