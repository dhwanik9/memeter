import React, { useState } from "react";
import { v1 as uuidv1 } from "uuid";
import firebase from "../../../firebase";
import ProgressIndicator from "../../ProgressIndicator";
import {Link} from "react-router-dom";
import {startFetching} from "../../../actions/postsAction";
import {connect} from "react-redux";

const Comments = ({ comments, showComments, setShowComments, result, postId, fetchPosts, postUploadedByUid, showFooter }) => {
  const [comment, setComment] = useState("");
  const [adding, setAdding] = useState(false);
  const [letterCount, setLetterCount] = useState(0);

  const handleChange = (e) => {
    setComment(e.target.value);
    setLetterCount(e.target.value.length);
  };

  const addComment = async () => {
    if(letterCount <= 45) {
      setAdding(true);
      const commentData = {
        displayName: result.displayName,
        photoURL: result.photoURL,
        uid: result.uid,
        comment,
        id: uuidv1(),
        commentedAt: Date.now()
      };
      await firebase.addComment(commentData, postId);
      fetchPosts();
      setAdding(false);
      setComment("");
      setLetterCount(0);
    }
  };

  return (
    <div className="comments">
      <div className={ ["comments-header", !comments.length > 0 ? "empty" : ""].join(" ") }>
        <h4>Comments</h4>
        <span>
          { comments.length }
        </span>
        <span onClick={ () => setShowComments(!showComments) }>
          <i className="material-icons-outlined close">clear</i>
        </span>
      </div>
      <div className="comments-content">
        {
          !comments.length > 0 ? (
            <span>
              {
                !showFooter ?
                  "Looks like no one has commented on your memes!" :
                  "Be the first one to comment something witty about this meme."
              }
            </span>
          ) : (
            comments.map(comment => (
              <Comment
                key={ comment.id }
                comment={ comment }
                result={ result }
                postUploadedByUid={ postUploadedByUid }
                postId={ postId }
                fetchPosts={ fetchPosts }
              />
            ))
          )
        }
      </div>
        <div className="comments-footer">
          <form>
            <span className="input">
              <span className="inner-input">
                <input
                  type="text"
                  name="comment"
                  value={ comment }
                  onChange={ handleChange }
                />
                <span className={ [ "letter-count", letterCount > 45 ? "error" : "" ].join(" ") }>
                  { letterCount }/45
                </span>
              </span>
            </span>
          </form>
          {
            adding ? (
              <ProgressIndicator/>
            ) : (
              <span onClick={ comment.length > 0 ? addComment : null }>
                <i className="material-icons-outlined add-comment-icon">
                  add_comment
                </i>
              </span>
            )
          }
        </div>
    </div>
  );
};

const Comment = ({ comment, result, postUploadedByUid, postId, fetchPosts }) => {
  const uploadedAtDateTime = new Date(comment.commentedAt);
  const currentDateTime = new Date();
  const elapsedMinutes = Math.floor((currentDateTime - uploadedAtDateTime) / (1000 * 60));
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);
  const elapsedMonths = Math.floor(elapsedDays / 30);
  const elapsedYears = Math.floor(elapsedMonths / 12);

  const renderTimeStampUI = () => {
    if(elapsedYears >= 1) {
      return (
        <span>
          { elapsedYears } Y
        </span>
      )
    } else if(elapsedMonths >= 1) {
      return (
        <span>
          { elapsedMonths } Mo
        </span>
      )
    } else if(elapsedDays >= 1) {
      return (
        <span>
          { elapsedDays } D
        </span>
      )
    } else if(elapsedHours >= 1) {
      return (
        <span>
          { elapsedHours } H
        </span>
      )
    } else if(elapsedMinutes < 60 && elapsedHours < 1) {
      return (
        <span>
          { elapsedMinutes } Mi
        </span>
      )
    }
  };

  const deleteComment = async () => {
    await firebase.deleteComment(comment, postId);
    fetchPosts();
  };

  return (
    <div className="comment">
      {
        comment.photoURL ? (
          <img src={ comment.photoURL } alt={ comment.displayName } />
        ) : (
          <i className="material-icons-outlined profile-placeholder">
            account_circle
          </i>
        )
      }
      <span>
        <p className="comment-header">
          <Link to={`/profile/user/${ comment.uid }`}>
            { comment.displayName }
          </Link>
          { renderTimeStampUI() }
          {
            comment.uid === result.uid || postUploadedByUid === result.uid ? (
              <i className="material-icons-outlined delete-icon" onClick={ deleteComment }>
                delete
              </i>
            ) : (
              <></>
            )
          }
        </p>
        <p className="comment">
          { comment.comment }
        </p>
      </span>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(startFetching())
});


export default connect(null, mapDispatchToProps)(Comments);