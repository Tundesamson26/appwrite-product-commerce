<template>
  <section>
    <div
      class="card u-cross-center u-width-full-line u-max-width-400"
      style="margin: 100px auto"
    >
      <div class="u-flex u-main-space-between u-cross-center">
        <h6 class="heading-level-6">Welcome back!</h6>
        <button class="icon-x"></button>
      </div>

      <form
        method="post"
        @submit.prevent="signIn"
        class="form u-margin-block-start-24"
      >
        <ul class="form-list">
          <li class="form-item">
            <label class="label">Email</label>
            <div class="input-text-wrapper">
              <input
                type="email"
                class="input-text u-padding-inline-end-56"
                placeholder="email address"
                name="email"
                v-model.lazy="email"
              />
            </div>
          </li>
          <li class="form-item">
            <label class="label">Password</label>
            <div class="input-text-wrapper" style="--amount-of-buttons: 1">
              <input
                type="password"
                class="input-text"
                placeholder="Password"
                v-model.lazy="password"
              />
              <button
                class="show-password-button"
                aria-label="show password"
                type="button"
              >
                <span class="icon-eye" aria-hidden="true"></span>
              </button>
            </div>
          </li>
        </ul>

        <div class="form-footer">
          <div class="u-flex u-main-end u-gap-12">
            <button class="button" type="submit" @click="signIn">
              Login
            </button>
          </div>
          <div class="" style="margin-bottom: -30px; padding-top: 10px;">
            <span>You don't have an account?</span>
            <NuxtLink to="/signup" class="tag" style="margin-left: 5px;">Signup</NuxtLink>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { account, client } from "~/utils/web-init";
import "@appwrite.io/pink"; // optionally, add icons 
import "@appwrite.io/pink-icons";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    if (account.get() !== null) {
      try {
        client.subscribe("documents", (response) => {
          console.log(response);
        });
      } catch (error) {
        console.log(error, "error");
      }
    }
  },

  methods: {
    signIn: async function () {
      try {
        await account.createEmailSession(this.email, this.password);
        alert("user signed in");
        this.$router.push({ path: `/dashboard` });
      } catch (e) {
        alert("user not exist");
        console.log(e);
      }
    },
  },
};
</script>
