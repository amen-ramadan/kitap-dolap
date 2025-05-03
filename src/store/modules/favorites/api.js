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

// Fetches the details of the user's favorite book listings
export const fetchFavoriteListings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Favorites`);

    // Assuming the backend returns an array of BookListingDto objects directly
    // If it returns a wrapper object (like PagedResponse or { succeeded: true, data: [...] }), adjust parsing accordingly.
    if (Array.isArray(response.data)) {
      return response.data; // Return the array of listings
    } else if (response.data && Array.isArray(response.data.data)) {
      // Handle case where it might be wrapped in { data: [...] }
      console.warn("Favorites API might be returning a wrapped response.");
      return response.data.data;
    } else {
      // Handle unexpected structure
      console.error(
        "Unexpected response structure for favorites:",
        response.data
      );
      throw new Error(
        "Received an unexpected response structure from the server."
      );
    }
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
