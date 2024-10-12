// api.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

export const loginUser = async (username, password) => {
  try {
    const response = await instance.post("/api/auth/login", {
      username,
      password,
    });
    if (response.data) {
      const { token, userId } = response.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userId", userId);
    }
    return response.data;
  } catch (error) {
    console.error("Error logging in", error);
    return null;
  }
};

export const registerUser = async (nickname, email, password, dob) => {
  try {
    const response = await instance.post("/api/auth/register", {
      nickname,
      email,
      password,
      dob,
    });

    if (response.data) {
      const { token, userId } = response.data;
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userId", userId);
    }

    return response.data;
  } catch (error) {
    console.error("Error registering user", error);
    return null;
  }
};

export default loginUser;
