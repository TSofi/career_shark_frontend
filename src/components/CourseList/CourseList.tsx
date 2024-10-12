import React, { useState, useEffect } from "react";
import { useApi } from "../../api/ApiProvider";
import "./CourseList.css";

type Course = {
  name: string;
  level: string;
  url: string;
  finished: number;
};

const CourseList: React.FC = () => {
  const apiClient = useApi();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await apiClient.getCourses(0); // Pass the level as an argument
        if (response && response.data) {
          setCourses(response.data.courses); // Access the courses array from the response
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, [apiClient]);

  return (
    <div className="course-list">
      {courses.map((course, index) => (
        <div
          key={index}
          className={`course-item ${course.finished ? "finished" : ""}`}
        >
          <a
            href={course.finished ? undefined : course.url}
            className="course-link"
          >
            <h3>{course.name}</h3>
            <p>Level: {course.level}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default CourseList;