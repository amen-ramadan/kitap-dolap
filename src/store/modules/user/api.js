import axios from "axios";
import useAuthStore from "../../authStore";

const API_BASE_URL = "https://localhost:9001/api/v1";

// Get user profile
export const fetchUserProfile = async () => {
  const token = useAuthStore.getState().user.jwToken;
  const config = { headers: { Authorization: `Bearer ${token}` } };

  try {
    const response = await axios.get(`${API_BASE_URL}/User/profile`, config);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching user profile:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch user profile"
    );
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  const token = useAuthStore.getState().user.jwToken;
  const config = { headers: { Authorization: `Bearer ${token}` } };

  try {
    const response = await axios.put(
      `${API_BASE_URL}/User/profile`,
      userData,
      config
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating user profile:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to update user profile"
    );
  }
};

// Delete user account
export const deleteUserAccount = async () => {
  const token = useAuthStore.getState().user.jwToken;
  const config = { headers: { Authorization: `Bearer ${token}` } };

  try {
    const response = await axios.delete(`${API_BASE_URL}/User/account`, config);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting user account:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to delete user account"
    );
  }
};
