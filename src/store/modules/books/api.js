import axios from "axios";

const API_URL = "http://localhost:3000/data";
const API_SEARCH_URL = "http://localhost:3000/data";

export const fetchBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

/**
 * Fetch books with search parameters (search, filter, sort, pagination)
 * @param {object} params - Query parameters as in URLSearchParams
 *    Example: { title_like: 'harry', _page: 1, _limit: 10, price_gte: 5 }
 */
export const fetchSearchBooks = async (params) => {
  const response = await axios.get(API_SEARCH_URL, { params });
  return response.data;
};

// export const fetchBookById = async (id) => {
//   const response = await axios.get(`${API_URL}/${id}`);
//   return response.data;
// };

// export const createBook = async (book) => {
//   const response = await axios.post(API_URL, book);
//   return response.data;
// };

// export const updateBook = async ({ id, ...book }) => {
//   const response = await axios.put(`${API_URL}/${id}`, book);
//   return response.data;
// };

// export const deleteBook = async (id) => {
//   await axios.delete(`${API_URL}/${id}`);
//   return id;
// };
