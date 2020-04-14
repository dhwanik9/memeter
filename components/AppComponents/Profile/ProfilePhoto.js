import React, {useState} from 'react';
import { connect } from 'react-redux';

import ProgressIndicator from "../../ProgressIndicator";
import {changingProfilePhoto} from "../../../actions/userAction";

const ProfilePhoto = ({ dispatch, result, photoLoading }) => {
  const [changeState, setChangeState] = useState({
    error: false,
    errorText: "",
  });

  const changeProfilePhoto = async (e) => {
    const readFile = e.target.files[0];
    const typeRegex = RegExp("^image/");
    const fileSize = Math.floor(readFile.size / 1024);
    if(typeRegex.test(readFile.type) && fileSize < 1280)
      dispatch(changingProfilePhoto(readFile, result.uid));
    else {
      setChangeState({
        error: true,
        errorText: "Dude, it should be an image and less than 1MB (we don't want to clog the servers)."
      });
      setTimeout(() => {
        setChangeState({
          error: false,
          errorText: "",
        })
      }, 5000);
    }
  };

  return (
    <div className="profile-photo">
      <div
        className="photo-placeholder"
        style={{
          backgroundImage: result.photoURL ? `url(${result.photoURL})` : `#b3e5fc`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}>
        {
          photoLoading ? <ProgressIndicator/> : <></>
        }
      </div>
      <label className="edit-profile-photo">
        <input
          type="file"
          className="file-picker"
          onChange={ changeProfilePhoto }/>

          <i className="material-icons-outlined edit-icon">
            add_a_photo
          </i>
      </label>
      <span className={["message error", changeState.error ? "show" : ""].join(" ")}>
        { changeState.errorText }
      </span>
    </div>
  );
};

const mapStateToProps = (state) => ({
  result: state.user.result,
  photoLoading: state.user.photoLoading,
});

export default connect(mapStateToProps)(ProfilePhoto);