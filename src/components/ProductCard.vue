<template>
  <article class="item-card">
    <router-link
      class="link-product"
      :to="{ name: 'product-details', params: { id: product.id } }"
    >
      <div class="top">
        <img class="product-img" :src="product.thumbnail_url" />
        <h5 class="title">{{ product.title }}</h5>
      </div>
    </router-link>
    <div class="bottom">
      <p class="price">{{ Math.ceil(product.price) }} $</p>
      <div class="btns">
        <router-link class="btn" :to="{ name: 'cart' }" v-if="productOnCart">
          <span class="material-icons"> visibility </span>
        </router-link>
        <button v-else @click="addToCart">
          <span class="material-icons"> shopping_cart </span>
        </button>
        <button @click="onBuy">Buy Now</button>
      </div>
    </div>
  </article>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  props: {
    product: {
      type: Object,
    },
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const cartList = computed(() => store.state.cart.cartList);

    const productOnCart = computed(() => {
      return cartList.value.find((product) => product.id === props.product.id);
    });

    const addToCart = () => {
      store.dispatch("addToCart", { product: props.product });
    };

    const onBuy = () => {
      if (!productOnCart.value) {
        store.dispatch("addToCart", { product: props.product });
      }
      router.push({ name: "cart" });
    };

    return { productOnCart, onBuy, addToCart };
  },
};
</script>

<style lang="scss" scoped>
.item-card {
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  transition: all ease-in 0.2s;

  &:hover {
    box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
    transform: scale(1.02);
  }

  .link-product {
    display: flex;
    flex-direction: column;
    padding: 1rem 1rem 0 1rem;
  }

  .product-img,
  .title,
  .price {
    margin-bottom: 1rem;
  }

  .bottom {
    margin-top: auto;
    padding: 0 1rem 1rem 1rem;

    .btns {
      display: flex;

      button,
      .btn {
        margin-right: 1rem;
        span {
          font-size: 22px !important;
        }
      }
    }
  }

  img {
    max-width: 100%;
  }
}
@media (max-width: 575.98px) {
  .item-card {
    &:hover {
      box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
      transform: scale(1);
    }
  }
}
</style>
