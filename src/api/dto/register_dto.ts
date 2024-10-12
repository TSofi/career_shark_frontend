export class RegisterDto {
  email: string = "";
  nickname: string = "";
  DoB: string = "";
  password: string = "";
}

export type Role = "ROLE_ADMIN" | "ROLE_READER";

export class RegisterResponseDto {
  access_token: string = "";
  refresh_token: string = "";
}
