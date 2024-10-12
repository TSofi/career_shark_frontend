import { useEffect, useState } from "react";
import useQuizData from "./quizData";

// https://github.com/Kalutu/quiz-app/blob/main/src/App.js
export default function QuizForm() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const { data, fetchQuizData, loading, error } = useQuizData();

  useEffect(() => {
    fetchQuizData();
  }, [fetchQuizData]);

  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowNextButton(false);
    showQuestion(0);
  };

  const questions = data?.questions;

  const showQuestion = (index) => {
    resetState();
    let currentQuestion = questions[index];
    let questionNumber = index + 1;
    setQuestionText(`${questionNumber}. ${currentQuestion.question}`);
    const shuffledChoices = shuffle(currentQuestion.choices);
    setChoices(shuffledChoices);
    setCorrectAnswer(
      currentQuestion.choices.findIndex((choice) => choice.answer === true)
    );
  };

  const resetState = () => {
    setChoices([]);
    setCorrectAnswer(null);
    setSelectedAnswer(null);
  };

  const selectChoice = (isCorrect, index) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    setSelectedAnswer(index);
    setShowNextButton(true);
  };

  const handleNextButton = () => {
    setShowNextButton(false);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

    if (currentQuestionIndex < questions.length - 1) {
      showQuestion(currentQuestionIndex + 1);
    } else {
      // If it's the last question, show the score
      showScore();
    }
  };

  const showScore = () => {
    resetState();
    setQuestionText(`You scored ${score} out of ${questions.length}!`);
  };

  useEffect(() => {
    startQuiz();
  }, []);

  return (
    <div className="app">
      <h1>Simple Quiz</h1>
      <div className="quiz">
        <h2 id="question">{data?.questions.question_text}</h2>
        <div id="answer-buttons">
          {choices.map((choice, index) => (
            <button
              key={index}
              className={`btn ${
                selectedAnswer === index
                  ? choice.answer
                    ? "correct"
                    : "incorrect"
                  : ""
              }`}
              onClick={() => selectChoice(choice.answer, index)}
              aria-label={choice.text}
              disabled={selectedAnswer !== null}
            >
              {choice.text}
            </button>
          ))}
        </div>
        {showNextButton && (
          <button id="next-button" onClick={handleNextButton}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
