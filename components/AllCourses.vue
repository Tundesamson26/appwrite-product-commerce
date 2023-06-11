<template>
  <section style="flex: 1">
    <div style="padding-top: 10px">
      <div>
        <div class="u-text-center">
          <button class="button u-margin-inline-auto u-margin-block-start-24" @click="showModal = true">
            <span className="icon-plus-sm" aria-hidden="true"></span>
            <span class="text">Add course</span>
          </button>
          <div v-if="showModal" class="modal-overlay" id="dialog">
            <div class="modal">
              <form class="modal-form" method="dialog" @submit.prevent="uploadCourse">
                <header class="modal-header">
                  <h4 class="modal-title heading-level-5">Course</h4>
                  <button class="button is-text is-small is-only-icon" aria-label="Close modal"
                    @click="showModal = false">
                    <span class="icon-x" aria-hidden="true"></span>
                  </button>
                </header>
                <ul class="form-list">
                  <li class="form-item">
                    <label class="label">Title</label>
                    <div class="input-text-wrapper">
                      <input type="text" class="input-text u-padding-inline-end-56" placeholder="Course Title"
                        v-model="courseTitle" />
                    </div>
                  </li>
                  <li class="form-item">
                    <label class="label">File</label>
                    <div class="input-text-wrapper">
                      <input type="file" name="file" id="fileId" size="1" v-on="fileId" />
                    </div>
                  </li>
                  <li class="form-item">
                    <label class="label">Description</label>
                    <div class="input-text-wrapper">
                      <input type="text" class="input-text" placeholder="Course Description" v-model="courseDesc" />
                    </div>
                  </li>
                  <li class="form-item">
                    <label class="label">Price</label>
                    <div class="input-text-wrapper">
                      <input type="text" name="productPrice" placeholder="Price" v-model="coursePrice" />
                    </div>
                  </li>
                </ul>
                <div class="modal-footer">
                  <div class="u-flex u-main-end u-gap-16">
                    <button class="button is-secondary" @click="showModal = false">
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
    <div style="padding-top: 5px;">
      <ListCourses />
    </div>
  </section>
</template>
<script >
import { ref, onMounted } from "vue";
import { Client, Account, Databases, Storage, ID } from "appwrite";
import "@appwrite.io/pink"; // optionally, add icons 
import "@appwrite.io/pink-icons";

export default {
  setup() {
    const showModal = ref(false);
    const courseTitle = ref("");
    const fileId = ref("");
    const courseDesc = ref("");
    const coursePrice = ref("");
    const runtimeConfig = useRuntimeConfig();
    const client = new Client();
    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);

    client
      .setEndpoint(runtimeConfig.public.API_ENDPOINT)
      .setProject(runtimeConfig.public.PROJECT_ID);

    const uploadCourse = async (e) => {
      e.preventDefault();
      try {
        const file = await storage.createFile(
          runtimeConfig.public.COURSE_BUCKET_ID,
          ID.unique(),
          document.getElementById("fileId").files[0]
        );

        await databases.createDocument(
          runtimeConfig.public.COURSE_DB_ID,
          runtimeConfig.public.COURSE_COLLECTION,
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
        alert("Course saved successfully");
      } catch (error) {
        console.log(error);
        alert("Course not saved");
      }
    };

    onMounted(() => {
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
      courseTitle,
      fileId,
      courseDesc,
      coursePrice,
      uploadCourse,
    };
  },
};
</script>
