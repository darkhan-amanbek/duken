<template>
  <BaseLayout>
    <section class="checkout">
      <template v-if="cartList.length">
        <template v-if="!user">
          <div class="container">
            <div class="wrapper-login">
              <template v-if="!showRegister">
                <h1>
                  Login first or
                  <span class="toggle-a" @click="showRegister = true">
                    sign up
                  </span>
                </h1>
                <LoginForm :checkout="true"></LoginForm>
              </template>
              <template v-else>
                <h1>
                  Sign up first or
                  <span class="toggle-a" @click="showRegister = false">
                    login
                  </span>
                </h1>
                <SignupForm :checkout="true"></SignupForm>
              </template>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="container min">
            <div class="wrapper-checkout">
              <keep-alive>
                <form class="full" @submit.prevent="onCheckout">
                  <h1>Enter contact information</h1>
                  <input
                    type="text"
                    placeholder="First name"
                    v-model="firstName"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    v-model="lastName"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Your address"
                    v-model="address"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Your number"
                    v-model="number"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    v-model="email"
                    required
                  />
                  <div class="btns">
                    <button disabled v-if="pending">Loading...</button>
                    <button v-else>Checkout</button>
                    <div
                      @click="showSidebar = !showSidebar"
                      class="btn order-btn light"
                    >
                      Show order detail: ${{ totalPrice }}
                    </div>
                  </div>
                </form>
              </keep-alive>
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="container">
          <div class="empty-cart">
            <span class="material-icons"> shopping_cart </span>
            <h1>No product found</h1>
          </div>
        </div>
      </template>
    </section>
    <SideBar ref="sidebarRef" v-if="showSidebar"></SideBar>
  </BaseLayout>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted, ref, watch } from "@vue/runtime-core";

import BaseLayout from "@/layouts/BaseLayout.vue";
import LoginForm from "@/components/LoginForm.vue";
import SignupForm from "@/components/SignupForm.vue";
import SideBar from "@/components/SideBar.vue";

import { Timestamp } from "@firebase/firestore";
import { useRouter } from "vue-router";
import { onClickOutside } from "@vueuse/core";

export default {
  components: { BaseLayout, LoginForm, SignupForm, SideBar },
  setup() {
    const store = useStore();
    const router = useRouter();

    const showRegister = ref(false);
    const pending = ref(false);
    const showSidebar = ref(false);

    const sidebarRef = ref(null);

    const firstName = ref("");
    const lastName = ref("");
    const address = ref("");
    const number = ref("");
    const email = ref("");

    const authIsReady = computed(() => store.state.authState.authIsReady);
    const cartList = computed(() => store.state.cart.cartList);
    const user = computed(() => store.state.authState.user);
    const userInfo = computed(() => store.state.authState.userInfo);
    const totalPrice = computed(() => {
      return cartList.value.reduce((acc, product) => {
        return acc + Math.ceil(product.price) * product.quantity;
      }, 0);
    });

    const onCheckout = async () => {
      const contactInfo = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        number: number.value,
        email: email.value,
      };

      pending.value = true;

      await store.dispatch("addToTransaction", {
        uid: user.value.uid,
        cartList: cartList.value,
        contactInfo,
        createdAt: Timestamp.now(),
      });

      store.dispatch("clearCart");

      pending.value = false;

      router.push({ name: "finally-checkout" });
    };

    // load info page reload
    watch(user, () => {
      if (user.value) {
        email.value = user.value.email;
        firstName.value = userInfo.value.firstName;
        lastName.value = userInfo.value.lastName;
        number.value = userInfo.value.number;
      }
    });

    // load info page mounted
    onMounted(() => {
      if (user.value) {
        email.value = user.value.email;
        firstName.value = userInfo.value.firstName;
        lastName.value = userInfo.value.lastName;
        number.value = userInfo.value.number;
      }
    });

    onClickOutside(sidebarRef, (e) => {
      const element = e.target.closest("aside.sidebar");
      const elementSecond = e.target.closest(".order-btn");
      if (!element && !elementSecond) {
        showSidebar.value = false;
      }
    });

    return {
      user,
      showRegister,
      authIsReady,
      totalPrice,
      cartList,
      onCheckout,
      firstName,
      lastName,
      address,
      number,
      email,
      pending,
      showSidebar,
      sidebarRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper-login {
  text-align: center;

  h1 {
    margin-bottom: 2rem;
  }

  .toggle-a {
    color: var(--link);
    cursor: pointer;
  }
}
.wrapper-checkout {
  form {
    .btns {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
