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
import { useBooksStore } from "../../store/modules/books/store";

export default function EditBookDialog({ open, onClose, book }) {
  const { setOpenSnackbar, updateBook } = useBooksStore();
  const [formData, setFormData] = React.useState({
    title: book.title,
    author: book.author,
    price: book.price,
    condition: book.condition,
    imageUrl: "",
    previewUrl: "",
  });
  const handleSave = () => {
    try {
      updateBook({ ...book, ...formData });
      setOpenSnackbar("Book updated successfully", "success");
    } catch (error) {
      setOpenSnackbar("Failed to update book" + error, "error");
    }
    onClose();
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
        Edit Book
      </DialogTitle>
      <DialogContent>
        <Box element="form" sx={{ display: "flex", gap: 2 }}>
          {/* image */}
          <Box sx={{ width: "40%", objectFit: "cover", borderRadius: 1 }}>
            <CardMedia
              component="img"
              image={book.imageUrl}
              alt={book.title}
              sx={{ width: "100%", height: "100%" }}
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
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            <TextField
              label="Author"
              variant="outlined"
              fullWidth
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
            />
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
            <Select
              label="Condition"
              variant="outlined"
              fullWidth
              value={formData.condition}
              onChange={(e) =>
                setFormData({ ...formData, condition: e.target.value })
              }
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={1}>1</MenuItem>
            </Select>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ mb: 1, justifyContent: "space-between" }}>
        <UploadImage setBook={setFormData} />
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
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
