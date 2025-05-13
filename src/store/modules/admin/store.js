import { create } from "zustand";

export const useAdminStore = create(() => ({
  delete: async (id) => {
    const response = await fetch(
      `https://localhost:9001/api/v1/Admin/user/${id}`,
      {
        method: "DELETE",
      }
    );
    return response.json();
  },
}));
