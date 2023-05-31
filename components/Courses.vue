<template>
  <section style="flex: 1">
    <div>
      <Header />
    </div>
    <div class="container">
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
        <div>
          <object
            :data="course.link"
            type="application/pdf"
            width="100"
            height="100"
          ></object>
        </div>
        <div>
          <span class="tag">{{ course.coursePrice }}</span>
        </div>
      </div>
    </li>
  </ul>
</div>

  </section>
</template>
<script>
import { databases, storage, createAnonymousSession } from "@/utils/web-init";
import { Query } from "appwrite";
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
  },
};
</script>
