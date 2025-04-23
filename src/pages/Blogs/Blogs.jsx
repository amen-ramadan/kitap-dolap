import React, { useEffect, useState } from "react";
import { useBlogsStore } from "../../store/modules/blogs/store";
import {
  Box,
  Grid,
  Typography,
  Modal,
  Fade,
  Backdrop,
  Paper,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const overlayBg = "#1d659433";

export default function BlogsPage() {
  const { blogs, fetchBlogs, isLoading } = useBlogsStore();
  const [openBlog, setOpenBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleOpen = (blog) => {
    setOpenBlog(blog);
  };

  const handleClose = () => {
    setOpenBlog(null);
  };

  return (
    <Box sx={{ minHeight: "100vh", width: "100%" }}>
      {isLoading ? (
        <Typography variant="h4" align="center" gutterBottom>
          Loading...
        </Typography>
      ) : (
        <div>
          <Typography variant="h4" align="center">
            Our Blogs
          </Typography>

          <Grid
            container
            spacing={4}
            sx={{
              mt: 2,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {blogs.map((blog) => (
              <Grid key={blog.id} sx={{ width: "46%" }}>
                <Paper
                  onClick={() => handleOpen(blog)}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "start",
                    backgroundColor: overlayBg,
                    color: "#fff",
                    height: "200px",
                    position: "relative",
                  }}
                >
                  <Typography variant="h6" align="center">
                    {blog.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    align="center"
                    color="#ccc"
                    sx={{
                      my: 6,
                      flexGrow: 1,
                      textAlign: "center",
                      alignSelf: "center",
                    }}
                  >
                    {blog.content.length > 100
                      ? blog.content.slice(0, 100) + "..."
                      : blog.content}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="info"
                    sx={{ position: "absolute", bottom: 8, right: 8 }}
                  >
                    @ {blog.writerBlogName}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Modal for full blog */}
          <Modal
            open={!!openBlog}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500 }}
          >
            <Fade in={!!openBlog}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "95%",
                  boxShadow: 24,
                  p: 4,
                  backgroundColor: "#fff",
                  color: "black",
                  borderRadius: "10px",
                  // maxHeight: "80vh",
                  overflowY: "auto",
                }}
              >
                <IconButton
                  onClick={handleClose}
                  sx={{ position: "absolute", top: 8, right: 8, color: "red" }}
                >
                  <CloseIcon />
                </IconButton>

                <Typography
                  variant="h5"
                  gutterBottom
                  align="center"
                  color="primary"
                >
                  {openBlog?.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mt: 2,
                    whiteSpace: "pre-line",
                    lineHeight: 1.8,
                    textAlign: "center",
                    color: "#555",
                  }}
                >
                  {openBlog?.content}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="info"
                  align="right"
                  sx={{ mt: 3 }}
                >
                  @ {openBlog?.writerBlogName}
                </Typography>
              </Box>
            </Fade>
          </Modal>
        </div>
      )}
    </Box>
  );
}
