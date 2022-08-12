<template>
  <li class="item-card">
    <img class="img-card" :src="product.thumbnail_url" />
    <div class="info-card">
      <h4 class="title">{{ product.title }}</h4>
      <p class="description">{{ product.description }}</p>
    </div>
    <div class="count-card">
      <input
        type="number"
        min="1"
        max="100"
        @input="onUpdate($event)"
        v-model="countValue"
      />
    </div>
    <h4 class="price-card">${{ subTotal }}</h4>
    <div class="btns">
      <button @click="onDelete">
        <span class="material-icons"> delete_outline </span>
      </button>
    </div>
  </li>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  props: ["product"],
  setup(props) {
    const store = useStore();

    const countValue = ref(null);

    onMounted(() => {
      countValue.value = props.product.quantity;
    });

    const subTotal = computed(
      () => props.product.quantity * Math.ceil(props.product.price)
    );

    const onDelete = () => {
      store.dispatch("removeItem", props.product);
    };

    const onUpdate = (e) => {
      onInput(e);

      store.dispatch("updateItemQuantity", {
        product: props.product,
        quantity: countValue.value,
      });
    };

    const onInput = (e) => {
      const input = e.target;
      const min = Number(input.min);
      const max = Number(input.max);

      if (countValue.value > max) {
        countValue.value = max;
      } else if (countValue.value < min) {
        countValue.value = min;
      }
    };

    return { onDelete, onUpdate, countValue, onInput, subTotal };
  },
};
</script>

<style lang="scss" scoped>
.item-card {
  display: flex;
  align-items: center;
  border-radius: 8px;
  background: var(--bg);
  margin-bottom: 1rem;

  .img-card,
  .info-card,
  .count-card,
  .price-card,
  .btns {
    padding: 1rem;
  }

  .info-card,
  .count-card,
  .price-card {
    margin-left: 16px;
  }

  .btns {
    margin-left: auto;
  }

  .img-card {
    flex-basis: 5%;
    flex-grow: 0;
    max-width: 5%;
  }

  .count-card {
    flex-basis: 10%;
    flex-grow: 0;
    max-width: 10%;
  }

  .price-card {
    flex-basis: auto;
    flex-grow: 1;
    text-align: center;
  }

  .info-card {
    flex-basis: 40%;
    flex-grow: 0;
    max-width: 40%;
  }
}

@media (max-width: 575.98px) {
  .item-card {
    flex-direction: column;
    padding: 1rem;

    .info-card {
      .description {
        display: none;
      }
    }

    .btns {
      button {
        span {
          font-size: 2rem !important;
        }
      }
    }

    .count-card,
    .img-card,
    .info-card,
    .price-card,
    .btns {
      width: 100%;
      max-width: 100%;
      margin: 0 0 1rem 0;
      padding: 0;
      text-align: left;
    }
  }
}
</style>
