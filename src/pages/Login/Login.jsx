import { useState } from "react";
import useAuthStore from "../../store/authStore";
import "./Login.css";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Admin shortcut
    if (
      formData.email === "admin@admin.com" &&
      formData.password === "adminadmin"
    ) {
      setUser({ email: "admin@admin.com", role: "admin" });
      navigate("/admin");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://localhost:9001/api/account/authenticate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      // Handle non-200 responses
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed. Please try again.");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      setUser(data);
      navigate("/");
      alert("Login successful! (Check console for details)");
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <form onSubmit={handleSubmit}>
          <div className="inputs-group">
            <Logo height={70} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your e-mail"
              required
            />

            <input
              type="password"
              name="password"
              minLength={8}
              maxLength={16}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <span>OR</span>
        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/register">Create a new account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
