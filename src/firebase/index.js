import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFXICwrqUU4qoqUPJJnT5iXc5Twcma0HI",
  authDomain: "online-store-60c9f.firebaseapp.com",
  projectId: "online-store-60c9f",
  storageBucket: "online-store-60c9f.appspot.com",
  messagingSenderId: "569812284889",
  appId: "1:569812284889:web:bfe61a76d6066621e355c8",
};

// init firebase
const app = initializeApp(firebaseConfig);

// init service
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const timestamp = serverTimestamp;

const firebaseListener = (func) => {
  const unsub = onAuthStateChanged(
    auth,
    (user) => {
      if (user) {
        func(true, user);
      } else {
        func(false);
      }
      unsub();
    },
    (error) => {
      console.log(error);
      unsub();
    }
  );
};

export { auth, db, storage, timestamp, firebaseListener };
