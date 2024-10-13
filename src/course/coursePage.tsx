import React, { useEffect, useState } from "react";
import Quiz from "./courseTest";

interface GetCourseDto {
  id: number;
  link: string;
}

interface CoursePageProps {
  courseId: string;
}

const CoursePage: React.FC<CoursePageProps> = ({ courseId }) => {
  const [course, setCourse] = useState<GetCourseDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${courseId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch course information");
        }
        const data: GetCourseDto = await response.json();
        setCourse(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {course ? (
        <div>
          <h1>Course Information</h1>
          <p>{course.link}</p>
        </div>
      ) : (
        <div>No course information available</div>
      )}
      <Quiz courseId={courseId} />
    </div>
  );
};

export default CoursePage;
