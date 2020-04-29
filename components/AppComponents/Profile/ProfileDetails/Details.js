import React from "react";

const Details = ({ userProfile }) => {
  return (
    <div className="details">
      <h2 className="username">
        <i className="material-icons-outlined">
          person
        </i>
        { userProfile.displayName }
      </h2>
      <h4 className="email">
        <i className="material-icons-outlined">
          alternate_email
        </i>
        { userProfile.email }
      </h4>
    </div>
  );
};

export default Details;