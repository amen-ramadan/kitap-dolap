import React, { useEffect } from "react";
import BookCard from "../../components/BookCard/BookCard";
import { useBooksStore } from "../../store/modules/books/store";
import EditAndRemoveBookButtons from "../../components/Button/EditAndRemoveBookButtons";
import { Grid, Typography } from "@mui/material";
import AddNewBook from "../../components/Button/AddNewBook";

export default function MyBooks() {
  const { myListings, fetchMyListings, isLoading } = useBooksStore();

  useEffect(() => {
    fetchMyListings();
  }, [fetchMyListings]);

  return (
    <div>
      <Typography variant="h4" align="center" sx={{ mb: 4, color: "#c69746" }}>
        My Books
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ mx: "auto", alignItems: "center", justifyContent: "center" }}
      >
        {!isLoading && myListings?.length === 0 ? (
          <Grid>
            <Typography align="center" variant="h4" sx={{ py: 4 }}>
              No books found
            </Typography>
          </Grid>
        ) : (
          myListings?.map((book) => (
            <Grid key={book.id}>
              <BookCard key={book.id} book={book}>
                <EditAndRemoveBookButtons book={book} />
              </BookCard>
            </Grid>
          ))
        )}
      </Grid>
      <AddNewBook />
    </div>
  );
}
