import React from "react";
import BookCard from "../../components/BookCard/BookCard";
import { useBooksStore } from "../../store/modules/books/store";
import EditAndRemoveButtons from "../../components/Button/EditAndRemoveButtons";
import { Grid, Typography } from "@mui/material";
import AddNewBook from "../../components/Button/AddNewBook";

export default function MyBooks() {
  const { filteredBooks, isLoading } = useBooksStore();

  return (
    <div>
      <Typography variant="h4" align="center" sx={{ mb: 4, color: "#c69746" }}>
        MyBooks
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ mx: "auto", alignItems: "center", justifyContent: "center" }}
      >
        {!isLoading && filteredBooks?.length === 0 ? (
          <Grid>
            <Typography align="center" variant="h4" sx={{ py: 4 }}>
              No books found
            </Typography>
          </Grid>
        ) : (
          filteredBooks?.map((book) => (
            <Grid key={book.id}>
              <BookCard key={book.id} book={book}>
                <EditAndRemoveButtons book={book} />
              </BookCard>
            </Grid>
          ))
        )}
      </Grid>
      <AddNewBook />
    </div>
  );
}
