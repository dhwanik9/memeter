import * as actions from '../actions/userAction';

const initialState = {
  loggedIn: false,
  loading: false,
  result: {},
  authResult: {},
  userProfile: null,
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.WAIT:
      return {
        ...state,
        loading: true,
      };
    case actions.BEGIN_AUTH:
      return {
        ...state,
        authResult: action.payload,
        loading: false,
        loggedIn: true,
      };
    case actions.PROCEED_TO_APP:
      return {
        result: action.payload,
        authResult: {
          resultText: "",
          resultSuccess: true,
        },
        loading: false,
        loggedIn: true,
      };
    case actions.PROCEED_TO_HOME:
      return {
        result: {},
        authResult: action.payload,
        loading: false,
        loggedIn: false,
      };
    case actions.WAIT_CHANGE:
      return {
        ...state,
        photoLoading: true
      };

    case actions.CHANGE_PROFILE_PHOTO:
      return {
        ...state,
        photoLoading: false,
        result: action.payload,
      };

    case actions.WAIT_FETCH_USER_PROFILE:
      return {
        ...state,
        profileLoading: true
      };

    case actions.FETCH_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
        profileLoading: false,
      };
    default: return state;
  }
};

export default userReducer;