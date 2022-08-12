<template>
  <BaseLayout>
    <template v-if="user">
      <div class="account">
        <div class="container">
          <div class="wrapper">
            <div v-if="userInfo" class="hi-block">
              <AvatarImage></AvatarImage>
              <div class="info">
                <h2>Hi {{ userInfo.firstName }} {{ userInfo.lastName }}</h2>
                <p>{{ user.email }}</p>
              </div>
            </div>
            <div class="bottom">
              <div class="navigation-bar">
                <ul>
                  <li>
                    <router-link :to="{ name: 'order-history' }">
                      <span class="material-icons"> history </span>
                      <p>Order history</p>
                    </router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'profile' }">
                      <span class="material-icons"> account_circle </span>
                      <p>Profile</p>
                    </router-link>
                  </li>
                </ul>
              </div>
              <div class="content">
                <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import AvatarImage from "@/components/AvatarImage.vue";

import { computed } from "vue-demi";
import { useStore } from "vuex";
export default {
  components: { BaseLayout, AvatarImage },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.authState.user);
    const userInfo = computed(() => store.state.authState.userInfo);

    return { user, userInfo };
  },
};
</script>

<style lang="scss" scoped>
.account {
  .wrapper {
    .hi-block {
      padding: 1rem;
      background-color: var(--bg);
      border-radius: 8px;
      width: fit-content;
      box-shadow: var(--base-shadow);
      margin-bottom: 1rem;
      display: flex;

      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }

    .bottom {
      display: flex;

      .navigation-bar {
        background-color: var(--bg);
        box-shadow: var(--base-shadow);
        border-radius: 8px;
        width: calc(30% - 1rem);
        margin-right: 1rem;

        ul {
          list-style-type: none;

          li {
            a {
              display: flex;
              align-items: center;
              padding: 1rem 0.5rem;

              &:hover {
                background-color: var(--primary-bg-light);
              }

              &.router-link-active {
                background-color: var(--primary-bg-light);
              }

              span {
                margin-right: 1rem;
              }
            }
          }
        }
      }
      .content {
        width: 70%;
        padding: 1rem;
        border-radius: 8px;
        background: var(--bg);
        box-shadow: var(--base-shadow);
      }
    }
  }
}
</style>
