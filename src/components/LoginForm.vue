<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="email" required v-model="email" />
    <input
      type="password"
      placeholder="password"
      autocomplete="on"
      required
      v-model="password"
    />
    <button v-if="pending" disabled>Loading...</button>
    <button v-else>Log in</button>
    <div class="error" v-if="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  props: ["checkout"],
  setup(props) {
    const email = ref("");
    const password = ref("");
    const error = ref(null);
    const pending = ref(false);

    const store = useStore();
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        pending.value = true;
        error.value = null;

        await store.dispatch("login", {
          email: email.value,
          password: password.value,
        });

        if (!props.checkout) {
          router.push({ name: "home" });
        }

        store.dispatch("addMessageItem", {
          messageClass: "check_circle",
          message: "Correct login",
          timeOut: 2000,
        });

        pending.value = false;
      } catch (err) {
        error.value = err.message;
        pending.value = false;
      }
    };

    return { email, password, handleSubmit, pending, error };
  },
};
</script>

<style></style>
