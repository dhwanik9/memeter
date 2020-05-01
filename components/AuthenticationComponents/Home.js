import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <i className="material-icons-outlined icon">
        home
      </i>
      <h1 className="title">What is Memeter?</h1>
      <p className="description">
        Memeter is an app where you can upload and rate memes.
        Its as simple as that. You will be given a profile rank which
        increases and decreases as your memes get rated (you get the
        convention right?). And as you rank up, you get to show up in
        the populars section, which will help you achieve a reputation
        among the top memers on Memeter.
      </p>

      <h1 className="title">Why Memeter?</h1>
      <p className="description">
        There are dozens of apps where you upload memes, and the users
        like and comment on them. Some even pay you for making memes.
        Memeter was developed with the intention of giving the memers a
        dedicated app for them where they can be reputed, ranked, and rated.
      </p>

      <h1 className="title">What does each rating emoji mean?</h1>
      <ul className="rating-description">
        <li><span role="img" aria-label="Shitty Meme">🤦‍♂ = -2 Points</span></li>
        <li><span role="img" aria-label="Not Bad">🥱 = 0 Points</span></li>
        <li><span role="img" aria-label="I Liked It">😛 = 2 Points</span></li>
        <li><span role="img" aria-label="It's So Funny">😆 = 4 Points</span></li>
        <li><span role="img" aria-label="Lit AF">🤣 = 10 Points</span></li>
      </ul>

      <h1 className="title">Some guidelines.</h1>
      <ul>
        <li>
          Make sure that the memes you upload are squared images (similar to the photos
          that you post on Instagram).
        </li>
        <li>
          DO NOT upload copied memes, plagiarism doesn't play well with ethics.
          We don't want Memeter to become a house of plagiarised memes.
          Also, being original is free.
        </li>
        <li>
          In the future updates, you will be able to report a meme if it is copied from
          some other source.
        </li>
        <li>
          Last but not the least, offending someone isn't cool, be sure that the content
          you post on this platform is non-offensive.
        </li>
      </ul>
    </div>
  );
};

export default Home;