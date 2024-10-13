import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../api/ApiProvider";
import { Course } from "../api/dto/courses_dto";
import CourseQuiz from "../course_quiz/CoruseQuiz";
import "./CourseViewPage.css";

const CourseViewPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const apiClient = useApi();
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const id = courseId || "";
      if (!id) {
        console.error("Course ID is undefined");
        return;
      }

      try {
        const response = await apiClient.getCourse(id);
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

  const difficultyLevels = ["Easy", "Medium", "Hard"];

  return (
    <div className="course-view-page">
      <div className="course-details">
        <img src={course.img_url} alt={course.name} className="course-image" />
        <h2 className="course-name">{course.name}</h2>
        <p className="course-description">{course.description}</p>
        <p className="course-resources">
          Resources: <a href={course.link_to_resources}>{course.link_to_resources}</a>
        </p>
        <p className="course-points">Value in points: {course.value_points}</p>
        <div className="difficulty-bar">
          <div
            className="difficulty-level"
            style={{ height: `${(course.level + 1) * 33.33}%` }}
          >
            {difficultyLevels[course.level]}
          </div>
        </div>
      </div>
      <div className="course-quiz">
        <CourseQuiz courseId={courseId || ""} />
      </div>
    </div>
  );
};

export default CourseViewPage;