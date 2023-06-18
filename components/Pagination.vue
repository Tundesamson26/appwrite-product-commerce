<template>
  <nav class="pagination" style="display: flex; align-items: flex-end; justify-content: flex-end; padding-top: 20px;">
    <span href="" class="button is-text is-disabled" aria-label="prev page">
      <span class="icon-cheveron-left" aria-hidden="true"></span>
      <span class="text">Prev</span>
    </span>
    <ol class="pagination-list is-only-desktop">
      <li class="pagination-item">
        <span href="" class="button is-disabled" aria-label="page"
          ><span class="text">1</span></span
        >
      </li>
      <li class="pagination-item">
        <button class="button is-text" aria-label="page">
          <span class="text">2</span>
        </button>
      </li>
      <li class="pagination-item">
        <button class="button is-text" aria-label="page">
          <span class="text">3</span>
        </button>
      </li>
      <li class="pagination-item">
        <button class="button is-text" aria-label="page">
          <span class="text">4</span>
        </button>
      </li>
      <li class="pagination-item">
        <button class="button is-text" aria-label="page">
          <span class="text">5</span>
        </button>
      </li>
    </ol>
    <a href="" class="button is-text" aria-label="next page">
      <span class="text">Next</span>
      <span class="icon-cheveron-right" aria-hidden="true"></span>
    </a>
  </nav>
</template>
<script setup>
</script>
<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onNextPage() {
      this.$emit("page-change", this.currentPage + 1);
    },
    onPrevPage() {
      this.$emit("page-change", this.currentPage - 1);
    },
  },
};
</script>