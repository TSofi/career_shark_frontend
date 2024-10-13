import React, { useEffect, useState } from "react";
import Quiz from "./courseTest";
import { useApi } from "../api/ApiProvider";
import { Course } from "../api/dto/courses_dto";

interface CoursePageProps {
  courseId: string;
}

const CoursePage: React.FC<CoursePageProps> = ({ courseId }) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const apiClient = useApi();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await apiClient.getCourse(courseId);
        if (response && response.data) {
          setCourse(response.data);
        }
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch course data");
        setLoading(false);
      }
    };

    fetchCourse();
  }, [apiClient, courseId]);

  return (
    <div>
      {course ? (
        <div>
          <h1>Course Information</h1>
          <p>{course.link_to_resources}</p>
        </div>
      ) : (
        <div>No course information available</div>
      )}
      <Quiz courseId={courseId} />
    </div>
  );
};

export default CoursePage;
