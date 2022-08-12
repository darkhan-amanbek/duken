<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign Up</h3>
    <input type="text" placeholder="First name" required v-model="firstName" />
    <input type="text" placeholder="Last name" required v-model="lastName" />
    <input type="email" placeholder="Email" required v-model="email" />
    <input type="text" placeholder="Number" required v-model="number" />
    <input
      type="password"
      placeholder="Password"
      autocomplete="on"
      required
      v-model="password"
    />
    <button v-if="pending" disabled>Loading...</button>
    <button v-else>Sign up</button>
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
    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const number = ref("");
    const password = ref("");

    const error = ref(null);
    const pending = ref(false);

    const store = useStore();
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        error.value = null;
        pending.value = true;

        await store.dispatch("signup", {
          email: email.value,
          password: password.value,
          firstName: firstName.value,
          lastName: lastName.value,
          number: number.value,
        });

        pending.value = false;
        if (!props.checkout) {
          router.push({ name: "home" });
        }
      } catch (err) {
        error.value = err.message;
        pending.value = false;
      }
    };

    return {
      email,
      password,
      error,
      handleSubmit,
      pending,
      firstName,
      lastName,
      number,
    };
  },
};
</script>

<style></style>
