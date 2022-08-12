<template>
  <BaseLayout>
    <section class="product-details">
      <div class="container">
        <div class="wrapper">
          <template v-if="!isLoading">
            <ImageBlock :images="imgs"></ImageBlock>
            <div class="info-block">
              <h1 class="title">{{ product.title }}</h1>
              <h4 class="price">${{ product.price }}</h4>
              <ul class="params">
                <li class="param">
                  <span class="w-bold">Availablity</span> :
                  <span class="w-regular">In Stocks</span>
                </li>
                <li class="param">
                  <span class="w-bold">Product Code</span> :
                  <span class="w-regular">#EM1202</span>
                </li>
                <li class="param">
                  <span class="w-bold">Tags</span> :
                  <span class="w-regular">Winter Men Jacket</span>
                </li>
              </ul>
              <ul class="properties">
                <li class="property">Loose Fit</li>
                <li class="property">Pure Leather</li>
                <li class="property">Free Shipping and delivery in 2 Days</li>
              </ul>
              <p class="description">{{ product.description }}</p>
              <div class="actions">
                <div class="quantity">
                  <input type="number" min="0" v-model="quantity" />
                </div>
              </div>
              <div class="btns">
                <router-link
                  class="btn light"
                  :to="{ name: 'cart' }"
                  v-if="productOnCart"
                >
                  View cart
                </router-link>
                <button v-else @click="addToCart" class="light">
                  Add To Card
                </button>
                <button @click="onBuy" class="light">By Now</button>
              </div>
            </div>
          </template>
          <SpinnerElem v-else></SpinnerElem>
        </div>
      </div>
    </section>
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import ImageBlock from "../../components/product-details-component/ImageBlock.vue";
import SpinnerElem from "@/components/common/SpinnerElem.vue";

import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  props: ["id"],
  data(props) {
    const store = useStore();
    const router = useRouter();

    const quantity = ref(1);

    const product = computed(() => {
      return store.state.products.productList.find(
        (itemProduct) => itemProduct.id === props.id
      );
    });

    const cartList = computed(() => store.state.cart.cartList);

    const productOnCart = computed(() => {
      return cartList.value.find((product) => product.id === props.id);
    });

    const addToCart = () => {
      store.dispatch("addToCart", {
        product: product.value,
        quantity: quantity.value,
      });
    };

    const onBuy = () => {
      if (!productOnCart) {
        store.dispatch("addToCart", {
          product: product.value,
          quantity: quantity.value,
        });
      }
      router.push({ name: "cart" });
    };

    return {
      imgs: [
        "https://www.dropbox.com/s/swg9bdr0ejcbtrl/img9.jpg?raw=1",
        "https://www.dropbox.com/s/d45c3pap1h4cu0y/img5.jpg?raw=1",
        "https://www.dropbox.com/s/rjj1vtdx79xptu0/img6.jpeg?raw=1",
        "https://www.dropbox.com/s/miym588nx2lscqt/img7.jpg?raw=1",
      ],
      product,
      isLoading: computed(() => store.state.products.isLoading),
      quantity,
      addToCart,
      onBuy,
      productOnCart,
    };
  },
  components: { BaseLayout, ImageBlock, SpinnerElem },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;

  .image-block {
    display: flex;
    flex-basis: 45%;
  }

  .info-block {
    flex-grow: 1;
    flex-basis: 0;
    padding: 0 0 0 3rem;

    .title,
    .price,
    .params,
    .properties,
    .description {
      margin-bottom: 1.5rem;
    }

    .params {
      list-style-type: none;
    }

    .properties {
      padding-left: 17px;
    }

    .btns {
      display: flex;

      button,
      .btn {
        margin-right: 16px;
      }
    }
  }
}
</style>
