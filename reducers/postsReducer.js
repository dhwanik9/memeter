import * as actions from '../actions/postsAction';

const initialState = {
  posts: [],
  loading: false,
  result: null
};

const postsReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.BEGIN_FETCH:
      return {
        ...state,
        loading: true
      };
    case actions.ON_FETCH:
      return {
        posts: action.payload,
        loading: false,
        result: null
      };
    default:
      return state;
  }
};

export default postsReducer;