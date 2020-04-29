import app, { firestore } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
    this.ref = this.storage.ref();
    this.authResult = {
      resultText: "",
      resultSuccess: false,
    };
  }

  register = async ({ username, email, password }) => {
    let userData;
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
      const user = this.auth.currentUser;
      await user.updateProfile({
        displayName: username,
      });
      userData = {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        memePoint: 0,
        currentLevelNo: 1,
        nextLevelNo: 2,
        pointsToNextLevel: 30,
        nextLeagueLevel: 11,
        currentLeague: "Novice",
        nextLeague: "Better Than A Novice",
        posts: []
      };
      this.authResult = {
        resultText: "Welcome aboard memer, we'll get you started in a bit!",
        resultSuccess: true,
      };
      this.storeUserData(userData);
      return this.authResult;
    } catch(err) {
      if("auth/email-already-in-use") {
        this.authResult = {
          resultText: "Dude, you already have an account, why would you register again?",
          resultSuccess: false,
        };
        return this.authResult;
      }
    }
  };

  storeUserData = async (user) => {
    try {
      await this.db.collection("users").doc(user.uid)
        .set(user);
      this.result = {
        resultText: "",
        resultSuccess: true,
      };
      return this.result;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  login = async ({ email, password }) => {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      this.authResult = {
        resultText: "",
        resultSuccess: true,
      };
      return this.authResult;
    } catch(err) {
      if(err.code === "auth/wrong-password") {
        this.authResult = {
          resultText: "Did you know that you need to enter your correct password",
          resultSuccess: false,
        };
        return this.authResult;
      } else if(err.code === "auth/user-not-found") {
        this.authResult = {
          resultText: "We are sorry but you don't exist, oh no, not IRL, on the app! " + String.fromCodePoint(0x1F643),
          resultSuccess: false,
        };
        return this.authResult;
      }
      console.log(err);
      return this.authResult;
    }
  };

  changeProfilePhoto = async (file, uid) => {
    try {
      const user = await this.auth.currentUser;
      await this.ref.child(`profilePhotos/${uid}`).put(file);
      const photoURL = await this.ref.child(`profilePhotos/${uid}`).getDownloadURL();
      await user.updateProfile({
        photoURL
      });
      await this.db.collection("users").doc(uid).update({
        photoURL
      });
      return user;
    } catch(err) {
      console.log(err);
    }
  };

  logOut = async () => {
    await this.auth.signOut();
  };

  postMeme = async (uploadedBy, id, title, file) => {
    let result;
    try {
      await this.ref.child(`posts/${id}`).put(file);
      const postUrl = await this.ref.child(`posts/${id}`).getDownloadURL();
      await this.db.collection("posts").doc(id).set({
        uploadedBy,
        id,
        title,
        postUrl,
        totalRatings: 0,
        uploadedAt: Date.now(),
        comments: [],
        ratedBy: [],
      });
      await this.db.collection("users").doc(uploadedBy.uid).update({
        posts: firestore.FieldValue.arrayUnion(id)
      });
      result = {
        resultText: "That's what memers do, they make people laugh! HAHA",
        resultSuccess: true,
        finishPosting: true,
      };
      return result;
    } catch(err) {
      result = {
        resultText: "Hey, we think there was some problem, try posting it again, don't be lazy",
        resultSuccess: false,
        finishPosting: true,
      };
      return result;
    }
  };

  fetchPosts = async (uid) => {
    let result = [];
    try {
      if(!uid) {
        const memes = await this.db.collection("posts").orderBy("uploadedAt", "desc").get();
        memes.forEach(meme => {
          result.push(meme.data());
        });
        return result
      } else {
        let posts = (await this.db.collection("users").doc(uid).get()).data();
        posts = posts.posts;
        for (const p of posts) {
          const post = await this.db.collection("posts").doc(p).get();
          result.push(post.data());
        }
      }
      return result;
    } catch(err) {
      console.log(err);
    }
  };

  chooseNextLevelPoints = (level, currentPoints) => {
    switch(level) {
      case 11:
        return 30 + (currentPoints - (currentPoints % 10));
      case 21:
        return 50 + (currentPoints - (currentPoints % 10));
      case 31:
        return 70 + (currentPoints - (currentPoints % 10));
      case 41:
        return 90 + (currentPoints - (currentPoints % 10));
      case level >= 61:
        return 100 + (currentPoints - (currentPoints % 10));
      default:
        return 30
    }
  };

  chooseCurrentLeague = (level) => {
    switch(level) {
      case 11:
        return "Better Than A Novice";
      case 21:
        return "Intermediate";
      case 31:
        return "Better Than An Intermediate";
      case 41:
        return "Classic";
      case level >= 61:
        return "Beyond Classic";
      default:
        return "";
    }
  };

  chooseNextLeague = (level) => {
    switch(level) {
      case 21:
        return "Intermediate";
      case 31:
        return "Better Than An Intermediate";
      case 41:
        return "Classic";
      case level >= 61:
        return "Beyond Classic";
      default:
        return "";
    }
  };

  rateMeme = async (rating, id, currentTotalRatings, uid) => {
    try {
      await this.db.collection("posts").doc(id).update({
        ratedBy: firestore.FieldValue.arrayUnion(rating),
        totalRatings: currentTotalRatings + rating.ratingValue
      });

      const user = (await this.db.collection("users").doc(uid).get()).data();
      await this.db.collection("users").doc(uid).update({
        memePoint: user.memePoint + rating.ratingValue,
        currentLevelNo: (user.memePoint + rating.ratingValue) >= user.pointsToNextLevel ? user.currentLevelNo + 1 : user.currentLevelNo,
        nextLevelNo: (user.memePoint + rating.ratingValue) >= user.pointsToNextLevel ? user.nextLevelNo + 1 : user.nextLevelNo,
        pointsToNextLevel: (user.memePoint + rating.ratingValue) >= user.pointsToNextLevel ? this.chooseNextLevelPoints(user.nextLeagueLevel, user.memePoint + rating.ratingValue) : user.pointsToNextLevel,
        nextLeagueLevel: (user.memePoint + rating.ratingValue) >= user.pointsToNextLevel && (user.currentLevelNo + 1) >= user.nextLeagueLevel ? user.nextLeagueLevel + 10 : user.nextLeagueLevel,
        currentLeague: (user.memePoint + rating.ratingValue) >= user.pointsToNextLevel && (user.currentLevelNo + 1) >= user.nextLeagueLevel ? this.chooseCurrentLeague(user.currentLevelNo + 1) : user.currentLeague,
        nextLeague: (user.memePoint + rating.ratingValue) >= user.pointsToNextLevel && (user.currentLevelNo + 1) >= user.nextLeagueLevel ? this.chooseNextLeague(user.nextLeagueLevel + 10) : user.nextLeague
      }).then(async () => {
        if((user.memePoint + rating.ratingValue) >= user.pointsToNextLevel) {
          await this.db.collection("users").doc(uid).update({
            memePoint: 0,
          });
        }
      });
    } catch(err) {
      console.log(err);
    }
  };

  addComment = async (comment, id) => {
    try {
      await this.db.collection("posts").doc(id).update({
        comments: firestore.FieldValue.arrayUnion(comment)
      });
    } catch(err) {
      console.log(err);
    }
  };

  deleteComment = async (comment, id) => {
    try {
      await this.db.collection("posts").doc(id).update({
        comments: firestore.FieldValue.arrayRemove(comment)
      });
    } catch (err) {
      console.log(err);
    }
  };

  fetchUserProfile = async (uid) => {
    try {
      const user = await this.db.collection("users").doc(uid).get();
      return user.data();
    } catch (err) {
      console.log(err);
    }
  };

  deleteMeme = async (id) => {
    try {
      await this.db.collection("posts").doc(id).delete();
      await this.ref.child(`posts/${id}`).delete();
    } catch(err) {
      console.log(err);
    }
  };
}

export default new Firebase();