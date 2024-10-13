import React, { useState, useEffect } from "react";
import { useApi } from "../api/ApiProvider";
import { Answers, GetQuizDto } from "../api/dto/quiz_dto";
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

type CourseQuizProps = {
  courseId: string;
};

const CourseQuiz: React.FC<CourseQuizProps> = ({ courseId }) => {
  const apiClient = useApi();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await apiClient.getCourseQuiz(courseId);
        if (response && response.data) {
          const formattedQuestions = response.data.questions.map((q: any) => ({
            ...q,
            correct_option: q.correct_option || "", // Ensure correct_option is present
          }));
          setQuestions(formattedQuestions);
          setAnswers(Array(formattedQuestions.length).fill(""));
        }
      } catch (error) {
        console.error("Failed to fetch quiz data:", error);
      }
    };

    fetchQuizData();
  }, [apiClient, courseId]);

  const handleChange = (index: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("User's answers:", answers);

    // Convert all answers to lowercase
    const lowercaseAnswers = answers.map(answer => answer.toLowerCase());
    console.log("Lowercase answers:", lowercaseAnswers); // Log to verify conversion

    const answersToGo = new Answers(lowercaseAnswers);

    try {
      const response = await apiClient.postCourseQuizAnswers(courseId, answersToGo);
      if (response.success && response.data) {
        alert(response.data.message);
      } else {
        alert("Failed to submit answers.");
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("An error occurred while submitting your answers.");
    }

    navigate("/game");
  };

  return (
    <div className="wrap">
      <div className="quiz">
        <h1>Course Quiz</h1>
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
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default CourseQuiz;