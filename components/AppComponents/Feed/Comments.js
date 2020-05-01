import React, {useEffect, useState} from "react";
import { v1 as uuidv1 } from "uuid";
import firebase from "../../../firebase";
import ProgressIndicator from "../../ProgressIndicator";
import {Link} from "react-router-dom";

const Comments = ({ comments, showComments, setShowComments, result, postId, postUploadedByUid, showFooter }) => {
  const [comment, setComment] = useState("");
  const [adding, setAdding] = useState(false);
  const [letterCount, setLetterCount] = useState(0);
  const [commentsState, setCommentsState] = useState(comments);

  const handleChange = (e) => {
    setComment(e.target.value);
    setLetterCount(e.target.value.length);
  };

  const addComment = async () => {
    if(letterCount <= 45) {
      setAdding(true);
      const commentData = {
        displayName: result.displayName,
        uid: result.uid,
        comment,
        id: uuidv1(),
        commentedAt: Date.now()
      };
      const comments = await firebase.addComment(commentData, postId);
      setCommentsState(comments);
      setAdding(false);
      setComment("");
      setLetterCount(0);
    }
  };

  const deleteComment = async (commentData) => {
    console.log(commentData);
    const comments = await firebase.deleteComment(commentData, postId);
    console.log(comments);
    setCommentsState(comments)
  };

  return (
    <div className="comments">
      <div className={ ["comments-header", !commentsState.length > 0 ? "empty" : ""].join(" ") }>
        <h4>Comments</h4>
        <span>
          { commentsState.length }
        </span>
        <span onClick={ () => setShowComments(!showComments) }>
          <i className="material-icons-outlined close">clear</i>
        </span>
      </div>
      <div className="comments-content">
        {
          !commentsState.length > 0 ? (
            <span>
              {
                !showFooter ?
                  "Looks like no one has commented on your memes!" :
                  "Be the first one to comment something witty about this meme."
              }
            </span>
          ) : (
            commentsState.map(comment => (
              <Comment
                key={ comment.id }
                comment={ comment }
                result={ result }
                postUploadedByUid={ postUploadedByUid }
                postId={ postId }
                deleteComment={ deleteComment }
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

const Comment = ({ comment, result, postUploadedByUid, deleteComment }) => {
  const uploadedAtDateTime = new Date(comment.commentedAt);
  const currentDateTime = new Date();
  const elapsedMinutes = Math.floor((currentDateTime - uploadedAtDateTime) / (1000 * 60));
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);
  const elapsedMonths = Math.floor(elapsedDays / 30);
  const elapsedYears = Math.floor(elapsedMonths / 12);
  const [commentState, setCommentState] = useState(comment);

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

  useEffect(() => {
    async function fetchUser(uid) {
      const user = await firebase.fetchUserProfile(uid);
      setCommentState(prevState => ({
        ...prevState,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL
      }));
    }
    fetchUser(commentState.uid);
  }, [commentState.uid]);

  return (
    <div className="comment">
      {
        commentState.photoURL ? (
          <img src={ commentState.photoURL } alt={ commentState.displayName } />
        ) : (
          <i className="material-icons-outlined profile-placeholder">
            account_circle
          </i>
        )
      }
      <span>
        <p className="comment-header">
          <Link to={`/profile/user/${ commentState.uid }`}>
            { commentState.displayName }
          </Link>
          { renderTimeStampUI() }
          {
            commentState.uid === result.uid || postUploadedByUid === result.uid ? (
              <i
                className="material-icons-outlined delete-icon"
                onClick={ () => deleteComment(commentState) }>
                delete
              </i>
            ) : (
              <></>
            )
          }
        </p>
        <p className="comment">
          { commentState.comment }
        </p>
      </span>
    </div>
  );
};

export default Comments;