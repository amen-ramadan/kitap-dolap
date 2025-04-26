import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function RemoveBookDialog({ title, open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Are you sure you want to remove{" "}
        <span style={{ fontWeight: "bold" }}>{title}</span>?
      </DialogTitle>
      <DialogContent>
        <Typography>
          This action cannot be undone. Are you sure you want to remove this
          <span style={{ fontWeight: "bold" }}>{title}</span>?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ mb: 1 }}>
        <Button
          variant="outlined"
          sx={{
            width: "fit-content",
            padding: 1,
            height: "auto",
            transition: "all 0.3s ease",
            "&:hover": { backgroundColor: "#1d6594", color: "white" },
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          variant="outlined"
          sx={{
            width: "fit-content",
            padding: 1,
            height: "auto",
            transition: "all 0.5s ease",
            "&:hover": { backgroundColor: "darkred", color: "white" },
          }}
          onClick={onClose}
          color="error"
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}
