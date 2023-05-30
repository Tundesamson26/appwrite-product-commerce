<template>
  <div class="" style="padding-top: 20px">
    <table class="table is-selected-columns-mobile">
      <thead class="table-thead">
        <tr class="table-row">
          <th class="table-thead-col" style="--p-col-width: 100">
            <span class="eyebrow-heading-3">Name</span>
          </th>
          <th
            class="table-thead-col is-only-desktop"
            style="--p-col-width: 100"
          >
            <span class="eyebrow-heading-3">Image</span>
          </th>
          <th
            class="table-thead-col is-only-desktop"
            style="--p-col-width: 200"
          >
            <span class="eyebrow-heading-3">Description</span>
          </th>
          <th
            class="table-thead-col is-only-desktop"
            style="--p-col-width: 100"
          >
            <span class="eyebrow-heading-3">Price</span>
          </th>
          <th
            class="table-thead-col is-only-desktop"
            style="--p-col-width: 120"
          >
            <span class="eyebrow-heading-3">Qty</span>
          </th>
          <th class="table-thead-col" style="--p-col-width: 30"></th>
        </tr>
      </thead>
      <tbody class="table-tbody">
        <tr v-for="product in products" :key="product.$id" class="table-row">
          <td class="table-col" data-title="Name">
            <div class="u-inline-flex u-cross-center u-gap-12">
              <template v-if="editMode === product.$id">
                <!-- Input field for editing name -->
                <input v-model="product.productName" />
              </template>
              <template v-else>
                <!-- Display product name -->
                <span class="text u-break-word u-line-height-1-5">
                  {{ product.productName }}
                </span>
              </template>
            </div>
          </td>
          <td class="table-col is-only-desktop" data-title="Type">
            <template v-if="editMode === product.$id">
              <!-- Input field for editing image -->
              <input v-model="product.productImage" />
            </template>
            <template v-else>
              <!-- Display product image -->
              <div class="text">
                <span class="image">
                  <img
                    class="avatar"
                    width="32"
                    height="32"
                    :src="product.productImage"
                    alt=""
                  />
                </span>
              </div>
            </template>
          </td>
          <td class="table-col is-only-desktop" data-title="Type">
            <template v-if="editMode === product.$id">
              <!-- Input field for editing desc -->
              <input v-model="product.productDesc" />
            </template>
            <template v-else>
              <!-- Display product desc -->
              <span class="text u-break-word u-line-height-1-5">
                {{ product.productDesc }}
              </span>
            </template>
          </td>
          <td class="table-col is-only-desktop" data-title="Size">
            <template v-if="editMode === product.$id">
              <!-- Input field for editing price -->
              <input v-model="product.productPrice" />
            </template>
            <template v-else>
              <!-- Display product price -->
              <span class="tag">
                {{ product.productPrice }}
              </span>
            </template>
          </td>
          <td class="table-col is-only-desktop" data-title="Created">
            <template v-if="editMode === product.$id">
              <!-- Input field for editing size -->
              <input v-model="product.productSize" />
            </template>
            <template v-else>
              <!-- Display product size -->
              <span class="text u-break-word u-line-height-1-5">
                {{ product.productSize }}
              </span>
            </template>
          </td>
          <td class="table-col u-overflow-visible">
            <div class="u-flex u-cross-center u-main-end">
              <template v-if="editMode === product.$id">
                <!-- Save button for editing -->
                <button
                  class="button is-text is-only-icon"
                  type="button"
                  @click="saveProduct(product)"
                >
                  <span class="icon-save"></span>
                </button>
              </template>
              <template v-else>
                <!-- Edit button -->
                <button
                  class="button is-text is-only-icon"
                  type="button"
                  aria-label="more options"
                  @click="editProduct(product.$id)"
                >
                  <span class="icon-pencil"></span>
                </button>
              </template>
              <!-- Delete button -->
              <button
                class="button is-text is-only-icon"
                type="button"
                aria-label="more options"
                @click="deleteProduct(product.$id)"
              >
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

<script lang="js">
import { ref, onMounted } from "vue";
import "@appwrite.io/pink";
import "@appwrite.io/pink-icons";
import { client, account, databases } from "@/utils/web-init";

export default {
  setup() {
    const products = ref([]);
    const editMode = ref(null);

    const editProduct = (productId) => {
      editMode.value = productId;
    };

    const saveProduct = async (product) => {
      try {
        // Update the product in the database using the modified data
        await databases.updateDocument(
          "6473b8ef7c15c4def6f0",
          "6473b9100af3a35ca785",
          product.$id,
          {
            productName: product.productName,
            productImage: product.productImage,
            productDesc: product.productDesc,
            productPrice: product.productPrice,
            productSize: product.productSize,
            // Update other fields as needed
          }
        );

        alert("Product has been updated successfully");
        editMode.value = null; // Exit edit mode
        await getProduct();
      } catch (error) {
        console.log("Error updating product:", error.message);
        alert("Product was not updated");
      }
    };


    const getProduct = async () => {
      try {
        const response = await databases.listDocuments(
          "6473b8ef7c15c4def6f0",
          "6473b9100af3a35ca785"
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
          "6473b8ef7c15c4def6f0",
          "6473b9100af3a35ca785",
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
      products,
      editProduct, // Expose the editProduct function
      deleteProduct,
      saveProduct,
    };
  },
};
</script>
