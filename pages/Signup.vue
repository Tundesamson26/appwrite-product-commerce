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
            <div class="" style="margin-bottom: -30px; padding-top: 10px;">
            <span>You already have an account?</span>
            <NuxtLink to="/signin" class="tag" style="margin-left: 5px;">Signin</NuxtLink>
          </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Client, Account } from "appwrite";
import "@appwrite.io/pink"; // optionally, add icons 
import "@appwrite.io/pink-icons";

const client = new Client();
const account = new Account(client);
const runtimeConfig = useRuntimeConfig();


client
  .setEndpoint(runtimeConfig.public.API_ENDPOINT)
  .setProject(runtimeConfig.public.PROJECT_ID);

const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

onMounted(() => {
  if (account.get() !== null) {
    try {
      client.subscribe('documents', (response) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error, 'error');
    }
  }
});

const signUp = async () => {
  if (password.value.length >= 8) {
    if (password.value === confirmPassword.value) {
      try {
        await account.create('unique()', email.value, password.value, name.value);
        alert('Account created successfully');
        window.location.href = '/signin';
      } catch (e) {
        console.log(e);
      }
    } else {
      alert('Passwords do not match');
    }
  } else {
    alert('Password length should be at least 8 characters');
  }
};
</script>
