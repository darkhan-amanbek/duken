<template>
  <router-view />
  <MessageComponent></MessageComponent>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

import MessageComponent from "./components/common/MessageComponent.vue";

export default {
  setup() {
    const store = useStore();
    onMounted(() => {
      store.dispatch("loadProducts");
      store.dispatch("getCart");
    });
  },
  components: { MessageComponent },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
