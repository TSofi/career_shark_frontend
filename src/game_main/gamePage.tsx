import React, { useState } from "react";
// import "./gamePage.css";

const GamePage: React.FC = () => {
  const [showTable, setShowTable] = useState(false);

  const handleClick = () => {
    setShowTable(true);
  };

  return (
    <div className="game-page">
      <div className="button-container">
        {[...Array(6)].map((_, index) => (
          <button
            key={index}
            className={`round-button button-${index}`}
            onClick={handleClick}
          >
            Button {index + 1}
          </button>
        ))}
      </div>
      {showTable && (
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
      )}
    </div>
  );
};

export default GamePage;
