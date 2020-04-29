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
    </div>
  );
};

export default Home;