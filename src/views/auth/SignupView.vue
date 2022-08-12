<template>
  <BaseLayout>
    <section class="signup-section">
      <div class="container">
        <SignupForm></SignupForm>
      </div>
    </section>
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import SignupForm from "@/components/SignupForm.vue";

export default {
  components: { BaseLayout, SignupForm },
};
</script>

<style></style>
