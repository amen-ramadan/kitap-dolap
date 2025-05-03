import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookDialog from "../dialog/DetailsDialog";
import { useFavoritesStore } from "../../store/modules/favorites/store";
import axios from "axios";

const API_BASE_URL = "https://localhost:9001/api/v1";

/**
 * Main card component for each book, opens dialog on click.
 * Props:
 * - book: { imageUrl, title, author, price, sellerName }
 */
const BookCard = ({ book, children, height }) => {
  const [open, setOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [checkingFavorite, setCheckingFavorite] = useState(true);
  const [togglingFavorite, setTogglingFavorite] = useState(false);
  const { fetchFavorites } = useFavoritesStore();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!book.id) return;
      setCheckingFavorite(true);
      const token = localStorage.getItem("authToken");
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

  const handleToggleFavorite = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("authToken");
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
      await fetchFavorites(); // Refresh favorites list
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    } finally {
      setTogglingFavorite(false);
    }
  };

  return (
    <>
      <Card
        onClick={handleOpen}
        sx={{
          display: "flex",
          cursor: "pointer",
          maxWidth: 530,
          minWidth: 530,
          p: 1,
          boxShadow: 3,
          border: "1px solid #ccc",
          backgroundColor: "#1d659433",
          transition: "all 0.5s ease",
          "&:hover": {
            backgroundColor: "#3c5264",
          },
        }}
      >
        <CardMedia
          component="img"
          image={book.imageUrl}
          alt={book.title}
          sx={{
            width: 180,
            height: height,
            borderRadius: 1,
            objectFit: "contain",
          }}
        />
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "#fff",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {book.title.length > 26
              ? `${book.title.substring(0, 23)}...`
              : book.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
            {book.author}
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            ${book.price}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              @{book.sellerName || "sellerName"}
            </Typography>
            <IconButton
              aria-label="add to favorites"
              sx={{
                color: isFavorited ? "#ff0000" : "#fff",
                width: "initial",
                height: "initial",
                p: 2,
                fontSize: 12,
                backgroundColor: "#1e5d8e",
                "&:hover": { backgroundColor: "#1e4462" },
              }}
              onClick={handleToggleFavorite}
              disabled={checkingFavorite || togglingFavorite}
            >
              {checkingFavorite || togglingFavorite ? (
                <CircularProgress size={20} color="inherit" />
              ) : isFavorited ? (
                <FavoriteIcon sx={{ ml: 1 }} />
              ) : (
                <FavoriteBorderIcon sx={{ ml: 1 }} />
              )}
            </IconButton>
          </Box>
          {children}
        </CardContent>
      </Card>
      <BookDialog book={book} open={open} onClose={handleClose} />
    </>
  );
};

export default BookCard;
