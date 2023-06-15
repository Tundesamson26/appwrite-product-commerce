<template>
  <section class="container">
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

<script setup>
import { ref, onMounted } from 'vue';
import { Client, Account } from 'appwrite';
import { useRouter } from 'vue-router';

import '@appwrite.io/pink';
import '@appwrite.io/pink-icons';

const client = new Client();
const account = new Account(client);
const runtimeConfig = useRuntimeConfig();
const $router = useRouter();

client
  .setEndpoint(runtimeConfig.public.API_ENDPOINT)
  .setProject(runtimeConfig.public.PROJECT_ID);

const email = ref('');
const password = ref('');

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

const signIn = async () => {
  try {
    await account.createEmailSession(email.value, password.value);
    alert('user signed in');
    $router.push({ path: '/dashboard' });
  } catch (e) {
    alert('user does not exist');
    console.log(e);
  }
};
</script>

