<template>
  <div class="order-history">
    <h1 class="title">Order History</h1>
    <div class="order-list" v-if="filteredTransition">
      <div class="header-list">
        <div class="num">No</div>
        <div class="date">Date</div>
        <div class="price">Total price</div>
      </div>
      <ItemOrderHistory
        v-for="(transaction, key) in filteredTransition"
        :key="key"
        :transaction="transaction"
        :index="key"
      ></ItemOrderHistory>
    </div>
  </div>
</template>

<script>
import { computed } from "vue-demi";
import { useStore } from "vuex";
import ItemOrderHistory from "./ItemOrderHistory.vue";
export default {
  setup() {
    const store = useStore();
    const transactionsList = computed(
      () => store.state.transactions.transactionsList
    );

    // sort by date
    const filteredTransition = computed(() => {
      return transactionsList.value.sort((prev, next) => {
        return (
          new Date(next.createdAt.toDate()) - new Date(prev.createdAt.toDate())
        );
      });
    });

    return { transactionsList, filteredTransition };
  },
  components: { ItemOrderHistory },
};
</script>

<style lang="scss" scoped>
.order-history {
  .order-list {
    .header-list {
      display: flex;
      padding: 1rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--primary-bg);

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
    }
  }
}
</style>
