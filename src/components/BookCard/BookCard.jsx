import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const BookCard = ({ book }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Book Card */}
      <Card
        onClick={handleOpen}
        sx={{
          display: "flex",
          cursor: "pointer",
          maxWidth: 500,
          p: 1,
          boxShadow: 3,
          border: "1px solid #ccc",
          backgroundColor: "#1d659433",
        }}
      >
        {/* Book Image */}
        <CardMedia
          component="img"
          image={book.image}
          alt={book.title}
          sx={{ width: 120, height: 175, borderRadius: 1 }}
        />

        {/* Book Details */}
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
            {book.title.substring(0, 26)}...
          </Typography>
          <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
            {book.description.substring(0, 60)}...
          </Typography>

          {/* Author & Price */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "#cca140", fontWeight: "bold" }}
            >
              Author: "Omran Khobea"
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              ${book.price}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Dialog for Book Details */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{book.title}</DialogTitle>
        <DialogContent>
          <CardMedia
            component="img"
            image={book.image}
            alt={book.title}
            sx={{ width: "100%", borderRadius: 1 }}
          />
          <Typography variant="body1" sx={{ mt: 2 }}>
            {book.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookCard;
