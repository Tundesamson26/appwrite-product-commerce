<template>
  <HomeHeader />
  <section class="container u-full-screen-height" style="margin-top: 2s0px">
    <div class="content">
      <div class="content-header">
        <h1 class="heading-level-4 u-text-center u-bold">
          <span class="u-color-text-pink">uCan</span>Earn
        </h1>
      </div>
      <div class="flex-container" style="padding-top: 20px">
        <div class="content-text">
          <h2 class="heading-level-1 u-margin-block-start-32 content-head">
            The best way to sell digital products online
          </h2>
          <p
            class="body-text-1 u-normal u-small u-margin-block-start-16 context-para"
            style="padding-bottom: 10px; font-size: 18px;"
          >
            <span class="u-bold"><span class="u-color-text-pink">uCan</span>Earn</span> is your all-in-one e-commerce store builder to sell any
            kind of digital product and service to anyone, anywhere in the
            world.
          </p>

          <ul class="hero-buttons">
            <li>
              <NuxtLink to="/signup" class="button" title="Get Started">
                <span class="text">Start Selling</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div class="content-img">
          <img src="/product2.png" alt="Hero Image" />
        </div>
      </div>
    </div>
  </section>
</template>
<style>
.flex-container {
  display: flex;
  justify-content: center; /* Center the flex items horizontally */
  align-items: center; /* Center the flex items vertically */
  flex-wrap: wrap; /* Allow the flex items to wrap to a new line if needed */
}
.content-text {
  flex: 1 0 50%; /* Adjust the width of the content text */
  max-width: 100%; /* Ensure the content text does not exceed the container width */
  padding: 20px;
}

.content-img {
  flex: 1 0 50%; /* Adjust the width of the content image */
  max-width: 100%; /* Ensure the content image does not exceed the container width */
  text-align: center; /* Center the image horizontally within the container */
  margin-top: 20px;
}

.content-img img {
  max-width: 75%; /* Ensure the image does not exceed its container width */
  height: auto; /* Maintain the image's aspect ratio */
}
@media (max-width: 767.99px), (min-width: 768px) and (max-width: 1198.99px) {
  .context-para{
    font-size: 15px;
    width: auto;
  }
  .content-img{
    display: none;
  }
}
</style>

<script lang="ts">
import "@appwrite.io/pink"; // optionally, add icons
import "@appwrite.io/pink-icons";

export default {
  // Component options and logic
};
</script>
