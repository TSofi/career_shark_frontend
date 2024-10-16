import React, { useState } from "react";
import { useApi } from "../api/ApiProvider";
import { Answers } from "../api/dto/quiz_dto";
import { useNavigate } from "react-router-dom";

type Choice = {
  option: string;
  text: string;
};

type Question = {
  question_text: string;
  choices: Choice[];
  correct_option: string;
};

type QuizProps = {
  courseId: string;
};

const Quiz: React.FC<QuizProps> = ({ courseId }) => {
  const apiClient = useApi();
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await apiClient.getCourseQuiz(courseId);
        if (response && response.data) {
          const formattedQuestions = response.data.questions.map((q: any) => ({
            ...q,
            correct_option: q.correct_option || "", // Ensure correct_option is present
          }));
          setQuestions(formattedQuestions);
        }
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
      }
    };

    fetchQuizData();
  }, [apiClient]);
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );

  const handleChange = (index: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("User's answers:", answers);
    const answersToGo = new Answers(answers);
    apiClient.postCourseQuizAnswers(courseId, answersToGo);
    navigate("/");
    // Handle form submission logic here
  };

  return (
    <div className="wrap">
      <div className="quiz">
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index} className="question">
              <p>{question.question_text}</p>
              <div className="choice-field">
                {question.choices.map((choice) => (
                  <label key={choice.option}>
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={choice.option}
                      checked={answers[index] === choice.option}
                      onChange={() => handleChange(index, choice.option)}
                    />
                    {choice.text}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Quiz;
