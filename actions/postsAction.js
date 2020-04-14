import firebase from "../firebase";

export const BEGIN_FETCH = "BEGIN_FETCH";
export const ON_FETCH = "ON_FETCH";

const beginFetch = () => ({
  type: BEGIN_FETCH
});

const onFetch = (result) => ({
  type: ON_FETCH,
  payload: result
});

export const startFetching = () => {
  return async dispatch => {
    dispatch(beginFetch());
    try {
      const result = await firebase.fetchPosts();
      dispatch(onFetch(result));
    } catch(err) {
      console.log(err);
    }
  };
};