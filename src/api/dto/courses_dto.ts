export class GetCoursesDto {
  courses: Course[] = [];
}

export class Course {
  name: string = "";
  level: string = "";
  url: string = "";
  finished: number = 0;
}