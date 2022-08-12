import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { watchEffect } from "vue";

const authState = {
  state: {
    user: auth.currentUser,
    isLoggedIn: auth.currentUser != null,
    userInfo: null,
  },
  mutations: {
    authStateChange(state) {
      state.isLoggedIn = auth.currentUser != null;
      state.user = auth.currentUser;
    },
    updateUserInfo(state, payload) {
      state.userInfo = payload;
    },
  },
  actions: {
    async signup(context, { email, password, firstName, lastName, number }) {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
      });

      // add user info
      const docRef = doc(db, "users", res.user.uid);
      setDoc(docRef, {
        firstName: firstName,
        lastName: lastName,
        number: number,
        photoUrl: "",
        photoPath: "",
      });
    },
    async login(context, { email, password }) {
      await signInWithEmailAndPassword(auth, email, password);
    },
    async logout(context) {
      context.commit("clearTransactions");
      context.commit("updateUserInfo", null);
      await signOut(auth);
    },
    async saveUserInfo(context, { uid, info }) {
      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, info);

      context.commit("addMessageItem", {
        messageClass: "check_circle",
        message: `Profile succes updated`,
        timeOut: 1000,
      });
    },

    loadUserInfo(context, uid) {
      const docRef = doc(db, "users", uid);

      const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
        if (docSnapshot.data()) {
          context.commit("updateUserInfo", docSnapshot.data());
        }
      });

      watchEffect((onInvalidate) => {
        onInvalidate(() => {
          unsubscribe();
        });
      });
    },
  },
};

export default authState;
