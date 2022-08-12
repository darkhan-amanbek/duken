<template>
  <div class="item-order">
    <div class="header-order">
      <div class="num">{{ index + 1 }}</div>
      <div class="date">{{ orderDate }}</div>
      <div class="price">${{ totalPrice }}</div>
      <button class="light" :class="{ acitve: showList }" @click="onClick">
        <span class="material-icons"> expand_more </span>
      </button>
    </div>
    <div class="content-order" v-if="showList">
      <div class="list-order">
        <div
          class="item-product"
          v-for="product in transaction.cartList"
          :key="product"
        >
          <img :src="product.thumbnail_url" />
          <h4 class="name">{{ product.title }} ({{ product.quantity }})</h4>
          <p class="price">
            ${{ product.quantity * Math.ceil(product.price) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { format } from "date-fns";

export default {
  props: ["transaction", "index"],
  setup(props) {
    const orderDate = computed(() => {
      let time = props.transaction.createdAt.toDate();
      return format(time, "MM.dd.yy");
    });

    const totalPrice = computed(() => {
      return props.transaction.cartList.reduce((acc, product) => {
        return acc + Math.ceil(product.price) * product.quantity;
      }, 0);
    });

    const showList = ref(false);

    const onClick = () => {
      showList.value = !showList.value;
    };

    return { orderDate, totalPrice, onClick, showList };
  },
};
</script>

<style lang="scss" scoped>
.item-order {
  background-color: var(--primary-bg);
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;

  .header-order {
    display: flex;
    align-items: center;

    .num {
      flex-basis: 30%;
      max-width: 30%;
      flex-grow: 0;
    }

    .date {
      flex-basis: 30%;
      max-width: 30%;
      flex-grow: 0;
    }

    .price {
      flex-basis: 30%;
      max-width: 30%;
      flex-grow: 0;
    }

    button {
      margin-left: auto;

      &.acitve {
        span {
          transform: rotate(180deg);
        }
      }
    }
  }

  .content-order {
    .list-order {
      .item-product {
        display: flex;
        padding: 1rem;
        background-color: var(--bg);
        margin-bottom: 1rem;
        border-radius: 8px;
        align-items: center;

        &:first-child {
          margin-top: 1rem;
        }

        img {
          flex-basis: 8%;
          max-width: 8%;
          flex-grow: 0;
          margin-right: 5%;
        }

        .name {
          flex-basis: 50%;
          max-width: 50%;
          flex-grow: 0;
        }

        .price {
          flex-basis: 35%;
          max-width: 35%;
          flex-grow: 0;
          text-align: right;
        }
      }
    }
  }
}
</style>
