import React from "react";
import Posts from "../Feed/Posts";
import {startFetching} from "../../../actions/postsAction";
import {connect} from "react-redux";

const Memes = ({ fetchPosts, posts, result, uid }) => {
  return (
    <Posts
      fetchPosts={ fetchPosts }
      posts={ posts }
      result={ result }
      showFooter={ false }
      uid={ uid }
    />
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  result: state.user.result,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(startFetching())
});

export default connect(mapStateToProps, mapDispatchToProps)(Memes);