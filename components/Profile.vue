<template>
  <article class="u-text-center" style="margin-top: 30px; margin-bottom: 10px">
    <img
      class="avatar is-size-x-large u-margin-inline-auto"
      :src="avatar"
      alt="Kristin Watson"
      width="66"
      height="66"
    />
    <h3 class="body-text-2 u-margin-block-start-16">
      {{ firstName }} {{ lastName }}
    </h3>
    <!-- <button class="button u-margin-inline-auto u-margin-block-start-24">
      <span class="text">Edit profile</span>
    </button> -->
  </article>
</template>
<script>
import { ref, onMounted } from "vue";

export default {
  name: "Profile",
  setup() {
    const avatar = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const firstNames = [
      "John",
      "Jane",
      "Robert",
      "Alice",
      // Add more first names to the list
    ];

    const lastNames = [
      "Smith",
      "Johnson",
      "Brown",
      "Davis",
      // Add more last names to the list
    ];

    onMounted(async () => {
      if (!avatar.value) {
        const _avatar = localStorage.getItem("avatar") || AvatarGenerator();
        localStorage.setItem("avatar", _avatar);
        avatar.value = _avatar;
        console.log(_avatar);
      }
    });

    onMounted(() => {
      if (!firstName.value) {
        firstName.value = getRandomElement(firstNames);
        localStorage.setItem('firstName', firstName.value);
        console.log(firstName.value);
      }

      if (!lastName.value) {
        lastName.value = getRandomElement(lastNames);
        localStorage.setItem('lastName', lastName.value);
        console.log(lastName.value);
      }
    });

    const getRandomElement = (array) => {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    };

    return {
      avatar,
      firstName,
      lastName,
    };
  },
};
</script>
