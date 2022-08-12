<template>
  <div class="popup-box">
    <div class="popup-container">
      <div class="popup-cart">
        <div class="wrapper-cart">
          <template v-if="cartList.length">
            <ul class="list-product">
              <li
                class="item-product"
                v-for="product in cartList"
                :key="product"
              >
                <img :src="product.thumbnail_url" />
                <div class="info">
                  <h4 class="title">{{ product.title }}</h4>
                  <p class="price">
                    $ {{ Math.ceil(product.price) * product.quantity }}
                    <span>({{ product.quantity }})</span>
                  </p>
                </div>
                <div class="btns">
                  <button @click="onDelete(product)">
                    <span class="material-icons"> delete_outline </span>
                  </button>
                  <router-link class="btn" :to="{ name: 'cart' }">
                    <span class="material-icons"> edit </span>
                  </router-link>
                </div>
              </li>
            </ul>
            <div class="bottom">
              <router-link :to="{ name: 'checkout' }" class="light btn">
                Checkout
              </router-link>
              <p>Total price: ${{ totalPrice }}</p>
            </div>
          </template>
          <template v-else>
            <div class="no-product">
              <span class="material-icons"> shopping_cart </span>
              <h4>No product found</h4>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
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

    return {
      onDelete,
      totalPrice,
      cartList,
    };
  },
};
</script>

<style lang="scss" scoped>
.popup-box {
  position: absolute;
  top: 4rem;
  right: 0;
  width: 100%;
  pointer-events: none;
}

.popup-container {
  width: var(--container);
  margin: 0 auto;
  position: relative;
}

.popup-cart {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  min-width: 350px;
  max-width: 350px;
  box-shadow: var(--shadow-btn);
  background: var(--bg);
  border-radius: 8px;
  pointer-events: all;

  .wrapper-cart {
    display: flex;
    flex-direction: column;

    .no-product {
      padding: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      span {
        margin-bottom: 1rem;
        font-size: 4rem;
      }
    }

    .list-product {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      max-height: 300px;
      overflow: hidden;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-track {
        border-radius: 5px;
      }
      &::-webkit-scrollbar-thumb {
        background: var(--secondary);
        border-radius: 5px;
      }

      li {
        display: flex;
        align-items: center;
        padding: 1rem;
        position: relative;

        &:hover {
          .btns {
            opacity: 1;
          }
        }

        &:not(:last-child) {
          border-bottom: 1px solid var(--primary-bg);
        }

        img {
          flex-basis: 20%;
          flex-grow: 0;
          max-width: 20%;
        }

        .info {
          flex-basis: 75%;
          flex-grow: 0;
          max-width: 75%;
          margin-left: 16px;
        }

        .btns {
          flex-basis: 40%;
          flex-grow: 0;
          max-width: 40%;
          right: 1rem;
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

    .bottom {
      display: flex;
      align-items: center;
      padding: 1rem;
      p {
        margin-left: auto;
      }
    }
  }
}

@media (max-width: 575.98px) {
  .popup-cart {
    min-width: 100%;
    max-width: 100%;

    .wrapper-cart {
      .list-product {
        li {
          .btns {
            opacity: 1;
          }
          .info {
            flex-basis: 40%;
            flex-grow: 0;
            max-width: 40%;
          }
        }
      }
    }
  }
}
</style>
