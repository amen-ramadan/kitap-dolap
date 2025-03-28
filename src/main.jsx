import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Home from "./pages/Home/Home.jsx";
import Blogs from "./pages/Blogs/Blogs.jsx";
import Favorites from "./pages/Favorites/Favorites.jsx";
import MyBooks from "./pages/MyBooks/MyBooks.jsx";
import MyBlogs from "./pages/MyBlogs/MyBlogs.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = false; // هنا يمكنك استبدالها بجلب قيمة JWT من state أو localStorage

//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* استثناء صفحات Login و Register من الـ Navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* جميع الصفحات الأخرى محمية بالـ JWT */}
      <Route path="/" element={<Navbar />}>
        <Route
          index
          element={
            // <ProtectedRoute>
            <Home />
            // </ProtectedRoute>
          }
        />
        <Route
          path="blogs"
          element={
            // <ProtectedRoute>
            <Blogs />
            // </ProtectedRoute>
          }
        />
        <Route
          path="favorites"
          element={
            // <ProtectedRoute>
            <Favorites />
            // </ProtectedRoute>
          }
        />
        <Route
          path="my-books"
          element={
            // <ProtectedRoute>
            <MyBooks />
            // </ProtectedRoute>
          }
        />
        <Route
          path="my-blogs"
          element={
            // <ProtectedRoute>
            <MyBlogs />
            // </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);
