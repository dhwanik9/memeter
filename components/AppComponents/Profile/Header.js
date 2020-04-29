import React from 'react';
import { connect } from 'react-redux';
import {removingAuth} from "../../../actions/userAction";

const Header = ({ logOut }) => {
  const logout = () => {
    logOut();
    window.location.replace("/");
  };

  return(
    <div className="header">
      <i
        className="material-icons-outlined profile-header-icon"
        onClick={ () => window.history.back() }>
        arrow_back
      </i>
      <h1 className="header-title">
        Profile
      </h1>
      <i
        className="material-icons-outlined profile-header-icon logout-icon"
        onClick={ logout }>
        exit_to_app
      </i>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(removingAuth()),
});

export default connect(null, mapDispatchToProps)(Header);