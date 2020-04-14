import React, {useState} from "react";
import { connect } from "react-redux";
import PostForm from "./PostForm";

const PostMeme = ({ result }) => {
  const [formVisible, setFormVisible] = useState(false);

  const togglePostForm = (e) => {
    setFormVisible(!formVisible);
  };

  return (
    <div className={ ["post-meme-container", formVisible ? "expand" : "collapse"].join(" ") }>
      <div className="post-meme">
        {
          result.photoURL ? (
            <img src={ result.photoURL } alt={ result.displayName } />
          ) : (
            <i className="material-icons-outlined account-icon">
              account_circle
            </i>
          )
        }
        <p>
          Post memes, make people laugh!
        </p>
        <i
          className="material-icons-outlined toggle-form-icon"
          onClick={ togglePostForm }>
          {
            !formVisible ? (
              "post_add"
            ) : (
              "clear"
            )
          }
        </i>
      </div>
      <div className="post-meme-form-container">
        <PostForm />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  result: state.user.result,
});

export default connect(mapStateToProps)(PostMeme);