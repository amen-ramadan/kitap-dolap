import { create } from "zustand";
import { fetchUserProfile, updateUserProfile, deleteUserAccount } from "./api";

export const useUserStore = create((set) => ({
  userData: null,
  setUserData: (userData) => set({ userData }),

  useUserProfileQuery: async () => {
    const response = await fetchUserProfile();
    set({ userData: response.data });
  },

  useUpdateProfileMutation: async (userData) => {
    const response = await updateUserProfile(userData);
    set({ userData: response.data });
  },

  useDeleteAccountMutation: async () => {
    await deleteUserAccount();
    set({ userData: null });
    window.location.href = "/login";
  },
}));
