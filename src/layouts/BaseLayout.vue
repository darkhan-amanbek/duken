<template>
  <HeaderSite></HeaderSite>
  <slot></slot>
</template>

<script>
import HeaderSite from "@/components/HeaderSite.vue";

export default {
  components: { HeaderSite },
};
</script>

<style></style>
