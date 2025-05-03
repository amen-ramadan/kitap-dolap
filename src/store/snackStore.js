import {create} from "zustand";

const useSnackbarStore = create((set) => ({
  openSnackbar: false,
  messageSnackbar: "",
  severity: "success",
  setOpenSnackbar: (messageSnackbar, severity = "success") =>
    set({ openSnackbar: true, messageSnackbar, severity }),
  handleClose: () => set({ openSnackbar: false, messageSnackbar: "" }),
}));

export default useSnackbarStore;
