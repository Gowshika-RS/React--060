// src/components/LoginPage.jsx
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password
  const navigate = useNavigate(); // Initialize navigate

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login validation logic here (e.g., check if username and password are valid)
    // For now, we directly navigate to the booking page
    if (username && password) {
      navigate("/bookingpage");
    } else {
      alert("Please enter username and password");
    }
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2 className="title">Letz googe to book!</h2>
        <form onSubmit={handleLogin}> {/* Add onSubmit handler */}
          <div className="input-container">
            <input
              type="text"
              placeholder="Username"
              className="input"
              required
              value={username} // Set value to username state
              onChange={(e) => setUsername(e.target.value)} // Update username state
            />
          </div>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input"
              required
              value={password} // Set value to password state
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
            <span
              className="eye-icon"
              onClick={togglePasswordVisibility}
              role="button"
              tabIndex={0}
              onKeyPress={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className="button">
            Login
          </button>
        </form>
        <div className="signup-link">
          <p>
            <Link to="/signup"> Don't have an account? Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
