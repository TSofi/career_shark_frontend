import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginForm from "./login/loginForm";
import RegisterForm from "./register/registerForm";
import Quiz from "./quiz/Quiz";
import CourseList from "./components/CourseList/CourseList";
import GamePage from "./game_main/gamePage";
import Leaderboard from "./components/Leaderboard";
import MyProfile from "./components/my_profile";
import ApiProvider from "./api/ApiProvider";
import CourseDetail from "./components/CourseDetail/CourseDetial";

const App = () => {
  return (
    <ApiProvider>
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
          <Route path="/game" element={<GamePage />} />
          <Route path="/board" element={<Leaderboard />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
        </Routes>
      </Router>
    </ApiProvider>
  );
};

export default App;