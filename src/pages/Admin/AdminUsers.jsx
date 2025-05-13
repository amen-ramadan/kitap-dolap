// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   Grid,
//   Divider,
//   Alert,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@mui/material";
// import { useUserStore } from "../../store/modules/user/store";
// import useSnackbarStore from "../../store/snackStore";

// const AdminUsers = () => {
//   const { users, isLoading, fetchUsers } = useUserStore();
//   const { setOpenSnackbar } = useSnackbarStore();

//   const [open, setOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   const handleOpen = (user) => {
//     setSelectedUser(user);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setSelectedUser(null);
//     setOpen(false);
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteUser(selectedUser.id);
//       setOpenSnackbar("User deleted successfully", "success");
//       handleClose();
//     } catch (error) {
//       setOpenSnackbar("Failed to delete user", "error");
//     }
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h6" sx={{ mb: 2 }}>
//         Users
//       </Typography>
//       {isLoading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Grid container spacing={2}>
//           {users.map((user) => (
//             <Grid item xs={12} sm={6} md={4} key={user.id}>
//               <Paper sx={{ p: 2 }}>
//                 <Typography variant="h6">{user.name}</Typography>
//                 <Typography variant="body1">Email: {user.email}</Typography>
//                 <Typography variant="body1">Role: {user.role}</Typography>
//                 <Button variant="contained" color="error" onClick={() => handleOpen(user)}>
//                   Delete
//                 </Button>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default AdminUsers;

import React from "react";

export default function AdminUsers() {
  return <div>AdminUsers</div>;
}
