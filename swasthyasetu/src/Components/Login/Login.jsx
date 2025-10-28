import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import logo from "../Assets/greenlogo.svg"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password
      });
        // Save token (optional)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        alert("Login successful!");
        navigate("/"); // Navigate to home/dashboard
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-logo">
          <img
            src={logo}
            alt="logo"
          />
          <span>Swasthya Setu</span>
        </div>
        <img
          className="login-img"
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Yoga on Beach"
        />
        <h2>Welcome to Swasthya Setu !!</h2>
        <p>Your bridge to holistic wellness</p>
      </div>
      <div className="login-right">
        <div className="login-box">
          <h2 className="login-title">Login</h2>
          <p className="login-subtitle">
            Welcome back! Please enter your details
          </p>
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <div className="login-password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* <span
                className="login-eye"
                onClick={() => setShowPassword((p) => !p)}
                title={showPassword ? "Hide password" : "Show password"}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span> */}
            </div>
            <div className="login-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="w?" className="login-forgot">
                Forgot password?
              </a>
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
          {/* <div className="login-divider">Or continue with</div>
          <div className="login-socials">
            <button type="button">
              <img
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="Google"
              />
            </button>
            <button type="button">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png"
                alt="Facebook"
              />
            </button>
            <button type="button">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/mac-os.png"
                alt="Apple"
              />
            </button>
          </div> */}
          <div className="login-signup">
            Don't have an account? <a href="/signup">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
