import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import Cookies from "universal-cookie";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { LoginRequestDto } from "./dto/login_dto";
import { RegisterDto, RegisterResponseDto } from "./dto/register_dto";

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  status: number;
};

interface RoleJwtPayload extends JwtPayload {
  role?: string;
}

export class Client {
  private baseUrl = "https://career-shark-backend.onrender.com";
  private client: AxiosInstance;
  private token: string | null = null;
  private cookies = new Cookies();

  constructor() {
    this.client = axios.create({
      baseURL: this.baseUrl,
    });

    this.client.interceptors.request.use((config) => {
      const token = this.cookies.get("token");
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  public async login(
    data: LoginRequestDto
  ): Promise<ClientResponse<undefined | Error>> {
    try {
      const response: AxiosResponse = await this.client.post("/login", data);

      const decoded = jwtDecode<JwtPayload>(response.data.access_token);
      console.log(decoded);

      if (decoded.exp) {
        this.cookies.set("token", response.data.access_token, {
          expires: new Date(decoded.exp * 1000),
        });
      }
      return {
        success: true,
        data: undefined,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: axiosError.response?.data,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public logout(): void {
    this.cookies.remove("token");
  }

  public async register(
    data: RegisterDto
  ): Promise<ClientResponse<RegisterResponseDto | undefined>> {
    try {
      const response: AxiosResponse<RegisterResponseDto> =
        await this.client.post("/register", data);

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: undefined,
        status: axiosError.response?.status || 0,
      };
    }
  }
}
// import axios from "axios";

// const API_URL = "http://localhost:8080/api/auth/";

// class AuthService {
//   // Login method to interact with API
//   login(username: string, password: string) {
//     return axios
//       .post(API_URL + "login", {
//         username,
//         password,
//       })
//       .then((response) => {
//         if (response.data.token) {
//           // Store the JWT token and user info in localStorage
//           localStorage.setItem("jwtToken", response.data.token);
//           localStorage.setItem("user", JSON.stringify(response.data.user));
//         }
//         return response.data;
//       })
//       .catch((error) => {
//         console.error("Login failed:", error);
//         throw error;
//       });
//   }

//   // Logout: Remove user and token from localStorage
//   logout() {
//     localStorage.removeItem("jwtToken");
//     localStorage.removeItem("user");
//   }

//   // Get the current user from localStorage
//   getCurrentUser() {
//     return JSON.parse(localStorage.getItem("user") || "{}");
//   }
// }

// export default AuthService;
