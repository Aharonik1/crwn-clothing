import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDO_Of4jy2fEAgEZlj76qmkX4lHfEMW9EE",
  authDomain: "crwn-db-a02.firebaseapp.com",
  databaseURL: "https://crwn-db-a02.firebaseio.com",
  projectId: "crwn-db-a02",
  storageBucket: "crwn-db-a02.appspot.com",
  messagingSenderId: "335473274901",
  appId: "1:335473274901:web:57101e3dcf33a5f5f75e1c",
  measurementId: "G-WW2KZGE33M",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
