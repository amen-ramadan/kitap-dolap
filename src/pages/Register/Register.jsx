import { useState } from "react";
import "./Register.css";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button/Button";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePasswords()) return;

    // Send data to API
    console.log("Sending data to API:", formData);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <form onSubmit={handleSubmit}>
          <div className="inputs-group">
            <Logo height={50} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
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

          <Button type="submit">Register</Button>
        </form>

        <span>OR</span>
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
