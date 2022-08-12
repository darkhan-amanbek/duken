<template>
  <BaseLayout>
    <section class="signup-section">
      <div class="container">
        <LoginForm></LoginForm>
      </div>
    </section>
  </BaseLayout>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {
  components: {
    BaseLayout,
    LoginForm,
  },
};
</script>

<style></style>
