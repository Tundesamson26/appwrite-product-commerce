<template>
  <section class="sidebar-wrapper">
    <button
      class="menu-button"
      @click="toggleSidebar"
      style="background-color: var(--color-neutral-0)"
    >
      <span class="icon-menu" style="font-size: 30px"></span>
    </button>
    <div class="side-nav sidebar" :class="{ 'sidebar-open': isSidebarOpen }">
      <Profile />
      <div class="side-nav-main">
        <section class="drop-section">
          <ul class="drop-list">
            <li class="drop-list-item">
              <nuxt-link to="/dashboard" class="drop-button" exact>
                <span class="icon-home" aria-hidden="true"></span>
                <span class="text">Dashboard</span>
              </nuxt-link>
            </li>
            <li class="drop-list-item">
              <nuxt-link to="/wallet" class="drop-button">
                <span class="icon-document" aria-hidden="true"></span>
                <span class="text">Wallet</span>
              </nuxt-link>
            </li>
            <li class="drop-list-item">
              <nuxt-link to="/products" class="drop-button">
                <span class="icon-user-group" aria-hidden="true"></span>
                <span class="text">All Products</span>
              </nuxt-link>
            </li>
            <li class="drop-list-item">
              <nuxt-link to="/courses" class="drop-button">
                <span class="icon-briefcase" aria-hidden="true"></span>
                <span class="text">Courses</span>
              </nuxt-link>
            </li>
            <li class="drop-list-item">
              <nuxt-link to="/sales" class="drop-button">
                <span class="icon-chart-bar" aria-hidden="true"></span>
                <span class="text">Sales</span>
              </nuxt-link>
            </li>
          </ul>
        </section>
      </div>
      <div class="side-nav-bottom" style="padding-top: 30px">
        <section class="drop-section">
          <button class="drop-button" @click="logOut" type="button">
            <span class="icon-logout-left" aria-hidden="true"></span>
            <span class="text">Logout</span>
          </button>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Client, Account } from "appwrite";
import { useRouter } from 'vue-router';
import "@appwrite.io/pink"; 
import "@appwrite.io/pink-icons";

const client = new Client();
const account = new Account(client);
const runtimeConfig = useRuntimeConfig();
const $router = useRouter();


client
  .setEndpoint(runtimeConfig.public.API_ENDPOINT)
  .setProject(runtimeConfig.public.PROJECT_ID);

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

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const logOut = async () => {
  try {
    await account.deleteSession('current');
    $router.push({ path: '/' });
    alert('See ya later 🎉');
  } catch (err) {
    console.error(err.message);
    alert('Encountered an error 😪');
  }
};
</script>

<style>
.sidebar-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  flex: 0 0 auto;
  width: 250px;
}

.sidebar {
  position: fixed;
  flex: 0 0 auto;
  width: 250px;
  flex: 1; /* Allow the sidebar to expand to fill the available height */
  overflow-y: auto; /* Enable vertical scrolling if content overflows */
  transition: width 0.3s ease; /* Add a smooth transition for width changes */
}

.sidebar-open {
  width: 250px; /* Set the width to its original value when open */
}

.menu-button {
  display: none; /* Hide the button by default */
}

@media (max-width: 768px) {
  .sidebar-wrapper .sidebar {
    width: 0; /* Set the width to zero when closed on mobile screens */
  }

  .sidebar-wrapper .sidebar-open {
    width: 250px; /* Set the width to its original value when open on mobile screens */
    z-index: 999;
  }

  .sidebar-wrapper .menu-button {
    display: block; /* Show the button only on mobile screens */
  }
}

@media (min-width: 769px) {
  .sidebar-wrapper .menu-button {
    display: none;
  }
}
</style>
