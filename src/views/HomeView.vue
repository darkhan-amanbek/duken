<template>
  <BaseLayout>
    <section v-if="!isLoading" class="products">
      <div class="container">
        <div class="wrapper">
          <ProductCard
            v-for="(product, key) in products"
            :key="key"
            :product="product"
          ></ProductCard>
        </div>
        <div class="btns">
          <template v-if="showBtn">
            <button class="light" v-if="!pending" @click="more">More</button>
            <button class="light" disabled v-else>Loading...</button>
          </template>
        </div>
      </div>
    </section>
    <SpinnerElem v-else></SpinnerElem>
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import ProductCard from "@/components/ProductCard.vue";
import SpinnerElem from "@/components/common/SpinnerElem.vue";

import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";

import { ref } from "vue";

// @ is an alias to /src

export default {
  name: "HomeView",
  components: { BaseLayout, ProductCard, SpinnerElem },
  setup() {
    const store = useStore();
    const pending = ref(false);

    const more = async () => {
      pending.value = true;
      await store.dispatch("more");
      pending.value = false;
    };

    return {
      products: computed(() => store.state.products.productList),
      isLoading: computed(() => store.state.products.isLoading),
      showBtn: computed(() => store.state.products.showBtn),
      pending,
      more,
    };
  },
};
</script>

<style lang="scss" scoped>
section.products {
  .wrapper {
    width: calc(100% + 32px);
    display: flex;
    flex-wrap: wrap;

    .item-card {
      width: calc((100% / 4) - 32px);
      margin: 0 32px 32px 0;
    }
  }
  .btns {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: 1024px) {
  section.products {
    .wrapper {
      .item-card {
        width: calc((100% / 3) - 32px);
      }
    }
  }
}

@media (max-width: 768px) {
  section.products {
    .wrapper {
      .item-card {
        width: calc((100% / 2) - 32px);
      }
    }
  }
}

@media (max-width: 575.98px) {
  section.products {
    .wrapper {
      width: 100%;
      .item-card {
        width: calc((100% / 1));
        margin: 0 0 32px 0;
      }
    }
  }
}
</style>
