<template>
  <section class="support-wrapper">
    <div class="u-text-center">
      <button
        class="button u-margin-inline-auto u-margin-block-start-24"
        @click="showModal = true"
      >
        <span class="icon-annotation"></span>
      </button>
      <div v-if="showModal" class="modal-overlay" id="dialog">
        <div class="modal">
          <form class="modal-form" method="dialog">
            <header class="modal-header">
              <h4 class="modal-title heading-level-5">Support</h4>
              <button
                class="button is-text is-small is-only-icon"
                aria-label="Close modal"
                @click="showModal = false"
              >
                <span class="icon-x" aria-hidden="true"></span>
              </button>
            </header>
            <div class="card" style="max-width: auto; margin: auto">
              <div>
                <div class="u-text-center u-bold">Chat</div>
              </div>

              <ul class="u-padding-24" style="min-height: 300px">
                <li v-for="message in messages" class="message" :key="message">
                  <div
                    class="message_wrapper u-flex u-cross-center u-cross-child-start u-column-gap-4"
                  >
                    <div class="">
                      <img :src="avatar" alt="avatar" width="25" height="25" />
                    </div>
                    <div class="">{{ message }}</div>
                  </div>
                </li>
              </ul>

              <div>
                <div class="u-flex" style="max-width: 400px">
                  <div class="input">
                    <input
                      id="message-text-field"
                      class="u-max-width-500"
                      type="text"
                      placeholder="Type your message here..."
                      v-model="message"
                    />
                  </div>
                  <button
                    type="submit"
                    class="button"
                    @click.prevent="createChatIfNotExist"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.support-wrapper {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}

.support-button {
  background-color: var(--color-primary-500);
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998; /* Lower z-index than the support button */
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 40px; /* Adjust the margin as needed */
}
</style>
<script>
import { ref, onMounted } from "vue";
// import { generateUsername } from 'unique-username-generator';
import { AvatarGenerator } from "random-avatar-generator";
import {
  createAnonymousSession,
  databases,
  account,
  client,
} from "@/utils/web-init";
import "@appwrite.io/pink";
import "@appwrite.io/pink-icons";
import { ID } from "appwrite";

export default {
  name: "Support",
  setup() {
    const showModal = ref(false);
    const avatar = ref();
    const messages = ref([]);
    const message = ref("");

    const createChatIfNotExist = async () => {
      console.log("Adding user", message.value);
      try {
        await databases.createDocument(
          "647f613b96571dacadf0",
          "647f651f2bc12a78d530",
          "general-chat",
          {
            avatar: avatar.value,
            messages: [...messages.value, message.value],
          }
        );
        message.value = "";
      } catch (error) {
        await databases.updateDocument(
          "647f613b96571dacadf0",
          "647f651f2bc12a78d530",
          "general-chat",
          {
            avatar: avatar.value,
            messages: [...messages.value, message.value],
          }
        );
        console.log("I am unable to create", error.message); // Failure
      }
    };

    onMounted(async () => {
      if (!avatar.value) {
        const _avatar = localStorage.getItem("avatar") || AvatarGenerator();
        localStorage.setItem("avatar", _avatar);
        avatar.value = _avatar;
        console.log(_avatar);
      }

      const result = await databases.getDocument(
        "647f613b96571dacadf0",
        "647f651f2bc12a78d530",
        "general-chat"
      );
      messages.value = result.messages;
    });

    onMounted(() => {
      console.log("anything");
      // Subscribe to collection channel
      const _subscribe = client.subscribe(
        "databases.647f613b96571dacadf0.collections.647f651f2bc12a78d530.documents",
        (response) => {
          console.log("iiiii", response);
          const { payload } = response;
          if (payload?.$id === "general-chat") {
            messages.value = payload.messages;
          }
        }
      );
      return () => {
        _subscribe();
      };
    });

    onMounted(() => {
      createAnonymousSession();
      if (account.get() !== null) {
        try {
          client.subscribe("documents", (response) => {
            console.log(response);
          });
        } catch (error) {
          console.log(error, "error");
        }
      }
    });

    return {
      showModal,
      avatar,
      messages,
      message,
      createChatIfNotExist,
    };
  },
};
</script>

<!-- <script>
import { ref, onMounted } from "vue";
import { AvatarGenerator } from "random-avatar-generator";
import { databases, client, createAnonymousSession } from "@/utils/web-init";
import { ID } from "appwrite";

export default {
  name: "Support",
  setup() {
    const showModal = ref(false);
    const avatar = ref();
    const messages = ref([]);
    const message = ref("");

    const createChatIfNotExist = async () => {
      console.log("Adding user", message.value);
      const newMessage = {
        avatar: avatar.value,
        message: message.value,
      };

      try {
        await databases.createDocument(
          "647f613b96571dacadf0",
          "647f651f2bc12a78d530",
          "general-chat",
          {
            messages: [...messages.value, newMessage],
          }
        );
        message.value = "";
      } catch (error) {
        await databases.updateDocument(
          "647f613b96571dacadf0",
          "647f651f2bc12a78d530",
          "general-chat",
          {
            messages: [...messages.value, newMessage],
          }
        );
        console.log("I am unable to create", error.message); // Failure
      }
    };

    onMounted(async () => {
      if (!avatar.value) {
        const storedAvatar = localStorage.getItem("avatar");
        if (storedAvatar) {
          avatar.value = storedAvatar;
        } else {
          const newAvatar = AvatarGenerator();
          localStorage.setItem("avatar", newAvatar);
          avatar.value = newAvatar;
        }
      }

      const result = await databases.getDocument(
        "647f613b96571dacadf0",
        "647f651f2bc12a78d530",
        "general-chat"
      );
      messages.value = result.messages || [];
    });

    onMounted(() => {
      createAnonymousSession();
      if (account.get() !== null) {
        try {
          client.subscribe("documents", (response) => {
            console.log(response);
          });
        } catch (error) {
          console.log(error, "error");
        }
      }
    });

    onMounted(() => {
      console.log("anything");
      // Subscribe to collection channel
      const _subscribe = client.subscribe(
        "databases.647f613b96571dacadf0.collections.647f651f2bc12a78d530.documents",
        (response) => {
          console.log("iiiii", response);
          const { payload } = response;
          if (payload?.$id === "general-chat") {
            messages.value = payload.messages || [];
          }
        }
      );
      return () => {
        _subscribe();
      };
    });

    return {
      showModal,
      avatar,
      messages,
      message,
      createChatIfNotExist,
    };
  },
};
</script> -->
