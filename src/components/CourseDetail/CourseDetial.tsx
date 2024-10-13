import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../api/ApiProvider";
import { Course } from "../../api/dto/courses_dto";

const CourseDetail: React.FC = () => {
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
          console.log("API Response:", response.data);
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
    <div className="course-detail">
      <h2>{course.name}</h2>
      <p>Level: {course.level}</p>
      {/*<p>{course.description}</p>*/}
      {/* Add more course details as needed */}
    </div>
  );
};

export default CourseDetail;