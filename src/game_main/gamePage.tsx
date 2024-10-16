import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./gamePage.css";
import CourseList from "../components/CourseList/CourseList";
import LogoutButton from "../components/LogoutButton";

const GamePage: React.FC = () => {
  const [showTable, setShowTable] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [difficultyLevel, setDifficultyLevel] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, level: number) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    setPopupPosition({
      top: buttonRect.bottom + 30, // Add padding on top and extra space below
      left: buttonRect.left + buttonRect.width / 2, // Center the popup horizontally
    });
    setDifficultyLevel(level);
    setShowTable(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setShowTable(false);
    }
  };

  useEffect(() => {
    if (showTable) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTable]);

  const handleLeaderboardClick = () => {
    navigate("/board");
  };

  const handleMyProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="game-page">
      <div className="top-bar">
        <button className="leaderboard-button" onClick={handleLeaderboardClick}>
          Leaderboards
        </button>
        <button className="my-profile-button" onClick={handleMyProfileClick}>
          My Profile
        </button>
        <LogoutButton />
      </div>
      <div className="button-container">
        {[...Array(9)].map((_, index) => (
          <button
            key={index}
            className={`round-button game-button game-button-${index}`}
            onClick={(event) => handleClick(event, index < 3 ? 0 : index < 6 ? 1 : 2)}
          >
            {index < 3 ? "Easy" : index < 6 ? "Medium" : "Hard"}
          </button>
        ))}
      </div>
      {showTable && difficultyLevel !== null && (
        <div
          className="popup"
          ref={popupRef}
          style={{
            top: popupPosition.top,
            left: popupPosition.left,
            position: "absolute",
          }}
        >
          <CourseList level={difficultyLevel} />
        </div>
      )}
    </div>
  );
};

export default GamePage;