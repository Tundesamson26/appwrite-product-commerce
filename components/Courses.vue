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
              <h3>{{ course.courseTitle }}</h3>
              <div>
                <p>{{ course.courseDesc }}</p>
              </div>
              <div class="file-preview">
                <div class="thumbnail">
                  <img :src="getThumbnail(course.link)" alt="Thumbnail" />
                </div>
                <a
                  :href="course.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="preview-link"
                  >Open</a
                >
              </div>

              <div>
                <span class="tag">{{ course.coursePrice }}</span>
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

<script>
import { databases, storage, createAnonymousSession } from "@/utils/web-init";
import { Query } from "appwrite";
import { PDFDocumentProxy } from "pdfjs-dist/build/pdf";

export default {
  name: "Course",
  props: {
    fileId: String,
    courseTitle: String,
    courseDesc: String,
    coursePrice: String,
  },
  data() {
    return {
      courses: [],
    };
  },
  mounted() {
    createAnonymousSession();
    this.getCourses();
    console.log(this.getCourses());
    if (account.get !== null) {
      try {
        client.subscribe("documents", (response) => {
          console.log(response);
          this.getCourses();
        });
      } catch (error) {
        console.log(error, "error");
      }
    }
  },
  methods: {
    async getCourses() {
      try {
        const result = await storage.listFiles("64762d12b1b5d1353c66");
        const fileIds = result.files.map((file) => file.$id);

        const courseDataPromises = fileIds.map(async (fileId) => {
          const link = storage.getFileView("64762d12b1b5d1353c66", fileId);

          const courseData = await databases.listDocuments(
            "64762dae57cc0e38353e",
            "64762ea3a135828230ca",
            [Query.equal("fileId", fileId)]
          );

          return {
            id: fileId,
            link,
            courseTitle: courseData.documents[0].courseTitle,
            courseDesc: courseData.documents[0].courseDesc,
            coursePrice: courseData.documents[0].coursePrice,
          };
        });

        const courses = await Promise.all(courseDataPromises);
        this.courses = courses;
      } catch (error) {
        console.log(error);
      }
    },
    
    async getThumbnail(fileUrl) {
      try {
        const pdf = await PDFDocumentProxy.create(fileUrl);
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
        console.log(error);
        return ""; // Return an empty string if an error occurs during thumbnail generation
      }
    },
  },
};
</script>
