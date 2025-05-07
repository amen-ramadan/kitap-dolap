import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  CardMedia,
  Select,
  MenuItem,
} from "@mui/material";
import UploadImage from "../Button/UploadImage";
import useSnackbarStore from "../../store/snackStore";
import { useBooksStore } from "../../store/modules/books/store";
import useAuthStore from "../../store/authStore";

export default function AddDialog({ open, onClose }) {
  const sellerName = useAuthStore.getState().user.userName;
  const [book, setBook] = React.useState({
    title: "",
    author: "",
    price: "",
    condition: 1,
    sellerName: sellerName,
    imageUrl: "",
    previewUrl: "",
  });
  const [errors, setErrors] = React.useState({});
  const { setOpenSnackbar } = useSnackbarStore();
  const { postBook } = useBooksStore();

  const validate = () => {
    const newErrors = {};
    if (!book.title.trim()) newErrors.title = "Title is required";
    if (!book.author.trim()) newErrors.author = "Author is required";
    if (!book.price) newErrors.price = "Price is required";
    else if (isNaN(book.price)) newErrors.price = "Price must be a number";
    if (!book.imageUrl) newErrors.imageUrl = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = async () => {
    if (validate()) {
      try {
        await postBook(book);
        setOpenSnackbar("Book added successfully", "success");
        onClose();
        setBook({
          title: "",
          author: "",
          price: "",
          condition: 1,
          sellerName: sellerName,
          imageUrl: "",
          previewUrl: "",
        });
      } catch (error) {
        setOpenSnackbar("Failed to add book: " + error.message, "error");
      }
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
        Add Book
      </DialogTitle>
      <DialogContent>
        <Box element="form" sx={{ display: "flex", gap: 2 }}>
          {/* image */}
          <Box sx={{ width: "40%", objectFit: "cover", borderRadius: 1 }}>
            <CardMedia
              component="img"
              image={book.imageUrl}
              alt={book.title}
              sx={{
                width: "100%",
                height: "400px",
                border: errors.imageUrl ? "2px solid red" : "none",
              }}
            />
          </Box>
          {/* details */}
          <Box
            sx={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              p: 4,
              backgroundColor: "#eee",
            }}
          >
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField
              label="Author"
              variant="outlined"
              fullWidth
              value={book.author}
              onChange={(e) => setBook({ ...book, author: e.target.value })}
              error={!!errors.author}
              helperText={errors.author}
            />
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              value={book.price}
              onChange={(e) => setBook({ ...book, price: e.target.value })}
              error={!!errors.price}
              helperText={errors.price}
            />
            <Select
              variant="outlined"
              fullWidth
              value={book.condition}
              onChange={(e) => setBook({ ...book, condition: e.target.value })}
            >
              {[...Array(10)].map((_, i) => (
                <MenuItem key={10 - i} value={10 - i}>
                  {10 - i}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: 1, justifyContent: "space-between" }}>
        <UploadImage setBook={setBook} />
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
            Add Book
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}