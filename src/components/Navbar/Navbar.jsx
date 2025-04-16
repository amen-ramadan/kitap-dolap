import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";
import { NavLink, Outlet } from "react-router";
import Logo from "../Logo/Logo";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1d6594ba" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 3,
          }}
        >
          {/* Left Side - User Icon */}
          <Box sx={{ marginLeft: 3 }}>
            <Logo width={150} height={40} />
          </Box>

          {/* Center - Navigation Buttons */}
          <Box sx={{ display: "flex", gap: 3 }}>
            {["/", "/Blogs", "/Favorites", "/My Listings", "/My Blogs"].map(
              (path, index) => (
                <Button
                  key={index}
                  component={NavLink}
                  to={path}
                  color="inherit"
                  sx={{
                    fontSize: 18,
                    textTransform: "none",
                    position: "relative",
                    "&.active": {
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        width: "100%",
                        height: "2px",
                        bottom: 0,
                        left: 0,
                        backgroundColor: "white",
                      },
                    },
                  }}
                >
                  {path === "/" ? "Home" : path.replace("/", "")}
                </Button>
              )
            )}
          </Box>

          {/* Right Side - Logo */}
          <Box sx={{ marginRight: 3 }}>
            <IconButton
              color="inherit"
              onClick={handleMenu}
              sx={{
                padding: 0,
                borderRadius: "50%",
                width: 40,
                height: 40,
                "&:hover": { backgroundColor: "transparent" },
              }}
            >
              <AccountCircle fontSize="medium" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Navbar;
