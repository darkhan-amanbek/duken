import {
  collection,
  query,
  limit,
  getDocs,
  orderBy,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";

const products = {
  state: {
    isLoading: true,
    productList: [],
    filterProducts: [],
    lastProduct: null,
    limit: 6,
    showBtn: true,
  },
  mutations: {
    updateProductList(state, payload) {
      state.productList = payload;
      state.isLoading = false;
    },
    updateFilterProducts(state, payload) {
      state.productList = payload;
      state.isLoading = false;
    },
    updateLastProduct(state, payload) {
      state.lastProduct = payload;
    },
    changeShowBtn(state, payload) {
      state.showBtn = payload;
    },
  },
  getters: {
    lastProduct: (state) => state.lastProduct,
    limit: (state) => state.limit,
    products: (state) => state.productList,
  },
  actions: {
    async loadProducts(context) {
      const queryProducts = query(
        collection(db, "products"),
        orderBy("title"),
        limit(context.getters.limit)
      );
      const documentSnapshots = await getDocs(queryProducts);
      const products = [];
      documentSnapshots.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });

      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      context.commit("updateProductList", products);
      context.commit("updateLastProduct", lastVisible);
    },
    async more(context) {
      const queryProducts = query(
        collection(db, "products"),
        orderBy("title"),
        limit(context.getters.limit),
        startAfter(context.getters.lastProduct)
      );
      const documentSnapshots = await getDocs(queryProducts);
      const products = [...context.getters.products];

      documentSnapshots.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });

      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      if (!lastVisible) {
        context.commit("changeShowBtn", false);
      }

      context.commit("updateProductList", products);
      context.commit("updateLastProduct", lastVisible);
    },
    async filter(context, { categories, minPrice, maxPrice, sortBy }) {
      var queryProducts;

      if (!categories.length) {
        queryProducts = query(
          collection(db, "products"),
          where("price", ">=", minPrice),
          where("price", "<=", maxPrice),
          orderBy("price", sortBy)
        );
      } else {
        queryProducts = query(
          collection(db, "products"),
          where("categories", "array-contains-any", categories),
          where("price", ">=", minPrice),
          where("price", "<=", maxPrice),
          orderBy("price", sortBy)
        );
      }

      const documentSnapshots = await getDocs(queryProducts);
      const products = [];

      documentSnapshots.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });

      context.commit("updateFilterProducts", products);
    },
  },
};

export default products;
