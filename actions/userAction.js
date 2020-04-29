import firebase from '../firebase';

export const WAIT = "WAIT";
export const BEGIN_AUTH = "BEGIN_AUTH";
export const PROCEED_TO_APP = "PROCEED_TO_APP";
export const PROCEED_TO_HOME = "PROCEED_TO_HOME";
export const WAIT_CHANGE = "WAIT_CHANGE";
export const CHANGE_PROFILE_PHOTO = "CHANGE_PROFILE_PHOTO";
export const WAIT_FETCH_USER_PROFILE = "WAIT_FETCH_USER_PROFILE";
export const FETCH_USER_PROFILE = "FETCH_USER_PROFILE";

const wait = () => ({
  type: WAIT,
});

const beginAuth = (result) => ({
  type: BEGIN_AUTH,
  payload: result,
});

const proceedToApp = (result) => ({
  type: PROCEED_TO_APP,
  payload: result,
});

const proceedToHome = (result) => ({
  type: PROCEED_TO_HOME,
  payload: result,
});

const waitChange = () => ({
  type: WAIT_CHANGE,
});

const changeProfilePhoto = (result) => ({
  type: CHANGE_PROFILE_PHOTO,
  payload: result,
});

const waitFetchUserProfile = () => ({
  type: WAIT_FETCH_USER_PROFILE,
});

const fetchUserProfile = (user) => ({
  type: FETCH_USER_PROFILE,
  payload: user
});

export const registerUser = (credentials) => {
  return async dispatch => {
    const result = await firebase.register(credentials);
    if(result.resultSuccess)
      dispatch(beginAuth(result));
    else {
      dispatch(proceedToHome(result));
    }
  }
};

export const storingUserData = (uid) => {
  return async dispatch => {
    const result = await firebase.storeUserData(uid);
    if(!result.resultSuccess)
      dispatch(proceedToHome(result));
  }
};

export const loginUser = (credentials) => {
  return async dispatch => {
    dispatch(wait());
    const result = await firebase.login(credentials);
    if(result.resultSuccess)
      dispatch(beginAuth(result));
    else {
      dispatch(proceedToHome(result));
    }
  }
};

export const checkingAuthState = () => {
  return async dispatch => {
    dispatch(wait());
    firebase.auth.onAuthStateChanged(user => {
      const result = {
        resultText: "",
        resultSuccess: false,
      };
      if(user) {
        dispatch(proceedToApp(user));
      } else {
        dispatch(proceedToHome(result));
      }
    });
  };
};

export const changingProfilePhoto = (file, uid) => {
  return async dispatch => {
    dispatch(waitChange());
    const result = await firebase.changeProfilePhoto(file, uid);
    dispatch(changeProfilePhoto(result));
  };
};

export const removingAuth = () => {
  return async dispatch => {
    const result = {
      resultText: "",
      resultSuccess: false,
    };
    await firebase.logOut();
    dispatch(proceedToHome(result));
  };
};

export const fetchingUserProfile = (uid) => {
  return async dispatch => {
    dispatch(waitFetchUserProfile());
    const user = await firebase.fetchUserProfile(uid);
    dispatch(fetchUserProfile(user));
  };
};