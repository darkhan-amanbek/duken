<template>
  <aside class="sidebar">
    <div class="wrapper-sidebar">
      <div class="top">
        <span class="material-icons"> shopping_cart </span>
        <h3>You have {{ totalCount }} items in your card</h3>
      </div>
      <div class="cart-list">
        <div v-for="product in cartList" :key="product" class="item">
          <div class="img-block">
            <img :src="product.thumbnail_url" />
          </div>
          <div class="info-block">
            <h4 class="title">{{ product.title }}</h4>
            <h4 class="quantity">{{ product.quantity }}</h4>
            <h4 class="price">${{ product.price }}</h4>
          </div>
          <div class="btns">
            <button @click="onDelete(product)">
              <span class="material-icons"> delete_outline </span>
            </button>
            <router-link class="btn" :to="{ name: 'cart' }">
              <span class="material-icons"> edit </span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="total">
        <h1>Total</h1>
        <h1 class="total-price">${{ totalPrice }}</h1>
      </div>
    </div>
    <div class="overlay-out"></div>
  </aside>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const cartList = computed(() => store.state.cart.cartList);

    const onDelete = (product) => {
      store.dispatch("removeItem", product);
    };

    const totalPrice = computed(() => {
      return cartList.value.reduce((acc, product) => {
        return acc + Math.ceil(product.price) * product.quantity;
      }, 0);
    });

    const totalCount = computed(() => {
      return cartList.value.reduce((acc, product) => {
        return acc + product.quantity;
      }, 0);
    });

    return { onDelete, totalPrice, cartList, totalCount };
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 25rem;
  height: 100vh;
  background: var(--bg);
  box-shadow: var(--shadow-btn);
  overflow-y: scroll;

  .wrapper-sidebar {
    .top {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      background: var(--primary);

      span {
        font-size: 4rem;
        margin-bottom: 2rem;
      }

      span,
      h3 {
        color: var(--bg);
      }
    }

    .cart-list {
      padding: 2rem;

      .item {
        display: flex;
        align-items: center;
        padding: 1rem 0 1rem 0;
        border-bottom: 1px solid var(--primary-bg);
        position: relative;

        &:hover {
          .btns {
            opacity: 1;
          }
        }

        .img-block {
          flex-basis: 30%;
          max-width: 30%;
          flex-grow: 0;
          img {
            max-width: 100%;
          }
        }

        .info-block {
          flex-basis: 70%;
          max-width: 70%;
          flex-grow: 0;
          padding: 0 0 0 2rem;

          h4 {
            margin-bottom: 0.4rem;
          }
        }

        .btns {
          flex-basis: 40%;
          flex-grow: 0;
          max-width: 40%;
          right: 0;
          position: absolute;
          opacity: 0;
          background: var(--bg);
          transition: all 0.3s ease-in-out 0s;
          top: 30%;
          display: flex;

          button,
          .btn {
            margin-left: 8px;
          }
        }
      }
    }

    .total {
      padding: 2rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--primary-bg);
    }
  }
}
</style>
