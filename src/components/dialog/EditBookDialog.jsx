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

export default function EditBookDialog({ open, onClose, book }) {
  console.log(book);
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
              value={book.title}
            />
            <TextField
              label="Author"
              variant="outlined"
              fullWidth
              value={book.author}
            />
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              value={book.price}
            />
            <Select
              label="Condition"
              variant="outlined"
              fullWidth
              value={book.condition}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={1}>1</MenuItem>
            </Select>
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
