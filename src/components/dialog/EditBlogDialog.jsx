import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
} from "@mui/material";

export default function EditBlogDialog({ open, onClose, blog }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{ "& .MuiDialog-paper": { overflow: "hidden" } }}
    >
      <DialogTitle
        sx={{ fontWeight: "bold", textAlign: "center", fontSize: 30 }}
      >
        Edit Blog
      </DialogTitle>
      <DialogContent>
        <Box element="form" sx={{ display: "flex", gap: 2 }}>
          {/* details */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              p: 4,
              // backgroundColor: "#eee",
            }}
          >
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={blog.title}
            />
            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              multiline
              rows={6}
              value={blog.content}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: 1 }}>
        <Button
          variant="outlined"
          sx={{
            width: "fit-content",
            // padding: 1,
            px: 4,
            height: "auto",
            transition: "all 0.3s ease",
            "&:hover": { backgroundColor: "#1d6594", color: "white" },
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          sx={{
            color: "white",
            backgroundColor: "#4caf50",
            width: "fit-content",
            px: 4,
            height: "auto",
            transition: "all 0.5s ease",
            "&:hover": { backgroundColor: "green", color: "white" },
          }}
          onClick={onClose}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
