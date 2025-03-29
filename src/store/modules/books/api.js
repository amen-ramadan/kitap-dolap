import axios from "axios";

const API_URL = "https://fakestoreapi.com/products";

export const fetchBooks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchBookById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createBook = async (book) => {
  const response = await axios.post(API_URL, book);
  return response.data;
};

export const updateBook = async ({ id, ...book }) => {
  const response = await axios.put(`${API_URL}/${id}`, book);
  return response.data;
};

export const deleteBook = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};
