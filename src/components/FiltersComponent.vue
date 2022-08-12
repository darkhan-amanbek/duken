<template>
  <div class="filter-block">
    <div class="sort-blcok item-filter">
      <h3 class="title-category">Sort by</h3>
      <select v-model="filterParams.sortBy">
        <option value="asc">Lowest price</option>
        <option value="desc">Highest price</option>
      </select>
    </div>
    <div class="category-block item-filter">
      <h3 class="title-category">Categories</h3>
      <ul>
        <li>
          <label>
            <input
              type="checkbox"
              value="TV"
              v-model="filterParams.categories"
            />
            <span class="title">TV</span>
            <span class="count">200</span>
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              value="Desktop"
              v-model="filterParams.categories"
            />
            <span class="title">Desktop</span>
            <span class="count">100</span>
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              value="Game console"
              v-model="filterParams.categories"
            />
            <span class="title">Game console</span>
            <span class="count">130</span>
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              value="PC"
              v-model="filterParams.categories"
            />
            <span class="title">PC</span>
            <span class="count">200</span>
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              value="Smartphone"
              v-model="filterParams.categories"
            />
            <span class="title">Smartphone</span>
            <span class="count">200</span>
          </label>
        </li>
      </ul>
    </div>
    <div class="price-block item-filter">
      <h3 class="title-category">Price</h3>
      <form class="price-filter">
        <label>
          <input
            type="number"
            placeholder="0"
            v-model="filterParams.minPrice"
          />
        </label>
        <span>to</span>
        <label>
          <input
            type="number"
            placeholder="1000"
            v-model="filterParams.maxPrice"
          />
        </label>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const filterParams = reactive({
      categories: [],
      minPrice: 0,
      maxPrice: 100000,
      sortBy: "asc",
    });

    watch(filterParams, async () => {
      await store.dispatch("filter", {
        categories: filterParams.categories,
        minPrice: filterParams.minPrice,
        maxPrice: filterParams.maxPrice,
        sortBy: filterParams.sortBy,
      });
    });

    return { filterParams };
  },
};
</script>

<style lang="scss" scoped>
.filter-block {
  width: calc(25% - 2rem);
  margin-right: 2rem;

  .item-filter {
    padding: 1rem;
    background-color: var(--bg);
    border-radius: 8px;
    margin-bottom: 2rem;

    .title-category {
      margin-bottom: 1rem;
    }

    select {
      margin: 0;
    }
  }

  .category-block {
    ul {
      list-style-type: none;

      li {
        &:not(:last-child) {
          margin-bottom: 1rem;
        }
        label {
          display: flex;
          align-items: center;
          justify-content: start;

          input {
            margin: 0 0.5rem 0 0;
            width: auto;
          }

          span {
            margin-right: 0.5rem;
          }
        }
      }
    }
  }

  .price-block {
    .price-filter {
      display: flex;
      align-items: center;
      padding: 0;
      box-shadow: none;

      label {
        &:first-child {
          margin-right: 1rem;
        }
        input {
          margin: 0;
        }
      }
      span {
        margin-right: 1rem;
      }
    }
  }
}
</style>
