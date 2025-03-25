import { useState } from "react";
import axios from "axios";
import "./Login.css";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button/Button";
import { Link } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://localhost:9001/api/account/authenticate",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Login successful:", response.data);
      alert("Login successful! (Check console for details)");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
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
