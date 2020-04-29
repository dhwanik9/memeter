import React from 'react';

const Level = ({ userProfile }) => {
  const levelBarFill = (userProfile.memePoint / userProfile.pointsToNextLevel) * 100;
  return (
    <div className="level">
      <p className="level-name">
        { `${userProfile.currentLeague} Memer - ` }
          <span>
            { userProfile.memePoint } / { userProfile.pointsToNextLevel }
          </span>
      </p>
      <div
        className="level-container"
        current-level={ `${userProfile.currentLevelNo}` }
        next-level={ `${userProfile.nextLevelNo}` }>
        <svg height="25px" width="200px" className="level-bar">
          <rect x="0" y="0" rx="5" ry="5" style={{
            height: "25px",
            width: "200px",
            fill: "b3e5fc"
          }}
          className="level-bar-container" />
          <rect x="0" y="0" rx="5" ry="5" style={{
            height: "25px",
            width: `${ levelBarFill }%`,
            fill: "0277bd",
          }}
          className="level-bar-value"/>
        </svg>
      </div>
    </div>
  );
};

export default Level;