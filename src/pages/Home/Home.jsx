import React from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { useBooksStore } from "../../store/modules/books/store";
import BookCard from "../../components/BookCard/BookCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import AdvancedSearchDialog from "../../components/dialog/AdvancedSearchDialog";

export default function Home() {
  const { books, filteredBooks, setBooks, useBooksQuery } = useBooksStore();
  const { data, isLoading, error, isFetching } = useBooksQuery();

  console.log(filteredBooks);

  // تحميل الكتب الأساسية
  React.useEffect(() => {
    if (data) {
      setBooks(data);
    }
  }, [data, setBooks]);

  // استخدام الكتب المصفاة
  const booksToShow = filteredBooks.length > 0 ? filteredBooks : books;

  if (isLoading || isFetching) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography color="error" variant="h6">
            Error loading books
          </Typography>
          <Typography color="error" sx={{ mt: 1 }}>
            {error.message}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <SearchBar />
        <AdvancedSearchDialog />
      </Box>
      <Grid container spacing={3}>
        {booksToShow.map((book) => (
          <Grid key={book.id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
