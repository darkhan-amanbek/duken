<template>
  <div class="avatar-block">
    <div class="error" v-if="fileError">{{ fileError }}</div>
    <div class="avatar" :class="{ empty: !userInfo.photoUrl }">
      <div class="upload-btn" @click="onClick">
        <span class="material-icons"> upload </span>
        <p>Upload image</p>
      </div>

      <input @change="onChange" type="file" ref="input" style="display: none" />

      <div class="block-spinner" v-if="isPending">
        <SpinnerElem></SpinnerElem>
      </div>

      <img v-if="userInfo.photoUrl" :src="userInfo.photoUrl" />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import useStorage from "@/composables/useStorage";
import SpinnerElem from "./common/SpinnerElem.vue";

export default {
  setup() {
    const store = useStore();
    const { url, filePath, uploadImage, deleteImage } = useStorage();

    const userInfo = computed(() => store.state.authState.userInfo);
    const user = computed(() => store.state.authState.user);

    const input = ref(null);
    const fileUpload = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);

    const types = ["image/png", "image/jpeg", "image/jpg"];
    const onChange = async (e) => {
      const selected = e.target.files[0];
      if (selected && types.includes(selected.type)) {
        fileUpload.value = selected;
        fileError.value = null;
        isPending.value = true;

        // upload image
        if (userInfo.value.photoUrl) {
          await deleteImage(userInfo.value.photoPath);
        }
        await uploadImage(fileUpload.value, user.value.uid);

        // update user info
        await store.dispatch("saveUserInfo", {
          uid: user.value.uid,
          info: { photoPath: filePath.value, photoUrl: url.value },
        });
        isPending.value = false;
      } else {
        fileUpload.value = null;
        fileError.value = "Please select an image file";
      }
    };

    const onClick = () => {
      input.value.click();
    };

    return { input, onClick, fileError, isPending, onChange, userInfo };
  },
  components: { SpinnerElem },
};
</script>

<style lang="scss" scoped>
.avatar-block {
  margin-right: 1rem;
  position: relative;
  .error {
    position: absolute;
    top: -5rem;
    z-index: 2;
    text-align: center;
  }
}
.avatar {
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  overflow: hidden;
  position: relative;

  .block-spinner {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.6);
  }

  &:hover {
    .upload-btn {
      opacity: 1;
    }
  }

  &.empty {
    background-color: var(--secondary);
    .upload-btn {
      opacity: 1;
    }
  }

  .upload-btn {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--bg-op);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    cursor: pointer;
    opacity: 0;

    p {
      font-size: 0.8rem;
    }
  }

  span {
    font-size: 2rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>
