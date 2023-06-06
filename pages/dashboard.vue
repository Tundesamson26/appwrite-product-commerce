<template>
  <div class="u-flex">
    <SideBar />
    <Dashboard style="flex: 1;"/>
  </div>
  <Support/>
</template>
<!-- <script>
import { account } from "~/utils/web-init";

export default {

  async beforeRouteEnter(to, from, next) {
    if (!(await account.get())) {
      // User is not authenticated, redirect to signin page
      next({ path: "/signin" });
    } else {
      next();
    }
  },
};
</script> -->
