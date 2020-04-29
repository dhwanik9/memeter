import React, {useEffect} from 'react';
import { connect } from "react-redux";
import PostCard from "./PostCard";
import { startFetching } from '../../../actions/postsAction'

const Posts = ({ dispatch, posts, result, showFooter, uid }) => {
  useEffect(() => {
    if(!uid) {
      dispatch(startFetching());
    }
    else {
      dispatch(startFetching(uid));
    }
  }, [dispatch, uid]);
  return (
    <div className="posts">
      {
        posts.length > 0 ? (
          posts.map(post =>
            <PostCard
              key={post.id}
              post={post}
              result={result}
              showFooter={showFooter}
            />
          )
        ) : (
          <h4>It's so void here...</h4>
        )
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  result: state.user.result,
});

export default connect(mapStateToProps)(Posts);