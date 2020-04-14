import React from "react";
import {Redirect, Route} from 'react-router';

import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import Home from "./Home";

const AuthenticationComponents = () => {
  return (
    <>
      <Header/>
      <Redirect to="/" />
      <Route exact path="/" component={ Home } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
    </>
  );
};


export default AuthenticationComponents;