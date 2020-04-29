import React from "react";
import {Redirect, Route} from "react-router";

import Feed from "./Feed/Feed";
import Profile from "./Profile/Profile";

const AppComponents = () => {

  return (
    <div className="app-components">
      <Redirect to="/" />
      <Route exact path="/" component={ Feed } />
      <Route path="/profile/user/:id" component={ Profile } />
    </div>
  );
};

export default AppComponents;