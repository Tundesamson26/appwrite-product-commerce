<template>
  <HomeHeader/>
  <section
    class="u-max-width-650 u-margin-inline-auto u-main-center u-text-center"
    style="margin-top: 50px"
  >
    <h1 class="eyebrow-heading-1 u-color-text-pink u-text-center">uCanEarn</h1>
    <h2 class="heading-level-1 u-margin-block-start-32">
      The best way to sell digital products online
    </h2>
    <p
      class="body-text-1 u-normal u-small u-margin-block-start-16"
      style="padding: 10px"
    >
      uCanEarn is your all-in-one e-commerce store builder to sell any kind of
      digital product and service to anyone, anywhere in the world.
    </p>

    <ul class="hero-buttons u-flex u-gap-16 u-main-center">
      <li>
        <NuxtLink to="/signup" class="button" title="Get Started">
          <span class="text">Start Earning</span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import "@appwrite.io/pink"; // optionally, add icons
import "@appwrite.io/pink-icons";
</script>
