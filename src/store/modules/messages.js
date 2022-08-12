const messages = {
  state: {
    messagePool: [],
  },
  mutations: {
    addMessageItem(state, msg) {
      state.messagePool.push(msg);
      setTimeout(() => {
        state.messagePool.shift();
      }, msg.timeOut);
    },
    removeMessageItem(state, index) {
      state.messagePool.splice(index, 1);
    },
  },
  actions: {
    addMessageItem(context, msg) {
      context.commit("addMessageItem", msg);
    },
    removeMessageItem(context, index) {
      context.commit("removeMessageItem", index);
    },
  },
};

export default messages;
