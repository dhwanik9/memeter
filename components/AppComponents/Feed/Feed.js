import React from "react";
import Header from "./Header";
import PostMeme from "./PostMeme";
import "./feed.css";
import Posts from "./Posts";

const Feed = () => {
  return (
    <div className="feed">
      <div className="feed-header">
        <Header/>
      </div>
      <div className="feed-posts">
        <PostMeme/>
        <Posts/>
      </div>
    </div>
  );
};

export default Feed;