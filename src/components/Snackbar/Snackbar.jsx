// components/Snackbar.js
import React from "react";
import { Snackbar as MuiSnackbar, Alert } from "@mui/material";
import useSnackbarStore from "../../store/snackStore";

export default function CustomSnackbar() {
  const { openSnackbar, messageSnackbar, severity, handleClose } =
    useSnackbarStore();

  return (
    <MuiSnackbar
      open={openSnackbar}
      autoHideDuration={2500}
      onClose={handleClose}
      anchorOrigin={{ vertical: "center", horizontal: "center" }}
      sx={{
        "& .MuiSnackbar-root": {
          position: "fixed",
          zIndex: 9999,
        },
      }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {messageSnackbar}
      </Alert>
    </MuiSnackbar>
  );
}
