import React, { useEffect, useState } from "react";
import { getLessons } from "../api";

const LessonsComponent = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      const lessonsData = await getLessons();
      setLessons(lessonsData);
    };

    fetchLessons();
  }, []);

  return (
    <div>
      <h1>Lessons</h1>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>{lesson.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LessonsComponent;
