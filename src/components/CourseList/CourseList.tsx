import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../api/ApiProvider";
import { Course } from "../../api/dto/courses_dto";
import "./CourseList.css";

interface CourseListProps {
  level: number;
}

const CourseList: React.FC<CourseListProps> = ({ level }) => {
  const apiClient = useApi();
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await apiClient.getCourses(level); // Pass the level as an argument
        if (response && response.data) {
          console.log("API Response:", response.data);
          setCourses(response.data || []); // Ensure courses is an array
        } else {
          console.log("No data in response");
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    fetchCourses();
  }, [apiClient, level]);

  useEffect(() => {
    console.log("Courses state:", courses);
  }, [courses]);

  const handleCourseClick = (courseId: string) => {
    console.log("Clicked course ID:", courseId);
    localStorage.setItem("selectedCourseId", courseId); // Store the course ID in local storage
    navigate(`/course/${courseId}`); // Navigate to the course detail page
  };

  return (
    <div className="course-list">
      {courses.length > 0 ? (
        courses.map((course) => (
          <div
            key={course._id}
            className={`course-item ${course.finished ? "finished" : ""}`}
            onClick={() => handleCourseClick(course._id)}
          >
            <a
              href={course.finished ? undefined : course.link_to_resources}
              className="course-link"
              onClick={(e) => e.preventDefault()} // Prevent navigation to the course link
            >
              <h3>{course.name}</h3>
              <p>Level: {course.level}</p>
            </a>
          </div>
        ))
      ) : (
        <p>No courses available</p>
      )}
    </div>
  );
};

export default CourseList;