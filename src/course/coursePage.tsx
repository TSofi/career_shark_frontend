import React, { useEffect, useState } from "react";
import { useApi } from "../api/ApiProvider";
import { Course } from "../api/dto/courses_dto";
import "./coursePage.css";

const CoursePage: React.FC = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const apiClient = useApi();
  const courseId = "670a786d27a03f7de16f3114"; // Hardcoded course ID

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await apiClient.getCourse(courseId);
        if (response && response.data) {
          setCourse(response.data);
        } else {
          setError("No course data found");
        }
      } catch (error) {
        setError("Failed to fetch course data");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [apiClient, courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="course-page">
      {course ? (
        <div className="course-info">
          <h1>{course.name}</h1>
          {/*<p>{course.description}</p>*/}
          <p>Level: {course.level}</p>
          <a href={course.link_to_resources}>Course Resources</a>
          <button className="finish-course-button">Finish Course</button>
        </div>
      ) : (
        <div>No course information available</div>
      )}
    </div>
  );
};

export default CoursePage;