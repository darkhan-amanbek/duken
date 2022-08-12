<template>
  <template v-if="userInfo">
    <div class="profile">
      <template v-if="edit">
        <h1>Edit profile info</h1>
        <EditInfo
          @changeEdit="changeEditNow"
          :edit="edit"
          :userInfo="userInfo"
        ></EditInfo>
      </template>
      <template v-else>
        <h1 class="title">Profile Information</h1>
        <ul class="profile-info">
          <li>
            <p class="parameter">First Name:</p>
            <p class="meaning">{{ userInfo.firstName }}</p>
          </li>
          <li>
            <p class="parameter">Last Name:</p>
            <p class="meaning">{{ userInfo.lastName }}</p>
          </li>
          <li>
            <p class="parameter">Mobile Number:</p>
            <p class="meaning">{{ userInfo.number }}</p>
          </li>
        </ul>
        <button @click="edit = !edit">Edit</button>
      </template>
    </div>
  </template>
  <SpinnerElem v-else></SpinnerElem>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import SpinnerElem from "@/components/common/SpinnerElem.vue";
import EditInfo from "./EditInfo.vue";

export default {
  setup() {
    const store = useStore();

    const edit = ref(false);

    const userInfo = computed(() => store.state.authState.userInfo);

    const changeEditNow = () => {
      edit.value = false;
    };

    return { userInfo, edit, changeEditNow };
  },
  components: { SpinnerElem, EditInfo },
};
</script>

<style lang="scss" scoped>
.profile {
  .title {
    margin-bottom: 1rem;
  }
  .profile-info {
    margin-bottom: 1rem;
    list-style-type: none;

    li {
      margin-bottom: 1rem;
      display: flex;

      .parameter {
        width: 14rem;
      }
    }
  }
}
</style>
