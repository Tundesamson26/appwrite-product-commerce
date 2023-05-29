<template>
    <div class="tabs" style="width: 100%; padding-top: 30px">
      <ul class="tabs-list">
        <li class="tabs-item">
          <a
            class="tabs-button"
            :class="{ 'is-selected': activeTab === 'products' }"
            @click="selectTab('products')"
            href="#"
          >
            <span class="text">Products</span>
          </a>
        </li>
        <li class="tabs-item">
          <a
            class="tabs-button"
            :class="{ 'is-selected': activeTab === 'courses' }"
            @click="selectTab('courses')"
            href="#"
          >
            <span class="text">Courses</span>
          </a>
        </li>
        <li class="tabs-item">
          <a
            class="tabs-button"
            :class="{ 'is-selected': activeTab === 'tickets' }"
            @click="selectTab('tickets')"
            href="#"
          >
            <span class="text">Tickets</span>
          </a>
        </li>
      </ul>
  
      <div v-if="activeTab === 'products'">
        <!-- Content for 'products' tab -->
        <AllProducts/>
      </div>
      <div v-if="activeTab === 'courses'">
        <!-- Content for 'Courses' tab -->
        <p>Courses tab content goes here</p>
      </div>
      <div v-if="activeTab === 'tickets'">
        <!-- Content for 'Tickets' tab -->
        <p>Tickets tab content goes here</p>
      </div>
    </div>
  </template>
  
  <script lang="js">
  export default {
    data() {
      return {
        activeTab: 'products', // Set the initially active tab
      };
    },
    methods: {
      selectTab(tab) {
        this.activeTab = tab; // Update the active tab when clicked
      },
    },
  };
  </script>
  
  <style>
  /* Add your styles for the tabs here */
  </style>
  