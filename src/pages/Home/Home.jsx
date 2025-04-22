import React, { useEffect } from "react";
import { Box, Grid, Container, Typography } from "@mui/material";
import { useBooksStore } from "../../store/modules/books/store";
import BookCard from "../../components/BookCard/BookCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import AdvancedSearchDialog from "../../components/dialog/AdvancedSearchDialog";

export default function Home() {
  const { fetchBooks, isLoading, filteredBooks } = useBooksStore();

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <SearchBar />
        <AdvancedSearchDialog />
      </Box>

      <Grid container spacing={3}>
        {!isLoading && filteredBooks?.length === 0 ? (
          <Grid>
            <Typography align="center" sx={{ py: 4 }}>
              No books found
            </Typography>
          </Grid>
        ) : (
          filteredBooks?.map((book) => (
            <Grid key={book.id}>
              <BookCard book={book} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
