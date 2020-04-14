import React, {useState} from 'react';
import { connect } from 'react-redux';
import ProgressIndicator from "../ProgressIndicator";
import {loginUser} from "../../actions/userAction";

const LoginForm = ({ dispatch, authResult, loading }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    validEmail: false,
    validPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const performValidation = (e, formValid) => {
    !formValid ?
      e.target.parentElement.classList.add("error") :
      e.target.parentElement.classList.remove("error");
    return formValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const emailPattern = "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$";
    const emailRegex = new RegExp(emailPattern);

    setFormData({ ...formData, [name]: value });

    switch(name) {
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
    errors.validEmail && errors.validPassword ?
      setIsFormValid(true) :
      setIsFormValid(false);

    setErrors({ ...errors });

  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const login = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <form className="authentication-form" onSubmit={ (e) => e.preventDefault() }>
      <label htmlFor="email">Email</label>
      <span className="input">
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
            className="login-button filled"
            onClick={ login }
            disabled = { !isFormValid }>
            Login
          </button>
      }
      {
        !authResult.resultSuccess ?
          (<p className="errorText auth-error">
            { authResult.resultText }
          </p>) :
          (<></>)
      }
    </form>
  )
};

const mapStateToProps = (state) => ({
  authResult: state.user.authResult,
  loading: state.user.loading,
});

export default connect(mapStateToProps)(LoginForm);