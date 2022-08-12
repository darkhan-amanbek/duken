<template>
  <BaseLayout>
    <section class="cart">
      <div class="container">
        <div class="wrapper">
          <template v-if="cartList.length">
            <h1 class="title-main">Cart</h1>
            <ul class="cart-list">
              <CartItem
                v-for="product in cartList"
                :key="product"
                :product="product"
              ></CartItem>
            </ul>
            <div class="bottom">
              <div class="total-block">
                <h3>Total price:</h3>
                <h2 class="price">${{ totalPrice }}</h2>
              </div>
              <router-link :to="{ name: 'checkout' }" class="light btn">
                Checkout
              </router-link>
            </div>
          </template>
          <template v-else>
            <div class="empty-cart">
              <span class="material-icons"> shopping_cart </span>
              <h1>No product found</h1>
            </div>
          </template>
        </div>
      </div>
    </section>
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import CartItem from "@/components/CartItem.vue";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

export default {
  components: { BaseLayout, CartItem },
  setup() {
    const store = useStore();
    const cartList = computed(() => store.state.cart.cartList);

    const totalPrice = computed(() => {
      return cartList.value.reduce((acc, product) => {
        return acc + Math.ceil(product.price) * product.quantity;
      }, 0);
    });

    return { cartList, totalPrice };
  },
};
</script>

<style lang="scss" scoped>
section.cart {
  .wrapper {
    display: flex;
    flex-direction: column;

    .title-main {
      margin-bottom: 2rem;
    }

    .cart-list {
      list-style-type: none;
    }

    .bottom {
      width: 300px;
      padding: 1rem 0 1rem 0;
      align-self: flex-end;
      display: flex;
      flex-direction: column;
      border-top: 1px solid var(--secondary);

      .total-block {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 1rem;
      }

      .btn {
        align-self: end;
      }
    }
  }
}

@media (max-width: 575.98px) {
  section.cart {
    .wrapper {
      .bottom {
        width: 100%;
      }
    }
  }
}
</style>
