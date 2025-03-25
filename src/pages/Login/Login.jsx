import { useState } from "react";
import "./Login.css";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button/Button";
import { Link } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <form onSubmit={handleSubmit}>
          <div className="inputs-group">
            <Logo height={70} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your e-mail"
              required
            />

            <input
              type="password"
              minLength={8}
              maxLength={16}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <Button type="submit">Login</Button>
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
