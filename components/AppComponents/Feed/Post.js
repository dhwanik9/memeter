import React, {useEffect} from "react";
import firebase from "../../../firebase";
import {Link} from "react-router-dom";
import {startFetching} from "../../../actions/postsAction";

const Post = ({ dispatch, post, result, setShowComments, showComments, uid }) => {
  const uploadedAtDateTime = new Date(post.uploadedAt);
  const currentDateTime = new Date();
  const elapsedMinutes = Math.floor((currentDateTime - uploadedAtDateTime) / (1000 * 60));
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  const elapsedDays = Math.floor(elapsedHours / 24);
  const elapsedMonths = Math.floor(elapsedDays / 30);
  const elapsedYears = Math.floor(elapsedMonths / 12);
  const [isRating, setIsRating] = React.useState(false);
  const [postState, setPostState] = React.useState(post);
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

  useEffect(() => {
    async function fetchUser(uid) {
      const user = await firebase.fetchUserProfile(uid);
      setPostState(prevState => ({
        ...prevState,
        uploadedBy: user
      }));
    }
    fetchUser(post.uploadedBy.uid);
  }, [post.uploadedBy.uid]);

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
    if(result.uid === postState.uploadedBy.uid) {
      return  <h4 className="rating-bar">We won't let you rate your own post!</h4>
    } else if(postState.ratedBy.length > 0) {
      let comp = null;
      for(let i = 0; i < postState.ratedBy.length; i++) {
        if(result.uid === postState.ratedBy[i].uid) {
          comp = <span className="rating-emoji">{ postState.ratedBy[i].ratingEmoji + " " + postState.ratedBy[i].ratingTitle }</span>;
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
    const ratingData = await firebase.rateMeme(rating, postState.id, postState.totalRatings, postState.uploadedBy.uid);
    setPostState(prevState => ({
      ...prevState,
        ratedBy: ratingData.ratedBy,
        totalRatings: ratingData.totalRatings,
    }));
    setIsRating(false);
  };

  const deleteMeme = async () => {
    await firebase.deleteMeme(postState.id, result.uid);
    dispatch(startFetching(uid));
  };

  return (
    <div className="post">
      <div className="post-header">
        {
          postState.uploadedBy.photoURL ? (
            <img src={ postState.uploadedBy.photoURL } alt={ postState.uploadedBy.displayName } />
          ) : (
            <i className="material-icons-outlined">
              account_circle
            </i>
          )
        }
        <h5>
          <Link to={`/profile/user/${postState.uploadedBy.uid}`}>
            { postState.uploadedBy.displayName }
          </Link>
        </h5>
        {
          renderTimeStampUI()
        }
        {
          postState.uploadedBy.uid === result.uid ? (
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
        <p>{ postState.title }</p>
        <img src={ postState.postUrl } alt="Post" />
      </div>
        <div className="post-footer">
          <div className="rating-bar">
            <span className="total-ratings">
              { postState.totalRatings }
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

export default Post;