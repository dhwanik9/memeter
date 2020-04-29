import React from "react";

import Level from "./Level";
import Details from "./Details";

const ProfileDetails = ({ userProfile }) => {
  return (
    <div className="profile-details">
      <Details userProfile={ userProfile } />
      <Level userProfile={ userProfile } />
    </div>
  );
};



export default ProfileDetails;