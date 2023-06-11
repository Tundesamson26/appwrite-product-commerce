<template>
  <section style="flex: 1">
    <div>
      <Header />
    </div>
    <div class="container">
      <div
        class="u-font-size-32 u-normal u-line-height-1-25"
        style="padding: 5px"
      >
        Courses
      </div>
      <div>
        <ul
          class="grid-box"
          style="
            --grid-gap: 1rem;
            --grid-item-size: 16rem;
            --grid-item-size-small-screens: 8rem;
          "
        >
          <li v-for="course in courses" :key="course.id">
            <div class="card">
              <h3 class="u-bold">{{ course.courseTitle }}</h3>
              <div style="padding: 5px; margin-bottom: 10px">
                <p>{{ course.courseDesc }}</p>
              </div>
              <div class="file-preview">
                <div class="thumbnail">
                  <img :src="getThumbnailUrl(course.link)" alt="Thumbnail" />
                </div>
                <a
                  :href="course.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="preview-link"
                  >Open</a
                >
              </div>

              <div
                class="u-flex u-main-space-between u-cross-center"
                style="padding-top: 10px"
              >
                <span class="tag">${{ course.coursePrice }}</span>
                <!-- <button class="button">
                  <span class="text">Buy</span>
                </button> -->
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
<style scoped>
.file-preview {
  position: relative;
  height: 0;
  padding-bottom: 75%; /* Aspect ratio 4:3 (adjust as needed) */
  overflow: hidden;
}

.thumbnail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-link {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  opacity: 0;
  transition: opacity 0.3s;
}

.preview-link:hover {
  opacity: 1;
}
</style>

<script setup>
import { ref, onMounted } from "vue";
import { getDocument } from "pdfjs-dist";
import { Client, Account, Databases, Storage, Query } from "appwrite";

const courses = ref([]);
const runtimeConfig = useRuntimeConfig();
const client = new Client();
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

client
  .setEndpoint(runtimeConfig.public.API_ENDPOINT)
  .setProject(runtimeConfig.public.PROJECT_ID);

const getCourses = async () => {
  try {
    const result = await storage.listFiles(
      runtimeConfig.public.COURSE_BUCKET_ID
    );
    const fileIds = result.files.map((file) => file.$id);

    const courseDataPromises = fileIds.map(async (fileId) => {
      const link = storage.getFileView(
        runtimeConfig.public.COURSE_BUCKET_ID,
        fileId
      );

      const thumbnailUrl = await getThumbnailUrl(link);

      const courseData = await databases.listDocuments(
        runtimeConfig.public.COURSE_DB_ID,
        runtimeConfig.public.COURSE_COLLECTION,
        [Query.equal("fileId", fileId)]
      );

      return {
        id: fileId,
        link,
        courseTitle: courseData.documents[0].courseTitle,
        courseDesc: courseData.documents[0].courseDesc,
        coursePrice: courseData.documents[0].coursePrice,
        thumbnailUrl: thumbnailUrl,
      };
    });

    const coursesData = await Promise.all(courseDataPromises);
    courses.value = coursesData;
  } catch (error) {
    console.log(error);
  }
};

const getThumbnailUrl = async (fileUrl) => {
  try {
    const loadingTask = getDocument({ url: fileUrl, worker: '/pdf.worker.js' });
    const pdf = await loadingTask.promise;
    const thumbnailPageNum = 1; // The page number to generate the thumbnail from
    const thumbnailScale = 0.5; // The scale factor for the thumbnail size
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const page = await pdf.getPage(thumbnailPageNum);
    const viewport = page.getViewport({ scale: thumbnailScale });

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;

    const thumbnailUrl = canvas.toDataURL();

    return thumbnailUrl;
  } catch (error) {
    console.log(error.message);
    return ""; // Return an empty string if an error occurs during thumbnail generation
  }
};

onMounted(async () => {
  if (account.get !== null) {
    try {
      client.subscribe("documents", (response) => {
        console.log(response);
        getCourses();
      });
    } catch (error) {
      console.log(error, "error");
    }
  }
});
onMounted(async () => {
  await getCourses();
  console.log(getCourses());
});
</script>

<script>
export default {
  name: "Course",
  props: {
    fileId: String,
    courseTitle: String,
    courseDesc: String,
    coursePrice: String,
  },
  setup() {
    return {
      courses,
      getCourses,
      getThumbnailUrl,
    };
  },
};
</script>

<!-- <script>
import { ref, onMounted } from "vue";
import { getDocument } from "pdfjs-dist";

export default {
  setup() {
    const courses = ref([]);

    const getCourses = async () => {
      try {
        // Your existing code to fetch course data

        const courseDataPromises = fileIds.map(async (fileId) => {
          const link = storage.getFileView(
            runtimeConfig.public.COURSE_BUCKET_ID,
            fileId
          );

          const thumbnailUrl = await getThumbnailUrl(link);

          // Rest of your code to populate the courseData object

          return {
            id: fileId,
            link,
            courseTitle: courseData.documents[0].courseTitle,
            courseDesc: courseData.documents[0].courseDesc,
            coursePrice: courseData.documents[0].coursePrice,
            thumbnailUrl: thumbnailUrl,
          };
        });

        const coursesData = await Promise.all(courseDataPromises);
        courses.value = coursesData;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getCourses();
    });

    return {
      courses,
      getThumbnailUrl,
    };
  },
};
</script> -->
