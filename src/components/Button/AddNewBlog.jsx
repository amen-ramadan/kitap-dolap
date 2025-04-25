import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import AddBlogDialog from "../dialog/AddBlogDialog";

export default function AddNewBlog() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Box
        component="button"
        sx={{
          position: "fixed",
          bottom: "30px",
          right: "22px",
          width: "70px",
          height: "70px",
          borderRadius: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
          backgroundColor: "#c69746",
          border: "none",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#8a6a31",
          },
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleOpen();
        }}
      >
        <AddIcon sx={{ fontSize: 30 }} />
      </Box>
      <AddBlogDialog open={open} onClose={handleClose} />
    </>
  );
}
