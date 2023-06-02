<template>
  <section>
    <Home/>
  </section>
</template>
<script>
import Home from "~/components/Home.vue";
import "@appwrite.io/pink"; // optionally, add icons 
import "@appwrite.io/pink-icons";

export default {
  components: {
    Home,
  },
}
</script>