import React, {useState} from "react";
import { connect } from 'react-redux';
import { v1 as uuidv1 } from 'uuid';
import firebase from "../../../firebase";
import ProgressIndicator from "../../ProgressIndicator";
import {startFetching} from "../../../actions/postsAction";

const PostForm = ({ dispatch, result }) => {
  const [title, setTitle] = useState("");
  const [posting, setPosting] = useState(false);
  const [meme, setMeme] = useState(null);
  const [OGFile, setFile] = useState({});
  const [postRes, setPostRes] = useState({});
  const [letterCount, setLetterCount] = useState(0);

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setTitle(value);
    setLetterCount(value.length);
  };

  const handleMemeChange = (e) => {
    const file = e.target.files[0];
    const typeRegex = RegExp("^image/");
    if(typeRegex.test(file.type)) {
      setFile(file);
      const fileReader = new FileReader();
      if (file) {
        fileReader.onload = (e) => {
          setMeme(e.target.result);
        };
        fileReader.readAsDataURL(file);
      }
    } else {
      setPostRes({
          resultText: "Hey dimwit, meme should be an image!!!",
          resultSuccess: false,
          finishPosting: true,
        }
      );
      setTimeout(() => {
        setPostRes({
          resultText: "",
          resultSuccess: null,
          finishPosting: null,
        });
      }, 5000);
    }
  };

  const renderImage = () => {
    let image = null;
    if(meme) {
      image = (
        <img src={ meme } alt="Meme" className="meme-preview" />
      );
    }
    return image;
  };

  const postMeme = async (e) => {
    e.preventDefault();
    if(title.length > 0 && meme && letterCount <= 45) {
      setPosting(!posting);
      const uploadedBy = {
        displayName: result.displayName,
        uid: result.uid
      };
      const res = await firebase.postMeme(uploadedBy, uuidv1(), title, OGFile);
      setPostRes(res);
      setPosting(!res.finishPosting);
      if(res.resultSuccess) {
        setTitle("");
        setFile({});
        setMeme(null);
        setLetterCount(0);
        dispatch(startFetching());
      }
      setTimeout(() => {
        setPostRes({
          resultText: "",
          resultSuccess: null,
          finishPosting: null,
        });
      }, 5000);
    }
  };

  return (
    <form className="post-form">
      <label htmlFor="post-title">
        Title as funnier as the meme
      </label>
      <span className="input">
        <span className="inner-input">
          <input
            type="text"
            name="title"
            value={ title }
            className="post-title"
            onChange={ handleTitleChange }/>
          <span className={ [ "letter-count", letterCount > 45 ? "error" : "" ].join(" ") }>
            { letterCount }/45
          </span>
        </span>
      </span>
      <label className="input input-meme">
        <input
          type="file"
          name="meme"
          className="meme"
          onChange={ handleMemeChange }/>
        {
          meme ? (
            renderImage()
          ) : (
            <i className="material-icons-outlined add-meme-icon">
              add
            </i>
          )
        }
      </label>

      {
        posting ? (
          <ProgressIndicator/>
        ) : (
          <button className="post-meme-btn filled"
            disabled={ !(title && meme && letterCount <= 45) }
            onClick={ postMeme }>
              Let 'em laugh
              <i className="material-icons-outlined">
                send
              </i>
          </button>
        )
      }
      {
        <span
          className={[
            "message", postRes.finishPosting ? "show" : "", postRes.resultSuccess ? "" : "error"
          ].join(" ")}>
          { postRes.resultText }
        </span>
      }
    </form>
  );
};

const mapStateToProps = (state) => ({
  result: state.user.result,
});

export default connect(mapStateToProps)(PostForm);