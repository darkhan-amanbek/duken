import { db } from "@/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { watchEffect } from "vue";

const transactions = {
  state: {
    transactionsList: [],
  },
  mutations: {
    updateTransactionsList(state, payload) {
      state.transactionsList = payload;
    },
    clearTransactions(state) {
      state.transactionsList = [];
    },
  },
  actions: {
    async addToTransaction(context, { uid, cartList, contactInfo, createdAt }) {
      const docRef = doc(db, "transactions", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const newTransactions = docSnap.data().transactionList;
        newTransactions.push({ cartList, contactInfo, createdAt });
        await updateDoc(docRef, { transactionList: newTransactions });
      } else {
        setDoc(docRef, {
          transactionList: [{ cartList, contactInfo, createdAt }],
        });
      }

      context.commit("addMessageItem", {
        messageClass: "check_circle",
        message: `Succes transaction`,
        timeOut: 1000,
      });
    },
    loadTransactionsList(context, uid) {
      const docRef = doc(db, "transactions", uid);

      const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
        if (docSnapshot.data()) {
          context.commit(
            "updateTransactionsList",
            docSnapshot.data().transactionList
          );
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

export default transactions;
