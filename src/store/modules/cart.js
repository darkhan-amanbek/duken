import useLocalStorage from "@/composables/useLocalStorage";

const { updateLocaleStorage } = useLocalStorage();

const cart = {
  state: {
    cartList: [],
  },
  mutations: {
    updateCart(state, { product, quantity = 1 }) {
      const inStateProduct = state.cartList.find(
        (itemProduct) => itemProduct.id === product.id
      );

      if (inStateProduct) {
        if (quantity == 1) {
          inStateProduct.quantity++;
        } else {
          inStateProduct.quantity += quantity;
        }
      } else {
        state.cartList.push({ ...product, quantity: quantity });
      }

      updateLocaleStorage(state.cartList);
    },
    removeItem(state, product) {
      const newList = state.cartList.filter(
        (itemProduct) => itemProduct.id != product.id
      );
      state.cartList = newList;

      updateLocaleStorage(state.cartList);
    },
    updateItemQuantity(state, { product, quantity }) {
      const inStateProduct = state.cartList.find(
        (itemProduct) => itemProduct.id === product.id
      );
      inStateProduct.quantity = quantity;

      updateLocaleStorage(state.cartList);
    },
    getCardFromLocaleStorage(state) {
      const cart = localStorage.getItem("cart");
      if (cart) {
        state.cartList = JSON.parse(cart);
      }
    },
    clearCart(state) {
      state.cartList = [];
      updateLocaleStorage(state.cartList);
    },
  },
  actions: {
    addToCart(context, obj) {
      context.commit("updateCart", obj);
      context.commit("addMessageItem", {
        messageClass: "check_circle",
        message: `${obj.product.title} added to cart`,
        timeOut: 1000,
      });
    },
    removeItem(context, product) {
      context.commit("removeItem", product);
    },
    updateItemQuantity(context, obj) {
      context.commit("updateItemQuantity", obj);
    },
    getCart(context) {
      context.commit("getCardFromLocaleStorage");
    },
    clearCart(context) {
      context.commit("clearCart");
    },
  },
};

export default cart;
