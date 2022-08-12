<template>
  <form class="" ref="form" @submit.prevent="onSubmit">
    <input
      type="text"
      placeholder="First name"
      required
      v-model="infoSave.firstName"
    />
    <input
      type="text"
      placeholder="Last name"
      required
      v-model="infoSave.lastName"
    />
    <input
      type="text"
      placeholder="Mobile Number"
      required
      v-model="infoSave.number"
    />
    <button v-if="pending" disabled>Saving...</button>
    <button v-else>Save</button>
  </form>
  <div class="btns">
    <button @click="changeEdit">Cancel</button>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

export default {
  props: ["userInfo", "edit"],
  emits: ["changeEdit"],
  setup(props, context) {
    const store = useStore();

    const infoSave = ref({});
    const pending = ref(false);

    const form = ref(null);

    const user = computed(() => store.state.authState.user);

    // load info if user reload page
    watch(props.userInfo, () => {
      infoSave.value = { ...props.userInfo };
    });

    // load mounted page
    onMounted(() => {
      infoSave.value = { ...props.userInfo };
    });

    const changeEdit = () => {
      context.emit("changeEdit");
    };

    const onSave = () => {
      form.value.submit();
    };

    const onSubmit = async () => {
      pending.value = true;

      await store.dispatch("saveUserInfo", {
        uid: user.value.uid,
        info: infoSave.value,
      });

      pending.value = false;

      changeEdit();
    };

    return { infoSave, onSubmit, changeEdit, user, pending, form, onSave };
  },
};
</script>

<style lang="scss" scoped>
form {
  max-width: 100%;
  margin-bottom: 1rem;
  box-shadow: none;
  padding: 0;
}

.btns {
  display: flex;

  button {
    margin-right: 1rem;
  }
}
</style>
