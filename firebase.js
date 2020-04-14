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
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
      const user = this.auth.currentUser;
      await user.updateProfile({
        displayName: username,
      });
      this.authResult = {
        resultText: "Welcome aboard memer, we'll get you started in a bit!",
        resultSuccess: true,
      };
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

  storeUserData = async (uid) => {
    try {
      await this.db.collection("users").doc(uid)
        .set({
          rating: 0,
        });
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
      return user;
    } catch(err) {
      console.log(err);
    }
  };

  logOut = async () => {
    await this.auth.signOut();
  };

  postMeme = async (uploadedBy, id, title, file) => {
    let result = {};
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

  fetchPosts = async () => {
    let result = [];
    try {
      const snapshot = await this.db.collection("posts").orderBy("uploadedAt", "desc").get();
      snapshot.forEach(doc => {
        result.push(doc.data())
      });
      return result;
    } catch(err) {
      console.log(err);
    }
  };

  rateMeme = async (rating, id) => {
    try {
      await this.db.collection("posts").doc(id).update({
        ratedBy: firestore.FieldValue.arrayUnion(rating)
      })
    } catch(err) {
      console.log(err);
    }
  }
}

export default new Firebase();