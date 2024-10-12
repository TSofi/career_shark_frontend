export class GetQuizDto {
  name_of_test: string = "";
  to_pass: number = 0;
  num_of_questions: number = 0;
  questions: Question[] = [];
}

export class Question {
  question_text: string = "";
  choices: Choice[] = [];
}

export class Choice {
  option: string = "";
  text: string = "";
}
