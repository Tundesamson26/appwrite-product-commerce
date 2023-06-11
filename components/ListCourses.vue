<template>
  <div class="" style="padding-top: 20px">
    <table class="table is-selected-columns-mobile container">
      <thead class="table-thead">
        <tr class="table-row">
          <th class="table-thead-col" style="--p-col-width: 100">
            <span class="eyebrow-heading-3">Name</span>
          </th>
          <th class="table-thead-col is-only-desktop" style="--p-col-width: 200">
            <span class="eyebrow-heading-3">Description</span>
          </th>
          <th class="table-thead-col is-only-desktop" style="--p-col-width: 100">
            <span class="eyebrow-heading-3">Price</span>
          </th>
          <th class="table-thead-col" style="--p-col-width: 30"></th>
        </tr>
      </thead>
      <tbody class="table-tbody">
        <tr v-for="course in courses" :key="course.$id" class="table-row">
          <td class="table-col" data-title="Name">
            <div class="u-inline-flex u-cross-center u-gap-12">
              <div>
                <!-- Display product name -->
                <span class="text u-break-word u-line-height-1-5">
                  {{ course.courseTitle }}
                </span>
              </div>
            </div>
          </td>
          <td class="table-col is-only-desktop" data-title="Type">
            <div>
              <!-- Display product desc -->
              <span class="text u-break-word u-line-height-1-5">
                {{ course.courseDesc }}
              </span>
            </div>
          </td>
          <td class="table-col is-only-desktop" data-title="Size">
            <div>
              <!-- Display product price -->
              <span class="tag"> ${{ course.coursePrice }} </span>
            </div>
          </td>
          <td class="table-col u-overflow-visible">
            <div class="u-flex u-cross-center u-main-end">
              <div>
                <!-- Edit button -->
                <button class="button is-text is-only-icon" type="button" aria-label="more options"
                  @click="editCourse(course.$id)">
                  <span class="icon-pencil"></span>
                </button>
                <div v-if="showModal && editMode && editMode.index !== null" class="modal-overlay" id="dialog">
                  <div class="modal">
                    <form class="modal-form" method="dialog" @submit.prevent="">
                      <header class="modal-header">
                        <h4 class="modal-title heading-level-5">Course</h4>
                        <button class="button is-text is-small is-only-icon" aria-label="Close modal"
                          @click="showModal = false">
                          <span class="icon-x" aria-hidden="true"></span>
                        </button>
                      </header>
                      <ul class="form-list">
                        <li class="form-item">
                          <label class="label">Course Name</label>
                          <div class="input-text-wrapper">
                            <input type="text" class="input-text u-padding-inline-end-56" placeholder="Product name"
                              v-model="courses[editMode.index].courseTitle" />
                          </div>
                        </li>
                        <li class="form-item">
                          <label class="label">Course File</label>
                          <div class="input-text-wrapper">
                            <input type="file" v-on="courses[editMode.index].fileId" />
                          </div>
                        </li>
                        <li class="form-item">
                          <label class="label">Description</label>
                          <div class="input-text-wrapper">
                            <input type="text" class="input-text" placeholder="Product Description"
                              v-model="courses[editMode.index].courseDesc" />
                          </div>
                        </li>
                        <div class="u-flex u-cross-center">
                          <li class="form-item">
                            <label class="label">Price</label>
                            <div class="input-text-wrapper">
                              <input type="text" name="productPrice" placeholder="Price"
                                v-model="courses[editMode.index].coursePrice" />
                            </div>
                          </li>
                        </div>
                      </ul>
                      <div class="modal-footer">
                        <div class="u-flex u-main-end u-gap-16">
                          <button class="button is-secondary" @click="showModal = false">
                            <span class="text">Cancel</span>
                          </button>
                          <button class="button" type="submit" @click.prevent="updateCourse(course.$id)">
                            <span class="text">Update</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <!-- Delete button -->
              <button class="button is-text is-only-icon" type="button" aria-label="more options"
                @click="deleteCourse(course.$id)">
                <span class="icon-trash" aria-hidden="true"></span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination />
