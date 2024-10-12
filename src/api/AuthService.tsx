import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  // Login method to interact with API
  login(username: string, password: string) {
    return axios
      .post(API_URL + "login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          // Store the JWT token and user info in localStorage
          localStorage.setItem("jwtToken", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        return response.data;
      })
      .catch((error) => {
        console.error("Login failed:", error);
        throw error;
      });
  }

  // Logout: Remove user and token from localStorage
  logout() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
  }

  // Get the current user from localStorage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user") || "{}");
  }
}

export default AuthService;
