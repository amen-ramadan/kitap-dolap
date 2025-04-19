// components/BookDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CardMedia,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

/**
 * Modal dialog showing detailed book info.
 * Props:
 * - book: { imageUrl, title, author, price, condition, sellerName, phone }
 * - open: boolean
 * - onClose: function
 */
const BookDialog = ({ book, open, onClose }) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="lg"
    fullWidth
    sx={{ "& .MuiDialog-paper": { overflow: "hidden" } }}
  >
    <DialogTitle>Book details</DialogTitle>
    <DialogContent sx={{ overflow: "hidden", display: "flex", gap: 2 }}>
      <CardMedia
        component="img"
        image={book.imageUrl}
        alt={book.title}
        sx={{ width: "40%", objectFit: "cover", borderRadius: 1 }}
      />
      <Box
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          {book.title}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            textAlign: "right",
            borderBottom: "1px solid #ccc",
            width: "100%",
            mt: 2,
          }}
        >
          {book.author}
        </Typography>
        <Typography
          variant="h6"
          sx={{ textAlign: "left", width: "100%", mt: 2 }}
        >
          Price: <span style={{ marginLeft: 10 }}>${book.price}</span>
        </Typography>
        <Typography
          variant="h6"
          sx={{ textAlign: "left", width: "100%", mt: 2 }}
        >
          Condition: <span style={{ marginLeft: 10 }}>{book.condition}/10</span>
        </Typography>
        <IconButton
          aria-label="add to favorites"
          sx={{ mt: 2, ":hover": { color: "red" } }}
        >
          <FavoriteIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Typography variant="h5">Contact the seller</Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 2 }}>
            <Typography>Number: {book.phone || "0123456789"}</Typography>
            <IconButton
              sx={{
                width: 40,
                height: 40,
                backgroundColor: "#1d6594",
                ml: 1,
                "&:hover": { backgroundColor: "#1d6594ba" },
              }}
            >
              <WhatsAppIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </DialogContent>
    <DialogActions sx={{ mt: 1 }}>
      <Button
        onClick={onClose}
        sx={{
          width: 100,
          height: 40,
          color: "black",
          "&:hover": { backgroundColor: "#1d6594ba" },
        }}
      >
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default BookDialog;
