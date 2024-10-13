import React, { useEffect, useRef, useState } from "react";
import "./gamePage.css";

const GamePage: React.FC = () => {
  const [showTable, setShowTable] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    setPopupPosition({
      top: buttonRect.bottom,
      left: buttonRect.left,
    });
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

  return (
    <div className="game-page">
      <div className="button-container">
        {[...Array(7)].map(
          (
            _,
            index // Changed 6 to 7
          ) => (
            <button
              key={index}
              className={`round-button game-button game-button-${index}`}
              onClick={handleClick}
            >
              Button {index + 1}
            </button>
          )
        )}
      </div>
      {showTable && (
        <div
          className="popup"
          ref={popupRef}
          style={{
            top: popupPosition.top,
            left: popupPosition.left,
            position: "absolute",
          }}
        >
          <table className="game-table">
            <thead>
              <tr>
                <th>Header 1</th>
                <th>Header 2</th>
                <th>Header 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Data 1</td>
                <td>Data 2</td>
                <td>Data 3</td>
              </tr>
              <tr>
                <td>Data 4</td>
                <td>Data 5</td>
                <td>Data 6</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GamePage;
