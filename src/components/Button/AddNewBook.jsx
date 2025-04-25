import React from "react";
import AddIcon from "@mui/icons-material/Add";

export default function AddNewBook() {
  return (
    <button
      style={{
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
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <AddIcon sx={{ fontSize: 30 }} />
    </button>
  );
}
