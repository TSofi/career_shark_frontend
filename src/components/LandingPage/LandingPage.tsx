import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">SharkKarrier</div>
        <div className="auth-buttons">
          <button
            className="login-button button"
            onClick={() => navigate("/login")} // Redirect to LoginPage
          >
            Log In
          </button>
          <button
            className="signup-button button"
            onClick={() => navigate("/signup")} // Redirect to SignUpPage
          >
            Sign Up
          </button>
        </div>
      </header>

      <div className="content">
        <h1 className="title">Welcome to Shark Carrier!</h1>
        <p className="description">
          New here? Take this test to choose your career path.
        </p>
        <button className="cta-button">Choose path</button>
      </div>
    </div>
  );
};

export default LandingPage;
