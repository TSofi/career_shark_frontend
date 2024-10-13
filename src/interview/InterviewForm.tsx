import React, { useState } from "react";
import axios from "axios";
import "./InterviewForm.css";

const InterviewForm: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  const fetchQuestion = async () => {
    try {
      const result = await axios.get("/get_interview_question");
      setQuestion(result.data.question);
    } catch (error) {
      console.error("Failed to fetch question:", error);
    }
  };

  const submitResponse = async () => {
    try {
      const result = await axios.post("/get_interview_response", {
        question,
        response,
      });
      setFeedback(result.data.feedback);
    } catch (error) {
      console.error("Failed to submit response:", error);
    }
  };

  return (
    <div className="interview-form">
      <button onClick={fetchQuestion}>Get Interview Question</button>
      {question && <p>{question}</p>}
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="Your response"
      />
      <button onClick={submitResponse}>Submit Response</button>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default InterviewForm;