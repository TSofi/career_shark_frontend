export class GetUserDto {
  _id: string = "";
  email: string = "";
  DoB: string = "";
  nickname: string = "";
  role: string = "";
  lives: number = 0;
  points: number = 0;
  finished_courses: string[] = [];
}
