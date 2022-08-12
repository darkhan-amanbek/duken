<template>
  <BaseLayout>
    <section class="products">
      <div class="container">
        <div class="wrapper">
          <FiltersComponent></FiltersComponent>
          <div class="block-products">
            <div class="products-list">
              <template v-if="filterProducts.length">
                <ProductCard
                  v-for="(product, key) in filterProducts"
                  :key="key"
                  :product="product"
                ></ProductCard>
              </template>
              <template v-else>
                <ProductCard
                  v-for="(product, key) in products"
                  :key="key"
                  :product="product"
                ></ProductCard>
              </template>
            </div>
            <div class="more-block">
              <template v-if="showBtn">
                <button class="light" v-if="!pending" @click="more">
                  More
                </button>
                <button class="light" disabled v-else>Loading...</button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </section>
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import ProductCard from "@/components/ProductCard.vue";
import FiltersComponent from "../../components/FiltersComponent.vue";

import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  components: { BaseLayout, ProductCard, FiltersComponent },
  setup() {
    const store = useStore();

    const products = computed(() => store.state.products.productList);
    const filterProducts = computed(() => store.state.products.filterProducts);

    const pending = ref(false);

    const showBtn = computed(() => store.state.products.showBtn);

    const more = async () => {
      pending.value = true;
      await store.dispatch("more");
      pending.value = false;
    };

    return { products, more, showBtn, pending, filterProducts };
  },
};
</script>

<style lang="scss" scoped>
section.products {
  .wrapper {
    display: flex;

    .filter-block {
      width: calc(25% - 2rem);
      margin-right: 2rem;
    }

    .block-products {
      width: 75%;

      .products-list {
        width: calc(100% + 32px);
        display: flex;
        flex-wrap: wrap;
        .item-card {
          width: calc((100% / 3) - 32px);
          margin: 0 32px 32px 0;
        }
      }
      .more-block {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
