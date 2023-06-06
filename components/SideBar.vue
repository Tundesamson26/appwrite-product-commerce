<template>
  <section class="sidebar-wrapper">
    <button class="menu-button" @click="toggleSidebar" style="background-color: var(--color-neutral-0);">
        <span class="icon-menu" style="font-size: 30px;"></span>
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
            <NuxtLink class="drop-button" to="/">
              <span class="icon-logout-left" aria-hidden="true"></span>
              <span class="text">Logout</span>
            </NuxtLink>
          </section>
        </div>
      </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      isSidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
  },
};
</script>
<style>
.sidebar-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Set the height to full viewport height */
  flex: 0 0 auto;
  width: 250px;
}

.sidebar {
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
  }

  .sidebar-wrapper .menu-button {
    display: block; /* Show the button only on mobile screens */
  }
}

@media (min-width: 769px) {
  .sidebar-wrapper .menu-button {
    display: none; /* Hide the button on desktop screens */
  }
}
</style>
