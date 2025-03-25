import { useState } from "react";
import "./Register.css";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button/Button";
import { Link } from "react-router";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate passwords match
  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    setLoading(true);
    setError("");

    console.log("Sending data:", formData);

    try {
      const response = await fetch(
        "https://localhost:9001/api/account/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify( formData ),
        }
      );

      const responseText = await response.text();
      console.log("Raw server response:", responseText);

      if (!response.ok) {
        try {
          const errorData = JSON.parse(responseText);
          console.error("Server error response:", errorData);
          throw new Error(
            errorData.message || "Registration failed. Please try again."
          );
        } catch (e) {
          console.error("Failed to parse error response:", e);
          throw new Error(responseText || "Registration failed. Please try again.");
        }
      }

      try {
        const data = JSON.parse(responseText);
        console.log("Registration successful:", data);
        alert("Account created successfully!");
      } catch {
        // console.error("Failed to parse success response:", e);
        alert("Account created successfully! (Non-JSON response)");
      }
    } catch (error) {
      console.error("Error registering:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <form onSubmit={handleSubmit}>
          <div className="inputs-group">
            <Logo height={50} />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
            />
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="User name in application"
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
            <input
              type="password"
              name="confirmPassword"
              minLength={8}
              maxLength={16}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
            {error && <p className="error-message">{error}</p>}
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        <span>OR</span>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;