import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: "auth", // name of item in the storage (must be unique)
      getStorage: () => localStorage, // updated from `storage: () => localStorage`
    }
  )
);

export default useAuthStore;
