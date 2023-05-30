<template>
  <section style="flex: 1">
    <div>
      <Header />
    </div>
    <div class="container">
      <div class="" v-for="course in courses" :key="course.$id">
        <div class="card">
          <h3>{{ course.courseTitle }}</h3>
          <div class="pod-details">
            <span>{{ course.courseDesc }}</span> /
            <img :src="course.fileId" alt="audio/mpeg" />
            <span>{{ course.coursePrice }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { databases, storage, createAnonymousSession } from "@/utils/web-init";
import { Query } from "appwrite";
export default {
  name: "Course",
  props: {
    courses: [],
    fileId: String,
    courseTitle: String,
    courseDesc: String,
    coursePrice: String,
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
      const result = await storage.listFiles("64762d12b1b5d1353c66");

      let courses = [];

      result.files.map(async (fileId) => {
        let link = storage.getFileView("64762d12b1b5d1353c66", fileId.$id);

        let courseData = await databases.listDocuments(
          "64762dae57cc0e38353e",
          "64762ea3a135828230ca",
          [Query.equal("fileId", fileId.$id)]
        );

        courses.push({
          id: fileId.$id,
          link,
          courseTitle: courseData.documents[0].courseTitle,
          courseDesc: courseData.documents[0].courseDesc,
          coursePrice: courseData.documents[0].coursePrice,
        });
      });

      this.courses = courses;
    },
  },
};
</script>
