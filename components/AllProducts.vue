<template>
  <div class="" style="padding-top: 20px">
    <table class="table is-selected-columns-mobile container">
      <thead class="table-thead">
        <tr class="table-row">
          <th class="table-thead-col" style="--p-col-width: 100">
            <span class="eyebrow-heading-3">Name</span>
          </th>
          <th class="table-thead-col is-only-desktop" style="--p-col-width: 100">
            <span class="eyebrow-heading-3">Image</span>
          </th>
          <th class="table-thead-col is-only-desktop" style="--p-col-width: 200">
            <span class="eyebrow-heading-3">Description</span>
          </th>
          <th class="table-thead-col is-only-desktop" style="--p-col-width: 100">
            <span class="eyebrow-heading-3">Price</span>
          </th>
          <th class="table-thead-col is-only-desktop" style="--p-col-width: 120">
            <span class="eyebrow-heading-3">Qty</span>
          </th>
          <th class="table-thead-col" style="--p-col-width: 30"></th>
        </tr>
      </thead>
      <tbody class="table-tbody">
        <tr v-for="product in products" :key="product.$id" class="table-row">
          <td class="table-col" data-title="Name">
            <div class="u-inline-flex u-cross-center u-gap-12">
              <div>
                <!-- Display product name -->
                <span class="text u-break-word u-line-height-1-5">
                  {{ product.productName }}
                </span>
              </div>
            </div>
          </td>
          <td class="table-col is-only-desktop" data-title="Type">
            <div>
              <!-- Display product image -->
              <div class="text">
                <span class="image">
                  <img class="avatar" width="32" height="32" :src="product.productImage" alt="" />
                </span>
              </div>
            </div>
          </td>
          <td class="table-col is-only-desktop" data-title="Type">
            <div>
              <!-- Display product desc -->
              <span class="text u-break-word u-line-height-1-5">
                {{ product.productDesc }}
              </span>
            </div>
          </td>
          <td class="table-col is-only-desktop" data-title="Size">
            <div>
              <!-- Display product price -->
              <span class="tag"> ${{ product.productPrice }} </span>
            </div>
          </td>
          <td class="table-col is-only-desktop" data-title="Created">
            <div>
              <!-- Display product size -->
              <span class="text u-break-word u-line-height-1-5">
                {{ product.productSize }}
              </span>
            </div>
          </td>
          <td class="table-col u-overflow-visible">
            <div class="u-flex u-cross-center u-main-end">
              <div>
                <!-- Edit button -->
                <button class="button is-text is-only-icon" type="button" aria-label="more options"
                  @click="editProduct(product.$id)">
                  <span class="icon-pencil"></span>
                </button>
                <div v-if="showModal && editMode && editMode.index !== null" class="modal-overlay" id="dialog">
                  <div class="modal">
                    <form class="modal-form" method="dialog" @submit.prevent="">
                      <header class="modal-header">
                        <h4 class="modal-title heading-level-5">Product</h4>
                        <button class="button is-text is-small is-only-icon" aria-label="Close modal"
                          @click="showModal = false">
                          <span class="icon-x" aria-hidden="true"></span>
                        </button>
                      </header>
                      <ul class="form-list">
                        <li class="form-item">
                          <label class="label">Product Name</label>
                          <div class="input-text-wrapper">
                            <input type="text" class="input-text u-padding-inline-end-56" placeholder="Product name"
                              v-model="products[editMode.index].productName" />
                          </div>
                        </li>
                        <li class="form-item">
                          <label class="label">Product Image</label>
                          <div class="input-text-wrapper">
                            <input type="text" class="input-text" placeholder="Image link"
                              v-model="products[editMode.index].productImage" />
                          </div>
                        </li>
                        <li class="form-item">
                          <label class="label">Description</label>
                          <div class="input-text-wrapper">
                            <input type="text" class="input-text" placeholder="Product Description"
                              v-model="products[editMode.index].productDesc" />
                          </div>
                        </li>
                        <div class="u-flex u-cross-center">
                          <li class="form-item">
                            <label class="label">Price</label>
                            <div class="input-text-wrapper">
                              <input type="text" name="productPrice" placeholder="Price"
                                v-model="products[editMode.index].productPrice" />
                            </div>
                          </li>
                          <li class="form-item">
                            <label class="label" for="size">Quantity</label>
                            <div class="input-text-wrapper">
                              <div class="select" style="width: 122%">
                                <select name="pets" id="pet-select" v-model="products[editMode.index].productSize">
                                  <option value="">Select option</option>
                                  <option value="20">20</option>
                                  <option value="40">40</option>
                                  <option value="50">50</option>
                                  <option value="60">60</option>
                                  <option value="89">80</option>
                                  <option value="100">100</option>
                                </select>
                                <span class="icon-cheveron-down" aria-hidden="true"></span>
                              </div>
                            </div>
                          </li>
                        </div>
                      </ul>
                      <div class="modal-footer">
                        <div class="u-flex u-main-end u-gap-16">
                          <button class="button is-secondary" @click="showModal = false">
                            <span class="text">Cancel</span>
                          </button>
                          <button class="button" type="submit" @click.prevent="updateProduct(product.$id)">
                            <span class="text">Update</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <!-- Delete button -->
              <button class="button is-text is-only-icon" type="button" aria-label="more options"
                @click="deleteProduct(product.$id)">
                <span class="icon-trash" aria-hidden="true"></span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination />
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

