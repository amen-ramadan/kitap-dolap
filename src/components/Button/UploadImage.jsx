import React from "react";
import { Button } from "@mui/material";
import { useBooksStore } from "../../store/modules/books/store";

export default function UploadImage({ setBook }) {
  const { uploadBookImage } = useBooksStore();
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // "file" هو اسم المفتاح الذي يتوقعه الـ API

    try {
      // رفع الصورة والحصول على الروابط من الـ API
      const response = await uploadBookImage(formData);
      // تحديث الـ state في المكون الأب
      setBook((prevBook) => ({
        ...prevBook,
        imageUrl: response.data.imageUrl,
        previewUrl: response.data.previewUrl,
      }));
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
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
