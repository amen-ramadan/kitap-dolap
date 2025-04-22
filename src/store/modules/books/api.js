import axios from "axios";

const API_SEARCH_URL = "https://localhost:9001/api/v1/BookListing/search";

export const fetchSearchBooks = async (params) => {
  const response = await axios.get(API_SEARCH_URL, { params });
  return response.data;
};
