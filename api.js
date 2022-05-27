// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT6nmWdLL7_rd4G7I6zQB77LH4Z0nA93I",
  authDomain: "cinemabookingsite.firebaseapp.com",
  projectId: "cinemabookingsite",
  storageBucket: "cinemabookingsite.appspot.com",
  messagingSenderId: "863880506428",
  appId: "1:863880506428:web:4430c0ed2ced6e0ba7e739",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export const signInWithEmail = async (loginEmail, loginPassword) => {
  await signInWithEmailAndPassword(auth, loginEmail, loginPassword).catch(
    (error) => {
      alert(error.message);
    }
  );
};

export const signUpWithEmail = async (loginEmail, loginPassword) => {
  if (!loginEmail.trim()) return;

  await createUserWithEmailAndPassword(auth, loginEmail, loginPassword).catch(
    (error) => {
      alert(error.message);
    }
  );
};

export const monitorAuthState = async (callback) =>
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);

      getDoc(docRef)
        .then((doc) => {
          if (!doc.data()) {
            setDoc(docRef, { tickets: [] });
          }
        })
        .finally(() =>
          getDoc(docRef).then((doc) => {
            callback({
              tickets: doc.data().tickets ?? [],
              id: user.uid,
              isSignedIn: true,
              name: user.email,
            });
          })
        );
    } else {
      callback({});
    }
  });

export const redirectGoogleSignUp = async () =>
  signInWithRedirect(auth, provider).catch((error) => {
    alert(error.message);
  });

export const signOutFromApp = async () => {
  await signOut(auth);
};

export const fetchData = async (id, collection, setData) => {
  const docRef = doc(db, collection, id);

  await getDoc(docRef).then((doc) => {
    if (doc.data()) {
      setData(doc.data().tickets);
    } else {
      setData(null);
    }
  });
};

export const backUpData = async (id, collection, data) => {
  const docRef = doc(db, collection, id);
  await setDoc(docRef, { tickets: data });
};
