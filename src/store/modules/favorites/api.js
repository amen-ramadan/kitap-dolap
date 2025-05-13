import axios from "axios";
import useAuthStore from "../../authStore";

const API_BASE_URL = "https://localhost:9001/api/v1";
export const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().user.jwToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchFavoriteListings = async () => {
  try {
    const response = await api.get(`/Favorites`);
    return response.data;
  } catch (error) {
    console.error(
      "Axios error fetching favorites:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch favorites"
    );
  }
};

// single book listing by its ID
export const fetchBookById = async (id) => {
  const response = await api.get(`/BookListing/${id}`);
  return response.data;
};
