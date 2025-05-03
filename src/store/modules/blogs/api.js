import axios from "axios";
import useAuthStore from "../../authStore";

// const BLOGS_URL = "http://localhost:3000/blogs";
const BLOGS_URL = "https://localhost:9001/api/v1/BlogPost";

// Create axios instance
export const api = axios.create({ baseURL: BLOGS_URL });

// Attach auth token for protected endpoints
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().user.jwToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchBlogs = async (params) => {
  const response = await axios.get(BLOGS_URL, { params });
  return response.data;
};

// My Blogs
export const fetchMyBlogPosts = async () => {
  const userId = useAuthStore.getState().user.id;
  const url = `${BLOGS_URL}/author/${userId}`;
  const response = await api.get(url);
  console.log("response from my blogs", response);
  return response;
};

// Post blog
export const postBlog = async (data) => {
  const response = await api.post("", data);
  return response;
};

// Delete blog
export const deleteBlog = async (id) => {
  const response = await api.delete(`/${id}`);
  return response;
};

// Edit blog
export const editBlog = async (id, data) => {
  const response = await api.put(`/${id}`, data);
  return response;
};
