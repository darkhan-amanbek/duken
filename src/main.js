import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/scss/main.scss";
import { auth, firebaseListener } from "./firebase";

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(store).use(router).mount("#app");
  }
  firebaseListener(authStatusChange);
});

// функция которая отправляется в прослушователь
const authStatusChange = (loggedIn, user) => {
  if (store) {
    store.commit("authStateChange");
    console.log(user);
    if (user) {
      store.dispatch("loadTransactionsList", user.uid);
      store.dispatch("loadUserInfo", user.uid);
    }
  }
};
