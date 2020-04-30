import React, {useEffect} from 'react';
import { connect } from "react-redux";
import PostCard from "./PostCard";
import { startFetching } from '../../../actions/postsAction'
import ProgressIndicator from "../../ProgressIndicator";

const Posts = ({ dispatch, posts, result, showFooter, uid, loading }) => {
  useEffect(() => {
    if (!uid) {
      dispatch(startFetching());
    } else {
      dispatch(startFetching(uid));
    }
  }, [dispatch, uid]);

  const renderMemeUI = () => {
    if(loading) {
      return <span className="memes-loading">
        <ProgressIndicator/>
      </span>
    }
    else if(posts.length > 0) {
      return posts.map(post =>
        <PostCard
          key={post.id}
          post={post}
          result={result}
          showFooter={showFooter}
          uid={ uid }
          dispatch={ dispatch }
        />
      )
    } else {
      return <h4 className="empty-posts-title">It's so void here...</h4>
    }
  };

  return (
    <div className="posts">
      {
        renderMemeUI()
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  loading: state.posts.loading,
  result: state.user.result
});

export default connect(mapStateToProps)(Posts);