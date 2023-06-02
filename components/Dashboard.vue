<template>
  <section>
    <div>
      <Header/>
    </div>
    <div class="container">
      <div class="u-flex u-main-center u-main-space-between u-cross-center">
      <div class="u-text-center">
        <button class="button u-margin-inline-auto u-margin-block-start-24">
          <span class="text">All services</span>
        </button>
      </div>
      <div class="u-text-center">
        <button
          class="button u-margin-inline-auto u-margin-block-start-24"
          @click="showModal = true"
        >
          <span className="icon-plus-sm" aria-hidden="true"></span>
          <span class="text">Add product</span>
        </button>
        <div v-if="showModal" class="modal-overlay" id="dialog">
          <div class="modal">
            <form
              class="modal-form"
              method="dialog"
              @submit.prevent="createProduct"
            >
              <header class="modal-header">
                <h4 class="modal-title heading-level-5">Product</h4>
                <button
                  class="button is-text is-small is-only-icon"
                  aria-label="Close modal"
                  @click="showModal = false"
                >
                  <span class="icon-x" aria-hidden="true"></span>
                </button>
              </header>
              <ul class="form-list">
                <li class="form-item">
                  <label class="label">Product Name</label>
                  <div class="input-text-wrapper">
                    <input
                      type="text"
                      class="input-text u-padding-inline-end-56"
                      placeholder="Product name"
                      v-model="productName"
                    />
                  </div>
                </li>
                <li class="form-item">
                  <label class="label">Product Image</label>
                  <div class="input-text-wrapper">
                    <input
                      type="text"
                      class="input-text"
                      placeholder="Image link"
                      v-model="productImage"
                    />
                  </div>
                </li>
                <li class="form-item">
                  <label class="label">Description</label>
                  <div class="input-text-wrapper">
                    <input
                      type="text"
                      class="input-text"
                      placeholder="Product Description"
                      v-model="productDesc"
                    />
                  </div>
                </li>
                <div class="u-flex u-cross-center">
                  <li class="form-item">
                    <label class="label">Price</label>
                    <div class="input-text-wrapper">
                      <input
                        type="text"
                        name="productPrice"
                        placeholder="Price"
                        v-model="productPrice"
                      />
                    </div>
                  </li>
                  <li class="form-item">
                    <label class="label" for="size">Quantity</label>
                    <div class="input-text-wrapper">
                      <div class="select" style="width: 122%">
                        <select
                          name="pets"
                          id="pet-select"
                          v-model="productSize"
                        >
                          <option value="">Select option</option>
                          <option value="20">20</option>
                          <option value="40">40</option>
                          <option value="50">50</option>
                          <option value="60">60</option>
                          <option value="89">80</option>
                          <option value="100">100</option>
                        </select>
                        <span
                          class="icon-cheveron-down"
                          aria-hidden="true"
                        ></span>
                      </div>
                    </div>
                  </li>
                </div>
              </ul>
              <div class="modal-footer">
                <div class="u-flex u-main-end u-gap-16">
                  <button
                    class="button is-secondary"
                    @click="showModal = false"
                  >
                    <span class="text">Cancel</span>
                  </button>
                  <button class="button" type="submit">
                    <span class="text">Save</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
     <!-- tab start -->
     <TabContent/>
    <!-- tab ends here -->
    </div>
  </section>
</template>
<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.modal {
  position: relative;
  width: 400px;
  background-color: #fff;
  padding: 20px;
  z-index: 10000;
}
</style>
<script lang="ts">
import { ref, onMounted } from "vue";
import {
  createAnonymousSession,
  databases,
  account,
  client,
} from "@/utils/web-init";
import "@appwrite.io/pink";
import "@appwrite.io/pink-icons";
import { ID } from "appwrite";

export default {
  setup() {
    const showModal = ref(false);
    const productName = ref("");
    const productImage = ref("");
    const productDesc = ref("");
    const productPrice = ref("");
    const productSize = ref("");

    const createProduct = async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      try {
        await databases.createDocument(
          "6473b8ef7c15c4def6f0",
          "6473b9100af3a35ca785",
          ID.unique(),
          {
            productName: productName.value,
            productDesc: productDesc.value,
            productImage: productImage.value,
            productPrice: productPrice.value,
            productSize: productSize.value,
          }
        );
        productName.value = "";
        productDesc.value = "";
        productImage.value = "";
        productPrice.value = "";
        productSize.value = "";
        alert("Product saved successfully");
      } catch (error) {
        console.log(error);
        alert("Product not saved");
      }
    };

    onMounted(() => {
      createAnonymousSession();
      if (account.get !== null) {
        try {
          client.subscribe("documents", (response) => {
            console.log(response);
          });
        } catch (error) {
          console.log(error, "error");
        }
      }
    });

    return {
      showModal,
      productName,
      productImage,
      productDesc,
      productPrice,
      productSize,
      createProduct,
    };
  },
};
</script>
