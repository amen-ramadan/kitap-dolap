// src/components/SearchBar.jsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useBooksStore } from "../../store/modules/books/store";

export default function SearchBar() {
  const { books, filterBooks } = useBooksStore();
  const [searchInputValue, setSearchInputValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchInputValue(value);
    // تحديث البحث في الـ store بعد تأخير قصير
    setTimeout(() => {
      filterBooks(books, value);
    }, 300);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        mb: 2,
      }}
    >
      <TextField
        label="Search books..."
        variant="outlined"
        size="large"
        value={searchInputValue}
        onChange={handleChange}
        sx={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: 2,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#fff",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon sx={{ color: "#1d6594" }} />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        onClick={() => useBooksStore.setState({ showAdvanced: true })}
        sx={{
          backgroundColor: "#1d6594",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#154c79",
          },
        }}
      >
        Advanced filter
      </Button>
    </Box>
  );
}
