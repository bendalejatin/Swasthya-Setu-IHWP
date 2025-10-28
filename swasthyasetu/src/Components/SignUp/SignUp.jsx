import React, { useState } from 'react';
import './SignUp.css';
import logo from "../Assets/greenlogo.svg";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const SignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    phone: '',
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
   const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  if (form.password !== form.confirm) {
    alert("Passwords do not match");
    return;
  }

  const userData = {
    name: form.name,
    email: form.email,
    password: form.password,
    phone: form.phone
  };

    try {
      const response = await axios.post('http://localhost:5000/signup', userData);
        alert('Account created successfully!');
        // Redirect to login or home page
        navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred while creating your account. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="signup-logo">
          <img src={logo} alt="logo" />
          <span>Swasthya Setu</span>
        </div>
        <img
          className="signup-img"
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Yoga on Beach"
        />
        <h2>Join Swasthya Setu</h2>
        <p>Start your wellness journey today</p>
      </div>
      <div className="signup-right">
        <div className="signup-box">
          <h2 className="signup-title">Create Account</h2>
          <p className="signup-subtitle">Please fill in your details to get started</p>
          <form onSubmit={handleSubmit} autoComplete="off">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <label>Password</label>
            <div className="signup-password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              {/* <span
                className="signup-eye"
                onClick={() => setShowPassword(p => !p)}
                title={showPassword ? "Hide password" : "Show password"}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? '🙈' : '👁️'}
              </span> */}
            </div>
            <label>Confirm Password</label>
            <div className="signup-password-wrapper">
              <input
                type={showConfirm ? 'text' : 'password'}
                name="confirm"
                placeholder="Confirm Password"
                value={form.confirm}
                onChange={handleChange}
                required
              />
              {/* <span
                className="signup-eye"
                onClick={() => setShowConfirm(c => !c)}
                title={showConfirm ? "Hide password" : "Show password"}
                style={{ cursor: "pointer" }}
              >
                {showConfirm ? '🙈' : '👁️'}
              </span> */}
            </div>
            <label>Phone Number (Optional)</label>
            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              value={form.phone}
              onChange={handleChange}
              maxLength={15}
            />
            <div className="signup-terms">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                required
              />
              <span>
                I agree to the <a href="w?">Terms of Service</a> and <a href="w?">Privacy Policy</a>
              </span>
            </div>
            <button
              className="signup-btn"
              type="submit"
              disabled={!form.agree}
            >
              Create Account
            </button>
          </form>
          <div className="signup-login">
            Already have an account? <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
