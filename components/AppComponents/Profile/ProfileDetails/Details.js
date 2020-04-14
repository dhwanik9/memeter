import React from "react";
import {connect} from "react-redux";

const Details = ({ result }) => {
  return (
    <div className="details">
      <h2 className="username">
        <i className="material-icons-outlined">
          person
        </i>
        { result.displayName }
      </h2>
      <h4 className="email">
        <i className="material-icons-outlined">
          alternate_email
        </i>
        { result.email }
      </h4>
    </div>
  );
};

const mapStateToProps = (state) => ({
  result: state.user.result,
});

export default connect(mapStateToProps)(Details);