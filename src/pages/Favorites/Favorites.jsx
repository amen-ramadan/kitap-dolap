import React, { useEffect, useState } from "react";
import { useFavoritesStore } from "../../store/modules/favorites/store";
import { Box, Typography, CircularProgress } from "@mui/material";
import BookCard from "../../components/BookCard/BookCard";

export default function Favorites() {
  const { favorites, favoriteBooks, isLoading, fetchFavorites } =
    useFavoritesStore();
  const [error, setError] = useState(null);
  //console.log("favorites", favorites);
  //console.log("favoriteBooks", favoriteBooks);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        await fetchFavorites();
      } catch (err) {
        setError(err.message || "Failed to load favorites");
      }
    };
    loadFavorites();
  }, [fetchFavorites]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading favorites...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 4, color: "error.main" }}>
        <Typography variant="h6">Error loading favorites</Typography>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  if (!favoriteBooks || favoriteBooks.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6">No favorites yet!</Typography>
        <Typography>Go add some books you like.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "22px",
        padding: "20px",
      }}
    >
      {favoriteBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </Box>
  );
}
