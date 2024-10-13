import React, { useEffect, useState } from "react";
import { GetUserDto } from "../api/dto/user_dto";
import { useApi } from "../api/ApiProvider";
import "./my_profile.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const MyProfile: React.FC = () => {
  const [user, setUser] = useState<GetUserDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiClient = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await apiClient.getMe();
        if (response && response.data) {
          console.log("API Response:", response.data);
          setUser(response.data || null);
        } else {
          console.log("No data in response");
        }
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch courses");
        console.error("Failed to fetch courses:", error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [apiClient]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-body">
      <div className="profile-container"></div>
      <div className="profile-icon">
        <AccountCircleIcon style={{ fontSize: 100 }} />
      </div>
      <div className="profile-details">
        <p>
          <strong>Email:</strong> {user!.email}
        </p>
        <p>
          <strong>Date of Birth:</strong> {user!.DoB}
        </p>
        <p>
          <strong>Nickname:</strong> {user!.nickname}
        </p>
        <p>
          <strong>Lives:</strong> {user!.lives}
        </p>
        <p>
          <strong>Points:</strong> {user!.points}
        </p>
        <p>
          <strong>Finished Courses:</strong> {user!.finished_courses.length}
        </p>
      </div>
      <button onClick={() => navigate("/game")}>Go to Game</button>
    </div>
  );
};

export default MyProfile;
