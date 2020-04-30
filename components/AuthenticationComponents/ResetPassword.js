import React, {useState} from "react";
import firebase from "../../firebase";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    validEmail: false,
    validPassword: false,
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [resetPasswordResult, setResetPasswordResult] = useState({
    resultText: ``,
    sendResult: false,
  });

  const performValidation = (e, formValid) => {
    !formValid ?
      e.target.parentElement.parentElement.classList.add("error") :
      e.target.parentElement.parentElement.classList.remove("error");
    return formValid;
  };

  const handleChange = (e) => {
    const { value } = e.target;
    const emailPattern = "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$";
    const emailRegex = new RegExp(emailPattern);

    setEmail(value);

    errors.validEmail = !emailRegex.test(value) ?
      performValidation(e, false) :
      performValidation(e, true);

    errors.validEmail ?
      setIsFormValid(true) :
      setIsFormValid(false);

    setErrors({ ...errors });
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    if (email)
      setResetPasswordResult(await firebase.resetPassword(email));
  };

  return (
    <form
      className="password-reset-form authentication-form"
      onSubmit={ (e) => e.preventDefault() }>
      <h3>Reset your password.</h3>
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
            value={ email }
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
      <button
        className="login-button filled"
        onClick={ resetPassword }
        disabled = { !isFormValid }>
        Reset Password
      </button>
      {
        resetPasswordResult.sendResult ? (
          <p className="reset-password-result">{ resetPasswordResult.resultText }</p>
        ) : (
          <></>
        )
      }
    </form>
  );
};

export default ResetPassword;