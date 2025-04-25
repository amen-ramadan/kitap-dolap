import React from "react";
import { Typography, Box } from "@mui/material";
import AddNewBlog from "../../components/Button/AddNewBlog";

export default function MyBlogs() {
  return (
    <>
      <Typography variant="h4" align="center" sx={{ mb: 4, color: "#c69746" }}>
        My Blogs
      </Typography>
      <Box></Box>
      <AddNewBlog />
    </>
  );
}
