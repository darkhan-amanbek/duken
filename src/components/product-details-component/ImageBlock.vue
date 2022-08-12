<template>
  <div class="image-block">
    <div class="list-image">
      <ul>
        <li
          v-for="(img, key) in images"
          :key="key"
          :style="'background-image:url(' + img + ');'"
          @mouseover="onHover(img, $event)"
          @click="onHover(img, $event)"
          class="item-image"
          :class="{ active: key == 0 ? true : false }"
        ></li>
      </ul>
    </div>
    <div class="main-image">
      <img :src="currentImg" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["images"],
  data() {
    return {
      currentImg: this.images[0],
    };
  },
  methods: {
    onHover(img, event) {
      const element = event.target;

      const parent = element.closest("ul");
      const activeBefore = parent.querySelector(".active");

      activeBefore.classList.remove("active");
      element.classList.add("active");

      this.currentImg = img;
    },
  },
};
</script>

<style lang="scss" scoped>
.list-image ul {
  list-style-type: none;
  margin-right: 1rem;

  li {
    padding: 2rem;
    margin-bottom: 1rem;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 8px;
    border: 2px solid transparent;

    &.active {
      border: 2px solid var(--secondary);
    }
  }
}

.main-image {
  flex: 1 1 auto;
  img {
    width: 100%;
    border-radius: 8px;
  }
}
</style>
