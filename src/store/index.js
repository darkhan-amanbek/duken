import { createStore } from "vuex";
import authState from "./modules/auth";
import products from "./modules/products";
import messages from "./modules/messages";
import cart from "./modules/cart";
import transactions from "./modules/transactions";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    authState,
    products,
    messages,
    cart,
    transactions,
  },
});
