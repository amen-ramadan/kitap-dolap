import React, { useEffect } from "react";
import { useBlogsStore } from "../../store/modules/blogs/store";
import { Box, Paper, Typography } from "@mui/material";
import { useAdminStore } from "../../store/modules/admin/store";
const overlayBg = "#1d659433";

const AdminBlogs = () => {
  const { blogs, fetchBlogs, isLoading } = useBlogsStore();
  const { delete: deleteBlog } = useAdminStore();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = async (id) => {
    await deleteBlog(id);
    fetchBlogs(); // Refresh after delete
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Blogs Management
      </Typography>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box sx={{ width: "100%" }}>
          {blogs.map((blog) => (
            <Paper
              key={blog.id}
              sx={{
                p: 2,
                mb: 2,
                backgroundColor: overlayBg,
                color: "#fff",
                position: "relative",
              }}
            >
              <Typography variant="h6">{blog.title}</Typography>
              <Typography variant="body2" sx={{ my: 2, color: "#ccc" }}>
                {blog.content?.length > 100
                  ? blog.content.slice(0, 100) + "..."
                  : blog.content}
              </Typography>
              <Typography variant="caption">
                @ {blog.writerBlogName || blog.author}
              </Typography>
              <button
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: "#d32f2f",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  padding: "4px 10px",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(blog.id)}
              >
                Delete
              </button>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AdminBlogs;
