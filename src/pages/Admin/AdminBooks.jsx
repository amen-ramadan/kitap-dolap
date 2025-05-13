import { useEffect } from "react";
import { useBooksStore } from "../../store/modules/books/store";
import BookCard from "../../components/BookCard/BookCard";
import { Box, Typography } from "@mui/material";
import { useAdminStore } from "../../store/modules/admin/store";

const AdminBooks = () => {
  const { books, fetchBooks, isLoading } = useBooksStore();
  const { delete: deleteBook } = useAdminStore();
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleDelete = async (id) => {
    await deleteBook(id);
    fetchBooks(); // Refresh after delete
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Books Management
      </Typography>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {books.map((book) => (
            <Box key={book.id} sx={{ position: "relative" }}>
              <BookCard book={book} height={180}>
                <button
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    background: "#d32f2f",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "4px 10px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(book.id);
                  }}
                >
                  Delete
                </button>
              </BookCard>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AdminBooks;
