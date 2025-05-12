import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Divider,
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import useAuthStore from "../../store/authStore";
import { useUserStore } from "../../store/modules/user/store";
import "./Profile.css";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();
  const {
    userData,
    useUserProfileQuery,
    useUpdateProfileMutation,
    useDeleteAccountMutation,
  } = useUserStore();

  // Fetch user data
  useUserProfileQuery();

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
  });

  // Update operation
  const updateMutation = useUpdateProfileMutation();

  // Delete account operation
  const deleteMutation = useDeleteAccountMutation();

  // Dialog state for delete confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Update form when user data is loaded
  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        userName: userData.userName || "",
        email: userData.email || "",
      });
    }
  }, [userData]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation(formData);
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    deleteMutation();
    setDeleteDialogOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    useAuthStore.getState().clearUser();
    navigate("/login");
  };

  if (updateMutation.isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (updateMutation.isError) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error loading profile: {updateMutation.error.message}
      </Alert>
    );
  }

  return (
    <Box
      className="profile-container"
      sx={{ py: 4, maxWidth: 800, mx: "auto" }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}
        >
          My Profile
        </Typography>

        {updateMutation.isSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Profile updated successfully!
          </Alert>
        )}

        {updateMutation.isError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Error updating profile: {updateMutation.error.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                variant="outlined"
                required
                inputProps={{ minLength: 6 }}
                helperText="Username must be at least 6 characters"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={updateMutation.isLoading}
                sx={{ mt: 2 }}
              >
                {updateMutation.isLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button variant="outlined" color="primary" onClick={handleLogout}>
            Logout
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={() => setDeleteDialogOpen(true)}
          >
            Delete Account
          </Button>
        </Box>
      </Paper>

      {/* Delete Account Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be
            undone and all your data will be permanently removed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAccount}
            color="error"
            variant="contained"
            disabled={deleteMutation.isLoading}
          >
            {deleteMutation.isLoading ? (
              <CircularProgress size={24} />
            ) : (
              "Delete Account"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
