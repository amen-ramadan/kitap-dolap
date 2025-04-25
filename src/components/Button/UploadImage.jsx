import React from "react";
import { Button } from "@mui/material";

export default function UploadImage({ setBook, book }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setBook({ ...book, imageUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <input
        accept="image/*"
        type="file"
        id="upload-image"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <label htmlFor="upload-image">
        <Button
          variant="contained"
          component="span"
          sx={{
            backgroundColor: "#c69746",
            "&:hover": { backgroundColor: "#8a6a31" },
          }}
        >
          Upload Image
        </Button>
      </label>
    </>
  );
}
