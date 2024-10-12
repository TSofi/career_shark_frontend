import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginForm from "./login/loginForm";
import RegisterForm from "./register/registerForm";
import Quiz from "./quiz/Quiz";

const questions = [
  {
    question_text: "Do you enjoy working with databases?",
    choices: [
      { option: "a", text: "Yes, I love it" },
      { option: "b", text: "Not really" },
      { option: "c", text: "I can manage both frontend and backend tasks" },
    ],
    correct_option: "a",
  },
  {
    question_text: "Do you enjoy working with databases?",
    choices: [
      { option: "a", text: "Yes, I love it" },
      { option: "b", text: "Not really" },
      { option: "c", text: "I can manage both frontend and backend tasks" },
    ],
    correct_option: "a",
  },
  // Add other questions here
];

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/quiz"
          element={
            <Quiz
              name_of_test="Career Path Quiz"
              to_pass={0}
              num_of_questions={10}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