</template>
<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.modal {
  position: relative;
  width: 400px;
  background-color: #fff;
  padding: 20px;
  z-index: 10000;
}
</style>

<script lang="js">
import { reactive, ref, onMounted } from "vue";
import Pagination from "@/components/Pagination.vue";
import { Client, Account, Databases, Storage } from "appwrite";
import "@appwrite.io/pink"; // optionally, add icons 
import "@appwrite.io/pink-icons";

export default {
  name: "ListCourses",
  components: {
    Pagination,
  },

  setup() {
    const showModal = ref(false);
    const courses = ref([]);
    const editMode = reactive({ index: null });
    const runtimeConfig = useRuntimeConfig()
    const client = new Client();
    const account = new Account(client);
    const databases = new Databases(client);
    const storage = new Storage(client);

    client
      .setEndpoint(runtimeConfig.public.API_ENDPOINT)
      .setProject(runtimeConfig.public.PROJECT_ID);

    const editCourse = (courseId) => {
      const courseIndex = courses.value.findIndex((course) => course.$id === courseId);
      if (courseIndex !== -1) {
        editMode.index = courseIndex;
        console.log(editMode.index);
        showModal.value = true;
      }
    };

    const updateCourse = async (courseId) => {
      try {
        const courseIndex = courses.value.findIndex((course) => course.$id === courseId);
        if (courseIndex === -1) {
          throw new Error("Courses not found");
        }

        const updatedCourse = { ...courses.value[courseIndex] };
        // Update the courses in the database using the modified data
        await databases.updateDocument(
          runtimeConfig.public.COURSE_DB_ID,
          runtimeConfig.public.COURSE_COLLECTION,
          courseId,
          {
            courseTitle: updatedCourse.coursesName,
            fileId: updatedCourse.fileId,
            courseDesc: updatedCourse.courseDesc,
            coursePrice: updatedCourse.coursePrice,
            // Update other fields as needed
          }
        );

        alert("Course has been updated successfully");
        editMode.index = null; // Exit edit mode
        await getCourses();
      } catch (error) {
        console.log("Error updating course:", error.message);
        alert("Course was not updated");
      }
    };

    const getCourses = async () => {
      try {
        const response = await databases.listDocuments(
          runtimeConfig.public.COURSE_DB_ID,
          runtimeConfig.public.COURSE_COLLECTION,
        );
        const fetchedCourses = response.documents;
        console.log("Successfully retrieved courses:", fetchedCourses);
        courses.value = fetchedCourses;
        return fetchedCourses;
      } catch (error) {
        console.log("Error retrieving courses:", error);
        // Handle the error accordingly (e.g., display an error message)
      }
    };

    const deleteCourse = async (document_id) => {
      try {
        const document = await databases.getDocument(
          runtimeConfig.public.COURSE_DB_ID,
          runtimeConfig.public.COURSE_COLLECTION,
          document_id
        );

        const fileId = document.fileId;

        // Delete the file from storage
        await storage.deleteFile(runtimeConfig.public.COURSE_BUCKET_ID, fileId);

        // Delete the document from the database
        await databases.deleteDocument(
          runtimeConfig.public.COURSE_DB_ID,
          runtimeConfig.public.COURSE_COLLECTION,
          document_id
        );

        alert("Item has been deleted successfully");
        await getCourses();
      } catch (error) {
        console.log("Error deleting product:", error.message);
        alert("Item was not deleted");
      }
    };


    onMounted(async () => {
      await getCourses();
      if (account.get !== null) {
        try {
          client.subscribe("documents", (response) => {
            console.log("anything", response);
          });
        } catch (error) {
          console.log(error, "error");
        }
      }
    });

    return {
      showModal,
      courses,
      editCourse,
      deleteCourse,
      updateCourse,
      editMode
    };
  },
};
</script>
