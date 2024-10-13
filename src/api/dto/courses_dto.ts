export class Course {
  _id: string = "";
  name: string = "";
  level: number = 0;
  description: string = "";
  img_url: string = "";
  link_to_resources: string = "";
  value_points: number = 0;
  finished: number = 0;
}

export class GetCoursesDto {
  courses: Course[] = [];
}