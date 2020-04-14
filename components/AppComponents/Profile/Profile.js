import React from 'react';
import Header from "./Header";
import ProfilePhoto from "./ProfilePhoto";
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import './profile.css';

const Profile = () => {
  return (
    <div className="profile">
      <div className="profile-header">
        <Header />
      </div>
      <div className="profile-information">
        <ProfilePhoto />
        <ProfileDetails />
      </div>
    </div>
  );
};

export default Profile;