// components/BookDialog.jsx
import React, { useState, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import axios from "axios";
import useAuthStore from "../../store/authStore";
// import { useBooksStore } from "../../store/modules/books/store";
 
const API_BASE_URL = "https://localhost:9001/api/v1";
 
const BookDialog = ({ book, open, onClose }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [checkingFavorite, setCheckingFavorite] = useState(true);
  const [togglingFavorite, setTogglingFavorite] = useState(false);
 
  // const { checkFavorite } = useBooksStore();
 
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!book.id) return;
      setCheckingFavorite(true);
      const token = useAuthStore.getState().user.jwToken;
      if (!token) {
        setIsFavorited(false);
        setCheckingFavorite(false);
        return;
      }
      try {
        const response = await axios.get(
          `${API_BASE_URL}/Favorites/check/${book.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setIsFavorited(response.data);
      } catch (err) {
        console.error("Failed to check favorite status:", err);
        setIsFavorited(false);
      } finally {
        setCheckingFavorite(false);
      }
    };
    checkFavoriteStatus();
  }, [book.id]);
 
  const handleToggleFavorite = async () => {
    const token = useAuthStore.getState().user.jwToken;
    if (!token || togglingFavorite || !book.id) return;
 
    setTogglingFavorite(true);
    const currentStatus = isFavorited;
    const url = `${API_BASE_URL}/Favorites`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
 
    try {
      if (currentStatus) {
        await axios.delete(`${url}/${book.id}`, config);
        setIsFavorited(false);
      } else {
        await axios.post(url, { bookListingId: book.id }, config);
        setIsFavorited(true);
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    } finally {
      setTogglingFavorite(false);
    }
  };
 
  // const clickFavorite = async () => {
  //   const result = await checkFavorite(book.id);
  //   if (result) {
  //     await deleteFavorite(book.id);
  //   } else {
  //     await addFavorite(book.id);
  //   }
  // };
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
        Book details
      </DialogTitle>
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
            Condition:{" "}
            <span style={{ marginLeft: 10 }}>{book.condition}/10</span>
          </Typography>
          <IconButton
            aria-label="add to favorites"
            sx={{ mt: 2, color: isFavorited ? "red" : "inherit" }}
            onClick={handleToggleFavorite}
            disabled={checkingFavorite || togglingFavorite}
          >
            {checkingFavorite || togglingFavorite ? (
              <CircularProgress size={24} color="inherit" />
            ) : isFavorited ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
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
              <Typography>Number: {book.phone || "+905314971560"}</Typography>
              <IconButton
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#1d6594",
                  ml: 1,
                  "&:hover": { backgroundColor: "#1d6594ba" },
                }}
                href={`https://api.whatsapp.com/send?phone=+905314971560&text=${encodeURIComponent(
                  "Hello, I'm interested in your book: " + book.title
                )}`}
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
          variant="contained"
          sx={{
            px: 4,
            height: "auto",
            color: "white",
            backgroundColor: "#d3302f",
            "&:hover": { backgroundColor: "darkred", color: "white" },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default BookDialog;