import React, {useState} from "react";
import Post from "./Post";
import Comments from "./Comments";

const PostCard = ({ dispatch, post, result, showFooter, uid }) => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className={["post-card", showComments ? "hide": ""].join(" ")}>
      {
        !showComments ? (
          <Post
            post={ post }
            showComments={ showComments }
            setShowComments={ setShowComments }
            result={ result }
            showFooter={ showFooter }
            uid={ uid }
            dispatch={ dispatch }
          />
        ) : (
          <Comments
            postId={ post.id }
            postUploadedByUid={ post.uploadedBy.uid }
            comments={ post.comments }
            setShowComments={ setShowComments }
            result={ result }
            showComments={ showComments }
            showFooter={ showFooter }
          />
        )
      }
    </div>
  );
};

export default PostCard;