import React from 'react';

const Level = () => {
  return (
    <div className="level">
      <p className="level-name">
        Novice Memer
      </p>
      <div className="level-container"  current-level="1" next-level="2">
        <svg height="25px" width="200px" className="level-bar">
          <rect x="0" y="0" rx="5" ry="5" style={{
            height: "25px",
            width: "200px",
            fill: "b3e5fc"
          }}
          className="level-bar-container" />
          <rect x="0" y="0" rx="5" ry="5" style={{
            height: "25px",
            width: "50px",
            fill: "0277bd",
          }}
          className="level-bar-value"/>
        </svg>
      </div>
    </div>
  );
};

export default Level;