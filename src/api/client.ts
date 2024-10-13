import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import Cookies from "universal-cookie";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { LoginRequestDto } from "./dto/login_dto";
import { RegisterDto, RegisterResponseDto } from "./dto/register_dto";
import { Answers, GetQuizDto } from "./dto/quiz_dto";
import { Course, GetCoursesDto } from "./dto/courses_dto";
import { GetUserDto } from "./dto/user_dto";

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  status: number;
};

interface RoleJwtPayload extends JwtPayload {
  role?: string;
}

export interface LeaderboardUser {
  user_id: string;
  nickname: string;
  score: number;
  courses: string[];
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

  public async getMe(): Promise<ClientResponse<GetUserDto | undefined>> {
    try {
      const response: AxiosResponse<GetUserDto> = await this.client.get(
        "/get_me"
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

  public async postWelcomeQuizAnswers(
    data: Answers
  ): Promise<ClientResponse<string | undefined>> {
    try {
      const response: AxiosResponse<string> = await this.client.post(
        `/post_welcome_quiz_answers`,
        data
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

  public async getCourseQuiz(
    lesson_id: string
  ): Promise<ClientResponse<GetQuizDto | undefined>> {
    try {
      const response: AxiosResponse<GetQuizDto> = await this.client.get(
        `/lessons/${lesson_id}/quiz`
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

  public async postCourseQuizAnswers(
    lesson_id: string,
    data: Answers
  ): Promise<ClientResponse<GetQuizDto | undefined>> {
    try {
      const response: AxiosResponse<GetQuizDto> = await this.client.post(
        `/lessons/${lesson_id}/quiz`,
        data
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

  public async getCourse(
    course_id: string
  ): Promise<ClientResponse<Course | undefined>> {
    try {
      const response: AxiosResponse<Course> = await this.client.get(
        `/course/${course_id}`
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

  public async getCourses(
    level: number
  ): Promise<ClientResponse<Course[] | undefined>> {
    try {
      const response: AxiosResponse<Course[]> = await this.client.get(
        `/lessons/level/${level}`
      );

      console.log("API Response:", response.data);
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

  public async getUsersLeaderboard(): Promise<
    ClientResponse<LeaderboardUser[] | undefined>
  > {
    try {
      const response: AxiosResponse<LeaderboardUser[]> = await this.client.get(
        `/leaderboard`
      );

      console.log("API Response:", response.data);
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
