<template>
  <div class="box-msg">
    <div class="container-msg">
      <div class="msg-list">
        <transition-group name="list" appear>
          <div
            class="item-msg"
            v-for="(message, key) in messages"
            :key="message"
          >
            <div class="in-message-bar" :class="message.messageClass">
              <span class="material-icons"> {{ message.messageClass }} </span>
              <p>{{ message.message }}</p>
              <span @click="onDelete(key)" class="material-icons close-message">
                disabled_by_default
              </span>
            </div>
          </div>
        </transition-group>
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

    const messages = computed(() => store.state.messages.messagePool);

    const onDelete = (key) => {
      store.dispatch("removeMessageItem", key);
    };

    return { messages, onDelete };
  },
};
</script>

<style lang="scss" scoped>
.box-msg {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  pointer-events: none;
}

.container-msg {
  width: var(--container);
  margin: 0 auto;
  position: relative;
}

.msg-list {
  position: relative;
  top: 0.6rem;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .item-msg {
    margin-bottom: 1rem;
    pointer-events: all;
  }

  .in-message-bar {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 4px;

    .close-message {
      cursor: pointer;
    }

    p,
    .close-message {
      margin-left: 16px;
    }

    span {
      font-size: 1.5rem;
    }

    &.check_circle {
      background-color: var(--green);

      p,
      span {
        color: var(--bg);
      }
    }

    &.info_outline {
      background-color: var(--blue);

      p,
      span {
        color: var(--bg);
      }
    }

    &.warning_amber {
      background-color: var(--orange);

      p,
      span {
        color: var(--bg);
      }
    }

    &.report_gmailerrorred {
      background-color: var(--red);

      p,
      span {
        color: var(--bg);
      }
    }
  }
}

.list-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.list-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.list-enter-active {
  transition: all 0.4s ease;
}
.list-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.list-leave-active {
  transition: all 0.4s ease;
  position: absolute;
}

.list-move {
  transition: all 0.3s ease;
}
</style>
