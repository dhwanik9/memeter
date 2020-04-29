import React, {useEffect} from 'react';
import Header from "./Header";
import ProfilePhoto from "./ProfilePhoto";
import ProfileDetails from "./ProfileDetails/ProfileDetails";
import './profile.css';
import {connect} from "react-redux";
import {fetchingUserProfile} from "../../../actions/userAction";
import {useParams} from "react-router";
import Memes from "./Memes";
import LoadingLogo from "../../LoadingLogo";

const Profile = ({ dispatch, userProfile, profileLoading}) => {
  const params = useParams();
  useEffect(() => {
    dispatch(fetchingUserProfile(params.id));
  }, [dispatch, params.id]);

  const renderProfileUI = () => {
    if(profileLoading) {
      return <LoadingLogo/>;
    } else if(userProfile) {
      return (
        <>
          <div className="profile-information">
            <ProfilePhoto />
            <ProfileDetails userProfile={ userProfile } />
          </div>
          <div className="profile-memes">
            <h1>Memes</h1>
            <Memes
              uid={ userProfile.uid }
            />
          </div>
        </>
      );
    } else {
      return <p>User does not exist</p>
    }
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <Header />
      </div>
      {
        renderProfileUI()
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  userProfile: state.user.userProfile,
  profileLoading: state.user.profileLoading
});

export default connect(mapStateToProps)(Profile);