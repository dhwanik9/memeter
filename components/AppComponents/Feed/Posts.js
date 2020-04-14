import React, {useEffect} from 'react';
import { connect } from "react-redux";
import PostCard from "./PostCard";
import { startFetching } from '../../../actions/postsAction'

const Posts = ({ fetchPosts, posts, result }) => {
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);
  return (
    <div className="posts">
      {
        posts.map(post =>
          <PostCard key={ post.id } post={ post } result={ result } fetchPosts={ fetchPosts } />
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  result: state.user.result,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(startFetching())
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);