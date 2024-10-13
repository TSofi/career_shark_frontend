import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../api/ApiProvider";
import { Course } from "../api/dto/courses_dto";
import Quiz from "../quiz/Quiz";
import "./CourseViewPage.css";

const CourseViewPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const apiClient = useApi();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        console.error("Course ID is undefined");
        return;
      }

      try {
        const response = await apiClient.getCourse(courseId);
        if (response && response.data) {
          setCourse(response.data);
        } else {
          console.log("No data in response");
        }
      } catch (error) {
        console.error("Failed to fetch course:", error);
      }
    };

    fetchCourse();
  }, [apiClient, courseId]);

  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <div className="course-view-page">
      <div className="course-details">
        <h2>{course.name}</h2>
        <p>Level: {course.level}</p>
        {/* Add more course details as needed */}
      </div>
      <div className="course-quiz">
        <Quiz
          name_of_test="Course Quiz"
          to_pass={0}
          num_of_questions={10}
        />
      </div>
    </div>
  );
};

export default CourseViewPage;