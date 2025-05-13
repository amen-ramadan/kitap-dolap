import axios from "axios";
import useAuthStore from "../../authStore";

const API_SEARCH_URL = "https://localhost:9001/api/v1/";

// Create axios instance
export const api = axios.create({ baseURL: API_SEARCH_URL });

// Attach auth token for protected endpoints
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().user.jwToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Search and Get books without auth
export const fetchSearchBooks = async (params) => {
  const { data } = await axios.get(`${API_SEARCH_URL}BookListing/search`, {
    params,
  });
  return data;
};

// Put book
export const editBook = async (id, data) => {
  const response = await api.put(`${API_SEARCH_URL}BookListing/${id}`, data);
  return response;
};

// Delete book
export const deleteBook = async (id) => {
  const response = await api.delete(`${API_SEARCH_URL}BookListing/${id}`);
  return response;
};

// Post book
export const postBook = async (data) => {
  const response = await api.post(`${API_SEARCH_URL}BookListing`, data);
  return response;
};

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// Fetches the current user's book listings with pagination
export const fetchMyListings = async () => {
  const userId = useAuthStore.getState().user.id;
  const url = `${API_SEARCH_URL}BookListing/seller/${userId}`;
  const response = await api.get(url);
  return response.data.data;
};

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// Upload book image
export const uploadBookImage = async (data) => {
  const response = await api.post(
    `${API_SEARCH_URL}BookListing/upload-image`,
    data
  );
  return response;
};

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

// // for edit in my amen desktop
// export const fetchSearchBooks = async () => {
//   const data = await axios.get("http://localhost:3003/data");
//   return data;
// };

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
