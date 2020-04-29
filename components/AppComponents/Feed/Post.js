import React from "react";
import firebase from "../../../firebase";
import {Link} from "react-router-dom";
import {startFetching} from "../../../actions/postsAction";
import {connect} from "react-redux";

const Post = ({ post, result, fetchPosts, setShowComments, showComments }) => {
  const uploadedAtDateTime = new Date(post.uploadedAt);
  const currentDateTime = new Date();
  const elapsedMinutes = Math.floor((currentDateTime - uploadedAtDateTime) / (1000 * 60));
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);
  const elapsedMonths = Math.floor(elapsedDays / 30);
  const elapsedYears = Math.floor(elapsedMonths / 12);
  const [isRating, setIsRating] = React.useState(false);
  const ratingBarEmojis = [
    {
      emoji: "🤦‍♂",
      title: "Shitty Meme",
      value: -2,
    },
    {
      emoji: "🥱",
      title: "Not Bad",
      value: 0,
    },
    {
      emoji: "😛",
      title: "I Liked It",
      value: 2,
    },
    {
      emoji: "😆",
      title: "It's So Funny",
      value: 4,
    },
    {
      emoji: "🤣",
      title: "Lit AF",
      value: 10,
    },
  ];

  const renderTimeStampUI = () => {
    if(elapsedYears >= 1) {
      return (
        <span>
          { elapsedYears } Y
          <i className="material-icons-outlined">history</i>
        </span>
      )
    } else if(elapsedMonths >= 1) {
      return (
        <span>
          { elapsedMonths } Mo
          <i className="material-icons-outlined">history</i>
        </span>
      )
    } else if(elapsedDays >= 1) {
      return (
        <span>
          { elapsedDays } D
          <i className="material-icons-outlined">history</i>
        </span>
      )
    } else if(elapsedHours >= 1) {
      return (
        <span>
          { elapsedHours } H
          <i className="material-icons-outlined">history</i>
        </span>
      )
    } else if(elapsedMinutes < 60 && elapsedHours < 1) {
      return (
        <span>
          { elapsedMinutes } Mi
          <i className="material-icons-outlined">history</i>
        </span>
      )
    }
  };

  const renderRatingBarUI = () => {
    if(result.uid === post.uploadedBy.uid) {
      return  <h4 className="rating-bar">We won't let you rate your own post!</h4>
    } else if(post.ratedBy.length > 0) {
      let comp = null;
      for(let i = 0; i < post.ratedBy.length; i++) {
        if(result.uid === post.ratedBy[i].uid) {
          comp = <span className="rating-emoji">{ post.ratedBy[i].ratingEmoji + " " + post.ratedBy[i].ratingTitle }</span>;
          break;
        } else {
          comp = ratingBarEmojis.map(emoji => (
            <span
              className="emoji"
              key={emoji.value}
              emoji-title={emoji.title}
              onClick={() => ratePost(emoji)}>
              {emoji.emoji}
            </span>
          ))
        }
      }
      return comp;
    } else {
      return ratingBarEmojis.map(emoji => (
        <span
          className="emoji"
          key={ emoji.value }
          emoji-title={ emoji.title }
          onClick={ () => ratePost(emoji) }>
          { emoji.emoji }
        </span>
      ));
    }
  };

  const ratePost = async (emoji) => {
    setIsRating(true);
    const rating = {
      displayName: result.displayName,
      uid: result.uid,
      ratingValue: emoji.value,
      ratingEmoji: emoji.emoji,
      ratingTitle: emoji.title,
    };
    await firebase.rateMeme(rating, post.id, post.totalRatings, post.uploadedBy.uid);
    fetchPosts();
    setIsRating(false);
  };

  const deleteMeme = async () => {
    await firebase.deleteMeme(post.id);
    fetchPosts();
  };

  return (
    <div className="post">
      <div className="post-header">
        {
          post.uploadedBy.photoURL ? (
            <img src={ post.uploadedBy.photoURL } alt={ post.uploadedBy.displayName } />
          ) : (
            <i className="material-icons-outlined">
              account_circle
            </i>
          )
        }
        <h5>
          <Link to={`/profile/user/${post.uploadedBy.uid}`}>
            { post.uploadedBy.displayName }
          </Link>
        </h5>
        {
          renderTimeStampUI()
        }
        {
          post.uploadedBy.uid === result.uid ? (
            <span
              className="delete-meme"
              onClick={ deleteMeme }>
              <i className="material-icons-outlined delete-icon">
                delete
              </i>
            </span>
          ) : (
            <></>
          )
        }
      </div>
      <div className="post-content">
        <p>{ post.title }</p>
        <img src={ post.postUrl } alt="Post" />
      </div>
        <div className="post-footer">
          <div className="rating-bar">
            <span className="total-ratings">
              { post.totalRatings }
            </span>
            {
              !isRating ? (
                renderRatingBarUI()
              ) : (
                <></>
              )
            }
          </div>
          <span onClick={ () => setShowComments(!showComments) }>
            <i className="material-icons-outlined comment-icon">comment</i>
          </span>
        </div>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: () => dispatch(startFetching())
});

export default connect(null, mapDispatchToProps)(Post);