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
import useSnackbarStore from "../../store/snackStore";
import { useBlogsStore } from "../../store/modules/blogs/store";

export default function EditBlogDialog({ open, onClose, blog }) {
  const [updateBlog, setEditBlog] = React.useState({
    title: blog.title,
    content: blog.content,
  });
  const [errors, setErrors] = React.useState({});
  const { setOpenSnackbar } = useSnackbarStore();
  const { editBlog } = useBlogsStore();

  const handleSave = async () => {
    if (validate()) {
      try {
        await editBlog(blog.id, { ...blog, ...updateBlog });
        setOpenSnackbar("Blog updated successfully", "success");
        onClose();
        setEditBlog({ title: "", content: "" });
      } catch (error) {
        setOpenSnackbar("Failed to update blog: " + error.message, "error");
      }
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!updateBlog.title.trim()) newErrors.title = "Title is required";
    if (!updateBlog.content.trim()) newErrors.content = "Content is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
              value={updateBlog.title}
              onChange={(e) =>
                setEditBlog({ ...updateBlog, title: e.target.value })
              }
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField
              label="Content"
              variant="outlined"
              fullWidth
              multiline
              rows={6}
              value={updateBlog.content}
              onChange={(e) =>
                setEditBlog({ ...updateBlog, content: e.target.value })
              }
              error={!!errors.content}
              helperText={errors.content}
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
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
