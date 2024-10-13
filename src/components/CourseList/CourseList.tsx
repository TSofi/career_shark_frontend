import React, { useState, useEffect } from "react";
import { useApi } from "../../api/ApiProvider";
import { Course } from "../../api/dto/courses_dto";
import "./CourseList.css";
import CoursePage from "../../course/coursePage";

const CourseList: React.FC = () => {
  const apiClient = useApi();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await apiClient.getCourses(0); // Pass the level as an argument
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
  }, [apiClient]);

  useEffect(() => {
    console.log("Courses state:", courses);
  }, [courses]);

  return (
    <div className="course-list">
      {courses.length > 0 ? (
        courses.map((course) => (
          <div
            key={course._id}
            className={`course-item ${course.finished ? "finished" : ""}`}
            onClick={() => <CoursePage courseId={String(course._id)} />}
          >
            <a
              href={course.finished ? undefined : course.link_to_resources}
              className="course-link"
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
