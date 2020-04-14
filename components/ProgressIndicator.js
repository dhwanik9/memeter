import React from "react";

const ProgressIndicator = () => {
  return (
    <span className="progress-indicator">
      <svg>
        <circle
          cx="15"
          cy="15"
          r="10"
          fill="none"
          stroke="#039be5"
          strokeWidth="3"
          strokeDasharray={62.8}
          strokeDashoffset={ 2 * 3.14 * 7.5 }
        />
      </svg>
    </span>
  );
};

export default ProgressIndicator;