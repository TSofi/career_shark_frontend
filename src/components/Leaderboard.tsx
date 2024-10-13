import React, { useEffect, useState } from "react";
import { Client, LeaderboardUser } from "../api/client";
import "./Leaderboard.css";

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const client = new Client();
      const response = await client.getUsersLeaderboard();

      if (response.success && response.data) {
        setUsers(response.data);
      } else {
        setError("Failed to fetch leaderboard");
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            <span className={'usernames'}>{user.nickname}</span>
            <span className="label">Points:</span> <span>{user.score}</span>
            <span className="label">Courses:</span> <span>{user.courses.length}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;