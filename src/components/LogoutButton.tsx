import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt"); // Clear the JWT from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <Button variant="outlined" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;