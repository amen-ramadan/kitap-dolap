import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { useSnackbarStore } from "../../store/modules/snackbar";
import { useBlogsStore } from "../../store/modules/blogs";

export default function AddBlogDialog({ open, onClose }) {
  const [blog, setBlog] = React.useState({ title: "", content: "" });
  const [errors, setErrors] = React.useState({});
  const { setOpenSnackbar } = useSnackbarStore();
  const { addBlog } = useBlogsStore();

  const validate = () => {
    const newErrors = {};
    if (!blog.title.trim()) newErrors.title = "Title is required";
    if (!blog.content.trim()) newErrors.content = "Content is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleAdd = () => {
    if (validate()) {
      try {
        addBlog(blog);
        setOpenSnackbar("Blog added successfully", "success");
      } catch (error) {
        setOpenSnackbar("Failed to add blog" + error, "error");
      }
      onClose();
      setBlog({ title: "", content: "" });
    }
  };
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
        Add new blog
      </DialogTitle>
      <DialogContent
        sx={{ p: 6, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          error={!!errors.title}
          helperText={errors.title}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={6}
          value={blog.content}
          onChange={(e) => setBlog({ ...blog, content: e.target.value })}
          error={!!errors.content}
          helperText={errors.content}
        />
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            sx={{
              px: 4,
              height: "auto",
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
              px: 4,
              height: "auto",
              "&:hover": { backgroundColor: "green" },
            }}
            onClick={handleAdd}
          >
            Add Blog
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
