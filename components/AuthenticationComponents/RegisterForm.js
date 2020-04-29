import React, { useState } from 'react';
import { connect } from "react-redux";
import {registerUser, storingUserData} from "../../actions/userAction";
import ProgressIndicator from "../ProgressIndicator";

const RegisterForm = ({ dispatch, authResult, loading, result }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    validUsername: false,
    validEmail: false,
    validPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const performValidation = (e, formValid) => {
    !formValid ?
      e.target.parentElement.parentElement.classList.add("error") :
      e.target.parentElement.parentElement.classList.remove("error");
    return formValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const emailPattern = "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$";
    const emailRegex = new RegExp(emailPattern);
    const usernamePattern = "^[a-z0-9_.]{3,12}$";
    const usernameRegex = new RegExp(usernamePattern);

    setFormData({ ...formData, [name]: value });

    switch(name) {
      case "username":
        errors.validUsername = !usernameRegex.test(value) ?
          performValidation(e, false) :
          performValidation(e, true);
        break;

      case "email":
        errors.validEmail = !emailRegex.test(value) ?
          performValidation(e, false) :
          performValidation(e, true);
        break;
      case "password":
        errors.validPassword = value.length < 6 ?
          performValidation(e, false) :
          performValidation(e, true);
        break;
      default:
        break;
    }
    errors.validUsername && errors.validEmail && errors.validPassword ?
      setIsFormValid(true) :
      setIsFormValid(false);

    setErrors({ ...errors });
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const register = async (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
    dispatch(storingUserData(result.uid));
  };

  return (
    <>
      <form className="authentication-form" onSubmit={ e => e.preventDefault() }>
        <label htmlFor="username">Username</label>
        <span className="input">
          <span className="inner-input">
            <i className="material-icons-outlined">
              person
            </i>
            <input
              type="text"
              name="username"
              className="username"
              value={ formData.username }
              onChange={ handleChange }
            />
          </span>
          <p>
            {
              !errors.validUsername ?
                "Only 3-12, lowercase, numeric, dots, & underscores are allowed" :
                ""
            }
          </p>
        </span>

        <label htmlFor="email">Email</label>
        <span className="input">
          <span className="inner-input">
            <i className="material-icons-outlined">
              alternate_email
            </i>
            <input
              type="text"
              name="email"
              className="email"
              value={ formData.email }
              onChange={ handleChange }
            />
          </span>
          <p className="errorText">
            {
              !errors.validEmail ?
                "Hmm, looks like an empty or invalid email" :
                ""
            }
          </p>
        </span>

        <label htmlFor="password">Password</label>
        <span className="input">
          <span className="inner-input">
            <i className="material-icons-outlined">
              lock
            </i>
            <input
              type={ showPassword ? "text" : "password" }
              name="password"
              className="password"
              value={ formData.password }
              onChange={ handleChange }
            />
            <i
              className="material-icons-outlined toggleVisibility"
              onClick={ togglePasswordVisibility }
            >
              { showPassword ? "visibility_off" : "visibility" }
            </i>
          </span>
          <p className="errorText">
            {
              !errors.validPassword ?
                "Buddy, you need a strong password" :
                ""
            }
          </p>
        </span>

        {
          loading ? <ProgressIndicator /> :
            <button
              className="register-button filled"
              onClick={ register }
              disabled = { !isFormValid }>
              Register
            </button>
        }
        <p className="errorText auth-error">
          {
            !authResult.resultSuccess ?
              authResult.resultText :
              ""
          }
        </p>
      </form>
    </>
  )
};

const mapStateToProps = (state) => ({
  authResult: state.user.authResult,
  loading: state.user.loading,
  result: state.user.result,
});

export default connect(mapStateToProps)(RegisterForm);