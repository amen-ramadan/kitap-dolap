import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookDialog from "../dialog/DetailsDialog";

/**
 * Main card component for each book, opens dialog on click.
 * Props:
 * - book: { imageUrl, title, author, price, sellerName }
 */
const BookCard = ({ book }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        onClick={handleOpen}
        sx={{
          display: "flex",
          cursor: "pointer",
          maxWidth: 500,
          minWidth: 500,
          p: 1,
          boxShadow: 3,
          border: "1px solid #ccc",
          backgroundColor: "#1d659433",
        }}
      >
        <CardMedia
          component="img"
          image={book.imageUrl}
          alt={book.title}
          sx={{ width: 120, height: 175, borderRadius: 1, objectFit: "cover" }}
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
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
      <BookDialog book={book} open={open} onClose={handleClose} />
    </>
  );
};

export default BookCard;
