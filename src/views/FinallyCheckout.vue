<template>
  <BaseLayout>
    <section class="finally-checkout">
      <template v-if="user">
        <template v-if="transaction">
          <div class="container nano">
            <div class="wrapper">
              <div class="thank-you">
                <h1 class="title">Thank you</h1>
                <h3>
                  Payment is successfully processsed and your order is on the
                  way
                </h3>
                <span class="material-icons"> check_circle </span>
              </div>
              <div class="info-block">
                <div class="info-top">
                  <div class="item">
                    <h3>Summary</h3>
                    <p>Order date: {{ orderDate }}</p>
                    <p>Order total: ${{ totalPrice }}</p>
                  </div>
                  <div class="item">
                    <h3>Ship to</h3>
                    <p>
                      {{ transaction.contactInfo.firstName }}
                      {{ transaction.contactInfo.lastName }}
                    </p>
                    <p>{{ transaction.contactInfo.address }}</p>
                    <p>Contact No. {{ transaction.contactInfo.phone }}</p>
                  </div>
                </div>
                <div class="order-list">
                  <h1>Your Ordered Details</h1>
                  <div
                    v-for="product in transaction.cartList"
                    :key="product"
                    class="item-order"
                  >
                    <div class="img-block">
                      <img :src="product.thumbnail_url" />
                    </div>
                    <div class="name-block">
                      <h3>Product name</h3>
                      <p>{{ product.title }}</p>
                    </div>
                    <div class="quantity-block">
                      <h3>Quantity</h3>
                      <p>{{ product.quantity }}</p>
                    </div>
                    <div class="price-block">
                      <h3>Price</h3>
                      <p>${{ Math.ceil(product.price) * product.quantity }}</p>
                    </div>
                  </div>
                </div>
                <div class="total-block">
                  <h2>Total price</h2>
                  <h2>${{ totalPrice }}</h2>
                </div>
                <div class="btns">
                  <router-link class="btn" :to="{ name: 'home' }">
                    Go To Home
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <SpinnerElem></SpinnerElem>
        </template>
      </template>
    </section>
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import SpinnerElem from "@/components/common/SpinnerElem.vue";

import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

import { format } from "date-fns";

export default {
  components: { BaseLayout, SpinnerElem },
  setup() {
    const store = useStore();

    const user = computed(() => store.state.authState.user);

    const transaction = computed(
      () =>
        store.state.transactions.transactionsList[
          store.state.transactions.transactionsList.length - 1
        ]
    );

    const totalPrice = computed(() => {
      return transaction.value.cartList.reduce((acc, product) => {
        return acc + Math.ceil(product.price) * product.quantity;
      }, 0);
    });

    const orderDate = computed(() => {
      let time = transaction.value.createdAt.toDate();
      return format(time, "MMMM dd, yyyy");
    });

    return { transaction, totalPrice, orderDate, user };
  },
};
</script>

<style lang="scss" scoped>
section.finally-checkout {
  .wrapper {
    background: var(--bg);
    border-radius: 8px;
    box-shadow: var(--base-shadow);
    margin-bottom: 60px;

    .thank-you {
      padding: 2rem;
      text-align: center;

      .title,
      h3 {
        margin-bottom: 2rem;
      }

      .title {
        font-size: 4rem;
      }

      span {
        color: var(--green);
        font-size: 5rem;
      }
    }

    .info-block {
      .info-top {
        display: flex;
        padding: 2rem;

        .item {
          flex-basis: 50%;
          max-width: 50%;
          flex-grow: 0;

          p,
          h3 {
            margin-bottom: 0.5rem;
          }
        }
      }

      .order-list {
        padding: 2rem;
        h1 {
          margin-bottom: 1rem;
        }

        .item-order {
          display: flex;
          align-items: center;
          padding: 1rem 0 1rem 0;
          border-bottom: 1px solid var(--primary-bg);

          h3 {
            margin-bottom: 0.5rem;
          }

          .img-block,
          .name-block,
          .quantity-block,
          .price-blcok {
            flex-basis: 25%;
            flex-grow: 0;
            max-width: 25%;
          }

          .name-block {
            padding: 0 2rem 0 0;
          }

          .img-block {
            img {
              height: auto;
              max-width: 40%;
            }
          }
        }
      }

      .total-block {
        padding: 2rem;
        display: flex;
        justify-content: space-between;
      }

      .btns {
        padding: 2rem;
        display: flex;
      }
    }
  }
}
</style>
