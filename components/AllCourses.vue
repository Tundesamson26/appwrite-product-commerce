<template>
  <section style="flex: 1">
    <div style="padding-top: 20px">
      <div>
        <div class="u-text-center">
          <button
            class="button u-margin-inline-auto u-margin-block-start-24"
            @click="showModal = true"
          >
            <span className="icon-plus-sm" aria-hidden="true"></span>
            <span class="text">Add course</span>
          </button>
          <div v-if="showModal" class="modal-overlay" id="dialog">
            <div class="modal">
              <form
                class="modal-form"
                method="dialog"
                @submit.prevent="uploadCourse"
              >
                <header class="modal-header">
                  <h4 class="modal-title heading-level-5">Course</h4>
                  <button
                    class="button is-text is-small is-only-icon"
                    aria-label="Close modal"
                    @click="showModal = false"
                  >
                    <span class="icon-x" aria-hidden="true"></span>
                  </button>
                </header>
                <ul class="form-list">
                  <li class="form-item">
                    <label class="label">Title</label>
                    <div class="input-text-wrapper">
                      <input
                        type="text"
                        class="input-text u-padding-inline-end-56"
                        placeholder="Course Title"
                        v-model="courseTitle"
                      />
                    </div>
                  </li>
                  <li class="form-item">
                    <label class="label">File</label>
                    <div class="input-text-wrapper">
                      <input
                        type="file"
                        name="file"
                        id="fileId"
                        size="1"
                        v-on="fileId"
                      />
                    </div>
                  </li>
                  <li class="form-item">
                    <label class="label">Description</label>
                    <div class="input-text-wrapper">
                      <input
                        type="text"
                        class="input-text"
                        placeholder="Course Description"
                        v-model="courseDesc"
                      />
                    </div>
                  </li>
                  <li class="form-item">
                    <label class="label">Price</label>
                    <div class="input-text-wrapper">
                      <input
                        type="text"
                        name="productPrice"
                        placeholder="Price"
                        v-model="coursePrice"
                      />
                    </div>
                  </li>
                </ul>
                <div class="modal-footer">
                  <div class="u-flex u-main-end u-gap-16">
                    <button
                      class="button is-secondary"
                      @click="showModal = false"
                    >
                      <span class="text">Cancel</span>
                    </button>
                    <button class="button" type="submit">
                      <span class="text">Save</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script >
import { ref, onMounted } from "vue";
import {
  createAnonymousSession,
  databases,
  storage,
  account,
  client,
} from "@/utils/web-init";
import "@appwrite.io/pink";
import "@appwrite.io/pink-icons";
import { ID } from "appwrite";

export default {
  setup() {
    const showModal = ref(false);
    const courseTitle = ref("");
    const fileId = ref("");
    const courseDesc = ref("");
    const coursePrice = ref("");

    const uploadCourse = async (e) => {
      e.preventDefault();
      try {
        const file = await storage.createFile(
          "64762d12b1b5d1353c66",
          ID.unique(),
          document.getElementById("fileId").files[0]
        );

        await databases.createDocument(
          "64762dae57cc0e38353e",
          "64762ea3a135828230ca",
          ID.unique(),
          {
            fileId: file.$id,
            courseTitle: courseTitle.value,
            courseDesc: courseDesc.value,
            coursePrice: coursePrice.value,
          }
        );
        courseTitle.value = "";
        courseDesc.value = "";
        fileId.value = "";
        coursePrice.value = "";
        console.log(response)
        alert("Product saved successfully");
      } catch (error) {
        console.log(error);
        alert("Product not saved");
      }
    };

    onMounted(() => {
      createAnonymousSession();
      if (account.get !== null) {
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
      courseTitle,
      fileId,
      courseDesc,
      coursePrice,
      uploadCourse,
    };
  },
};
</script>