<script lang="js">
import { reactive, ref, onMounted } from "vue";
import "@appwrite.io/pink";
import "@appwrite.io/pink-icons";
import Pagination from "@/components/Pagination.vue";
import { Client, Account, Databases } from "appwrite";

export default {
  components: {
    Pagination,
  },

  setup() {
    const showModal = ref(false);
    const products = ref([]);
    const editMode = reactive({ index: null });
    const runtimeConfig = useRuntimeConfig();
    const client = new Client();
    const account = new Account(client);
    const databases = new Databases(client);

    client
      .setEndpoint(runtimeConfig.public.API_ENDPOINT)
      .setProject(runtimeConfig.public.PROJECT_ID);

    const editProduct = (productId) => {
      const productIndex = products.value.findIndex((product) => product.$id === productId);
      if (productIndex !== -1) {
        editMode.index = productIndex;
        console.log(editMode.index);
        showModal.value = true;
      }
    };

    const updateProduct = async (productId) => {
      try {
        const productIndex = products.value.findIndex((product) => product.$id === productId);
        if (productIndex === -1) {
          throw new Error("Product not found");
        }

        const updatedProduct = { ...products.value[productIndex] };
        // Update the product in the database using the modified data
        await databases.updateDocument(
          runtimeConfig.public.PRODUCT_DATABASE_ID,
          runtimeConfig.public.PRODUCT_COLLECTION_ID,
          productId,
          {
            productName: updatedProduct.productName,
            productImage: updatedProduct.productImage,
            productDesc: updatedProduct.productDesc,
            productPrice: updatedProduct.productPrice,
            productSize: updatedProduct.productSize,
            // Update other fields as needed
          }
        );

        alert("Product has been updated successfully");
        editMode.index = null; // Exit edit mode
        await getProduct();
      } catch (error) {
        console.log("Error updating product:", error.message);
        alert("Product was not updated");
      }
    };

    const getProduct = async () => {
      try {
        const response = await databases.listDocuments(
          runtimeConfig.public.PRODUCT_DATABASE_ID,
          runtimeConfig.public.PRODUCT_COLLECTION_ID
        );
        const fetchedProducts = response.documents;
        console.log("Successfully retrieved products:", fetchedProducts);
        products.value = fetchedProducts;
        return fetchedProducts;
      } catch (error) {
        console.log("Error retrieving products:", error);
        // Handle the error accordingly (e.g., display an error message)
      }
    };

    const deleteProduct = async (document_id) => {
      try {
        await databases.deleteDocument(
          runtimeConfig.public.PRODUCT_DATABASE_ID,
          runtimeConfig.public.PRODUCT_COLLECTION_ID,
          document_id
        );

        alert("Item has been deleted successfully");
        await getProduct();
      } catch (error) {
        console.log("Error deleting product:", error.message);
        alert("Item was not deleted");
      }
    };

    onMounted(async () => {
      await getProduct();

      if (account.get !== null) {
        try {
          client.subscribe("documents", (response) => {
            console.log("anything", response);
          });
        } catch (error) {
          console.log(error, "error");
        }
      }
    });

    return {
      showModal,
      products,
      editProduct,
      deleteProduct,
      updateProduct,
      editMode
    };
  },
};
</script>
