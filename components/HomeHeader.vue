<template>
  <header class="main-header u-padding-inline-end-0 astro-I7CAYJX6">
    <button
      class="button is-text is-only-icon is-not-desktop nav-btn astro-I7CAYJX6"
      aria-label="Open Menu"
    >
      <span aria-hidden="true" class="icon-menu astro-I7CAYJX6"></span>
    </button>
    <a class="logo astro-I7CAYJX6" href="/">
      <h1 class="heading-level-5">
        <span class="u-color-text-pink">uCan</span>Earn
      </h1>
    </a>
    <div class="main-header-end u-margin-inline-end-16 astro-I7CAYJX6">
      <ul class="buttons-list is-with-padding astro-I7CAYJX6">
        <div
          class="u-flex u-cross-center u-main-space-between"
          style="padding-right: 20px"
        >
          <li class="buttons-list-item astro-I7CAYJX6">
            <a href="/">How It Works</a>
          </li>
          <li class="buttons-list-item astro-I7CAYJX6">
            <a href="/">Pricing</a>
          </li>
          <button class="buttons-list-item buttons">
            <NuxtLink
              to="/signin"
              title="SignUp"
              rel="noopener noreferrer"
              class="buttons is-text astro-I7CAYJX6"
            >
              <span class="tag u-text-center"> Signin </span>
            </NuxtLink>
          </button>
        </div>
        <li
          class="buttons-list-item is-not-mobile u-padding-inline-0 astro-I7CAYJX6"
        >
          <NuxtLink
            to="signup"
            title="SignUp"
            rel="noopener noreferrer"
            class="button is-text astro-I7CAYJX6"
          >
            <span class="tag u-text-center astro-I7CAYJX6">Signup </span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>
