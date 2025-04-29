import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import RemoveBlogDialog from "../dialog/RemoveBlogDialog";
import EditBlogDialog from "../dialog/EditBlogDialog";

export default function EditAndRemoveButtons({ blog }) {
  const [openRemove, setOpenRemove] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenRemove = () => setOpenRemove(true);
  const handleCloseRemove = () => setOpenRemove(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{ display: "flex", gap: "15px", marginLeft: "auto", zIndex: 9 }}
    >
      <Button
        variant="contained"
        sx={{
          width: "fit-content",
          height: "auto",
          padding: 1,
        }}
        color="primary"
        onClick={(e) => {
          e.stopPropagation();
          handleOpenEdit();
        }}
      >
        <EditIcon sx={{ fontSize: 20, marginRight: 1 }} />
        Edit
      </Button>
      <Button
        variant="contained"
        sx={{
          width: "fit-content",
          height: "auto",
          padding: 1,
          "&:hover": { backgroundColor: "darkred" },
        }}
        color="error"
        onClick={(e) => {
          e.stopPropagation();
          handleOpenRemove();
        }}
      >
        <DeleteIcon sx={{ fontSize: 20, marginRight: 1 }} />
        Remove
      </Button>
      <RemoveBlogDialog
        open={openRemove}
        onClose={handleCloseRemove}
        blog={blog}
      />
      <EditBlogDialog open={openEdit} onClose={handleCloseEdit} blog={blog} />
    </div>
  );
}
