import axios from "axios";

const BLOGS_URL = "http://localhost:3000/blogs";
// const BLOGS_URL = "https://localhost:9001/api/v1/BlogPost";

export const fetchBlogs = async (params) => {
  const response = await axios.get(BLOGS_URL, { params });
  return response.data;
};
