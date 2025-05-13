import { create } from "zustand";
import { fetchUserProfile, updateUserProfile, deleteUserAccount } from "./api";

export const useUserStore = create((set) => ({
  userData: null,
  isLoading: false,
  error: null,

  setUserData: (userData) => set({ userData }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  fetchProfile: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetchUserProfile();
      set({ userData: response, isLoading: false });
    } catch (error) {
      console.error("Error fetching profile:", error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateProfile: async (userData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await updateUserProfile(userData);
      set({ userData: response, isLoading: false });
      return response;
    } catch (error) {
      console.error("Error updating profile:", error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  deleteAccount: async () => {
    try {
      set({ isLoading: true, error: null });
      await deleteUserAccount();
      set({ userData: null, isLoading: false });
      window.location.href = "/login";
    } catch (error) {
      console.error("Error deleting account:", error);
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
}));
