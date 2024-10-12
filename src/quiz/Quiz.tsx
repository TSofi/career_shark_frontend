import React, { useState } from "react";
import './Quiz.css';

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
  name_of_test: string;
  to_pass: number;
  num_of_questions: number;
  questions: Question[];
};

const Quiz: React.FC<QuizProps> = ({ name_of_test, questions }) => {
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(""));

  const handleChange = (index: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("User's answers:", answers);
    // Handle form submission logic here
  };

  return (
    <div className="wrap">
      <div className="quiz">
        <h1>{name_of_test}</h1>
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