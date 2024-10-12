import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import Cookies from "universal-cookie";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { LoginRequestDto } from "./dto/login_dto";
import { RegisterDto, RegisterResponseDto } from "./dto/register_dto";
import { GetQuizDto } from "./dto/quiz_dto";

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

  public async getWelcomeQuiz(): Promise<
    ClientResponse<GetQuizDto | undefined>
  > {
    try {
      const response: AxiosResponse<GetQuizDto> = await this.client.get(
        `/get_welcome_quiz`
      );

      console.log(response.data);
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
