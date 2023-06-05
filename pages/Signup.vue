<template>
  <section class="container">
    <div>
      <h1 class="u-font-size-32 u-text-center">Create an account</h1>
      <div
        class="card u-cross-center u-width-full-line u-max-width-400"
        style="margin: auto"
      >
        <form
          method="post"
          @submit.prevent="signUp"
          class="form u-margin-block-start-24"
        >
          <ul class="form-list">
            <li class="form-item">
              <label class="label">Email</label>
              <div class="input-text-wrapper">
                <input
                  type="email"
                  class="input-text u-padding-inline-end-56"
                  placeholder="Email address"
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
            <li class="form-item">
              <label class="label">Confirm Password</label>
              <div class="input-text-wrapper" style="--amount-of-buttons: 1">
                <input
                  type="password"
                  class="input-text"
                  placeholder="Confirm Password"
                  v-model.lazy="confirmPassword"
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
              <button class="button" type="submit">Signup</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import "@appwrite.io/pink";
import "@appwrite.io/pink-icons";
import { account, client } from "~/utils/web-init";

account.createAnonymousSession().then(
  (response) => {
    console.log(response);
  },
  (error) => {
    console.log(error);
  }
);

export default {
  data: () => ({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  }),
  mounted() {
    if (account.get !== null) {
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
    signUp: async function () {
      if (this.password.length >= 8) {
        if (this.password === this.confirmPassword) {
          try {
            await account.create(
              "unique()",
              this.email,
              this.password,
              this.name
            );
            alert("account created successfully");
            window.location.href = "/signin";
          } catch (e) {
            console.log(e);
          }
        } else {
          alert("password do not match");
        }
      } else {
        alert("password length should be up to 8 characters");
      }
    },
  },
};
</script>
