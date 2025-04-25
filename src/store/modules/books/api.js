import axios from "axios";
import useAuthStore from "../../authStore";

const API_SEARCH_URL = "https://localhost:9001/api/v1/";

// Create axios instance
export const api = axios.create({ baseURL: API_SEARCH_URL });

// Attach auth token for protected endpoints
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Search books without auth
export const fetchSearchBooks = async (params) => {
  const { data } = await axios.get("BookListing/search", { params });
  return data;
};

// Favorites endpoints
export const fetchFavoritesBooks = async () => {
  const { data } = await api.get("Favorites");
  return data;
};

export const CheckFavoriteBook = async (bookId) => {
  return await api.get(`Favorites/check/${bookId}`);
};

export const AddFavorite = async (bookId) => {
  const response = await api.post("Favorites", { bookListingId: bookId });
  return response;
};

export const DeleteFavorite = async (id) => {
  const response = await api.delete(`Favorites/${id}`);
  if (response.status === 200 || response.status === 204) {
    return true;
  }
  return false;
};
