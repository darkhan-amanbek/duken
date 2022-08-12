<template>
  <header class="site-header">
    <div class="nav-belt">
      <div class="container">
        <div class="wrapper">
          <h1 class="logo">
            <router-link :to="{ name: 'home' }">Online store</router-link>
          </h1>
          <div class="search-block">
            <form class="form-search">
              <input class="search" type="text" placeholder="Search" />
              <button>
                <span class="material-icons"> search </span>
              </button>
            </form>
          </div>
          <div class="btns">
            <template v-if="user && userInfo">
              <button v-if="!userInfo.photoUrl" @click="showDrop = !showDrop">
                <span class="material-icons"> account_circle </span>
              </button>
              <img
                v-if="userInfo.photoUrl"
                @click="showDrop = !showDrop"
                :src="userInfo.photoUrl"
                class="avatar"
              />
              <div v-if="showDrop" ref="dropMenu" class="drop-menu">
                <div class="drop-container">
                  <ul>
                    <li>
                      <router-link :to="{ name: 'profile' }">
                        <span class="material-icons"> account_circle </span>
                        <p>User profile</p>
                      </router-link>
                    </li>
                    <li @click="onLogout">
                      <span class="material-icons"> power_settings_new </span>
                      <p>Logout</p>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
            <template v-if="!user">
              <router-link :to="{ name: 'signup' }" class="btn">
                Sign up
              </router-link>
              <router-link :to="{ name: 'login' }" class="btn">
                Login
              </router-link>
            </template>
            <button class="cart-btn" @click="showPopup = !showPopup">
              <span class="material-icons"> shopping_cart </span>
              <p class="count">({{ totalCount }})</p>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="nav-main">
      <div class="container">
        <ul class="links">
          <li><router-link :to="{ name: 'home' }">Home</router-link></li>
          <li>
            <router-link :to="{ name: 'products' }">Products</router-link>
          </li>
          <li><router-link :to="{ name: 'about' }">About</router-link></li>
        </ul>
      </div>
    </div>
    <CartPopup ref="popup" v-if="showPopup"></CartPopup>
  </header>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
import { onClickOutside } from "@vueuse/core";

import { useStore } from "vuex";
import { useRouter } from "vue-router";

import CartPopup from "./CartPopup.vue";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const popup = ref(null);
    const showPopup = ref(false);

    const dropMenu = ref(null);
    const showDrop = ref(false);

    const totalCount = computed(() => {
      return store.state.cart.cartList.reduce((acc, product) => {
        return acc + product.quantity;
      }, 0);
    });

    onClickOutside(popup, (e) => {
      const element = e.target.closest(".cart-btn");
      if (!element) {
        showPopup.value = false;
      }
    });

    onClickOutside(dropMenu, (e) => {
      const element = e.target.closest(".drop-menu");
      if (!element) {
        showDrop.value = false;
      }
    });

    const onLogout = async () => {
      await store.dispatch("logout");
      router.push({ name: "login" });
    };

    return {
      user: computed(() => store.state.authState.user),
      authIsReady: computed(() => store.state.authState.authIsReady),
      userInfo: computed(() => store.state.authState.userInfo),
      totalCount,
      showPopup,
      popup,
      onLogout,
      dropMenu,
      showDrop,
    };
  },
  components: { CartPopup },
};
</script>

<style lang="scss" scoped>
header {
  margin-bottom: 60px;
  background: white;

  .nav-belt {
    background-color: var(--secondary);

    .wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 0;

      .search-block {
        flex: 1 1 auto;
        margin-left: 16px;
      }

      .btns {
        display: flex;
        align-items: center;
        position: relative;

        .avatar {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          box-shadow: var(--base-shadow);
          cursor: pointer;
        }

        .drop-menu {
          position: absolute;
          top: 3rem;
          right: 0;
          width: 10rem;
          pointer-events: none;

          .drop-container {
            ul {
              list-style-type: none;
              padding: 0.5rem 0;
              background-color: var(--bg);
              box-shadow: var(--base-shadow);
              position: absolute;
              border-radius: 8px;
              top: 0;
              right: 0;
              z-index: 2;
              pointer-events: all;

              li {
                display: flex;
                align-items: center;
                padding: 0.5rem;
                cursor: pointer;

                a {
                  display: flex;
                  align-items: center;
                }

                &:hover {
                  background-color: var(--primary-bg-light);
                }

                span {
                  margin-right: 1rem;
                }
              }
            }
          }
        }
      }
    }
  }

  .nav-main {
    background-color: var(--primary-bg-light);

    .links {
      list-style-type: none;
      display: flex;
      align-items: center;
      padding: 8px 0;

      li:first-child {
        margin-left: 0;
      }

      li {
        a {
          font-weight: 800;
          color: var(--link);

          &.router-link-active {
            color: var(--primary);
          }
        }
      }
    }
  }

  .links li,
  .avatar,
  button,
  .btn,
  h5 {
    margin-left: 16px;
    font-size: 14px;
  }

  @media (max-width: 769px) {
    .nav-belt {
      .wrapper {
        .search-block {
          display: none;
        }
      }
    }
  }

  @media (max-width: 575.98px) {
    .nav-belt {
      .wrapper {
        .logo {
          font-size: 1.2rem;
        }
      }
    }

    .links li,
    button,
    .btn,
    h5 {
      margin-left: 12px;
      font-size: 14px;
    }
  }
}
</style>
