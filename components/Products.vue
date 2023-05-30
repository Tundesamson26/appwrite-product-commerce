<template>
  <section style="flex: 1">
    <div>
      <Header />
    </div>
    <div class="container">
      <div
        class="u-font-size-32 u-normal u-line-height-1-25"
        style="padding: 5px"
      >
        Products
      </div>
      <ul
        class="grid-box"
        style="
          --grid-gap: 1rem;
          --grid-item-size: 16rem;
          --grid-item-size-small-screens: 8rem;
        "
      >
        <li v-for="product in products.documents" :key="product.$id">
          <div class="card">
            <div class="image-container">
              <img :src="product.productImage" alt="image" />
            </div>
            <div style="padding: 10px">
              <p class="u-bold">{{ product.productName }}</p>
            </div>
            <p>{{ product.productDesc }}</p>
            <div
              class="u-flex u-column-gap-12 u-main-end u-cross-center u-main-center"
              style="padding-top: 20px"
            >
              <p class="tag">${{ product.productPrice }}</p>
              <p><span class="u-bold">Qty:</span> {{ product.productSize }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import { account, client, databases } from "~/utils/web-init";

export default {
  name: "products",
  props: {
    productName: String,
    productImage: String,
    productDesc: String,
    productPrice: Number,
    productSize: String,
  },

  data() {
    return {
      products: [],
    };
  },
  mounted() {
    createAnonymousSession();
    this.getProduct();

    if (account && account.get() !== null) {
      try {
        client.subscribe("documents", async (response) => {
          console.log("Received real-time update:", response);
          await this.getProduct();
          console.log("Updated products:", this.products);
        });
      } catch (error) {
        console.log(error, "error");
      }
    }
  },
  methods: {
    async getProduct() {
      try {
        const productData = await databases.listDocuments(
          "6473b8ef7c15c4def6f0",
          "6473b9100af3a35ca785"
        );
        console.log(productData);
        this.products = productData;
        console.log("Successfully retrieved products:", productData);
      } catch (error) {
        console.log("Error retrieving products:", error);
        // Handle the error accordingly (e.g., display an error message)
      }
    },
  },
};
</script>
<style>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* max-width: 16rem; */
}

.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.image-container img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>