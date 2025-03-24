import { useState } from "react";
import "./Login.css";
import Logo from "../../components/Logo/Logo";
import Button from "../../components/Button/Button";

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
            <Logo />
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
          Don't have an account? <a href="/register">Create a new account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
