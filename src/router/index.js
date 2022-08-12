import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import ProductsView from "../views/product/ProductsView.vue";
import AboutView from "../views/AboutView.vue";
import ProductDetails from "../views/product/ProductDetails.vue";
import LoginView from "../views/auth/LoginView.vue";
import SignupView from "../views/auth/SignupView.vue";
import CartView from "../views/CartView.vue";
import CheckoutView from "../views/CheckoutView.vue";
import FinallyCheckout from "../views/FinallyCheckout.vue";
import AccountView from "../views/AccountView.vue";

import UserProfile from "../views/account/UserProfile.vue";
import OrderHistory from "../views/account/OrderHistory.vue";

import { auth } from "@/firebase";

// auth guard
const requiredAuth = (to, from, next) => {
  let user = auth.currentUser;

  if (!user) {
    next({ name: "login" });
  } else {
    next();
  }
};

const requiredNoAuth = (to, from, next) => {
  let user = auth.currentUser;

  if (user) {
    next({ name: "home" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/products",
    name: "products",
    component: ProductsView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    beforeEnter: requiredNoAuth,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignupView,
    beforeEnter: requiredNoAuth,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutView,
  },
  {
    path: "/checkout/final",
    name: "finally-checkout",
    component: FinallyCheckout,
    beforeEnter: requiredAuth,
  },
  {
    path: "/account",
    name: "account",
    component: AccountView,
    beforeEnter: requiredAuth,
    children: [
      {
        path: "profile",
        name: "profile",
        component: UserProfile,
      },
      {
        path: "order-history",
        name: "order-history",
        component: OrderHistory,
      },
    ],
  },
  {
    path: "/products/:id",
    name: "product-details",
    component: ProductDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
