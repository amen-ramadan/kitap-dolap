import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import RemoveBookDialog from "../dialog/RemoveBookDialog";
import EditBookDialog from "../dialog/EditBookDialog";

export default function EditAndRemoveButtons({ book }) {
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
      <RemoveBookDialog
        open={openRemove}
        onClose={handleCloseRemove}
        book={book}
      />
      <EditBookDialog open={openEdit} onClose={handleCloseEdit} book={book} />
    </div>
  );
}
