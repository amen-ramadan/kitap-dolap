import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "auth", // name of item in the storage (must be unique)
      getStorage: () => localStorage, // updated from `storage: () => localStorage`
    }
  )
);

export default useAuthStore;
