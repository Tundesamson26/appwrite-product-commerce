<template>
  <header class="main-header u-padding-inline-end-0 astro-I7CAYJX6">
    <button
      class="button is-text is-only-icon is-not-desktop nav-btn menu-bar"
      aria-label="Open Menu"
      @click="toggleMenu"
    >
      <span aria-hidden="true" class="icon-menu"></span>
    </button>
    <a class="logo astro-I7CAYJX6" href="/">
      <h1 class="heading-level-5">
        <span class="u-color-text-pink">uCan</span>Earn
      </h1>
    </a>
    <div class="main-header-end navbar u-margin-inline-end-16 astro-I7CAYJX6">
      <ul class="buttons-list left-menu is-with-padding u-cross-center" :class="{ show: isMenuOpen }">
        <li class="buttons-list-item astro-I7CAYJX6">
          <a href="/">How It Works</a>
        </li>
        <li class="buttons-list-item astro-I7CAYJX6">
          <a href="/">Pricing</a>
        </li>
        <li class="buttons-list-item buttons">
          <NuxtLink
            to="/signin"
            title="Signin"
            rel="noopener noreferrer"
            class="buttons is-text"
          >
            <span class="button is-secondary u-text-center"> Signin </span>
          </NuxtLink>
        </li>
        <li class="buttons-list-item u-padding-inline-0 astro-I7CAYJX6">
          <NuxtLink
            to="signup"
            title="Signup"
            rel="noopener noreferrer"
            class="button is-text"
          >
            <span class="button u-text-center">Signup </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style scoped>
@media (max-width: 700px) {
  .menu-bar {
    display: block;
  }
  .menu-bar:hover {
    opacity: 0.5;
  }
  .navbar ul.left-menu {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    background: #f2f2f2;
    width: 50%;
    min-height: 100%;
    border-right: #ccc 1px solid;
    opacity: 0.9;
    padding: 30px;
    transform: translateX(-500px);
    transition: transform 0.5s ease-in-out;
  }
  .navbar ul.left-menu li {
    padding: 10px;
    border-bottom: #ccc solid 1px;
    font-size: 14px;
  }
  .navbar ul.left-menu li:last-child {
    border-bottom: 0;
  }
  .navbar ul.left-menu.show {
    transform: translateX(0);
  }
}
</style>
