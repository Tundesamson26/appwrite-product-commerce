<template>
  <div
    class="side-nav u-width-250 u-height-100-percent sidebar"
    style="flex: 0 0 auto; width: 250px"
  >
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
            <nuxt-link to="/customers" class="drop-button">
              <span class="icon-user-group" aria-hidden="true"></span>
              <span class="text">Customers</span>
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
</template>
<style>
.sidebar {
  flex: 0 0 auto;
  width: 250px;
  /* Add other styles for the Sidebar */
}
</style>
