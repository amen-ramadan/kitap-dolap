import React, { useState, useEffect } from "react";
import { Box, TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useBooksStore } from "../../store/modules/books/store";

export default function SearchBar() {
  const { filterBooks } = useBooksStore();
  const [searchInputValue, setSearchInputValue] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      filterBooks(searchInputValue);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchInputValue]);

  const handleChange = (e) => {
    setSearchInputValue(e.target.value);
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
