<script setup lang="ts">
const client = useSupabaseClient();

const categories = ref<{ id: string; name: string }[] | undefined | null>();
const showCategoryForm = ref<boolean>(false);
const categoryDeleteModal = ref<boolean>(false);
const selectedId = ref<string>("");

onMounted(async () => {
  const categorySnapshots = await getCategories(client);
  categories.value = categorySnapshots;
});

const editCategoryHandler = (id: string) => {
  useRouter().push("/author/category/" + id);
};

const addCategoryHandler = async (value: string) => {
  try {
    await addCategory(client, value);
    showCategoryForm.value = false;
    categories.value = await getCategories(client);
    showSuccessToast("new category added");
  } catch (error: any) {
    showErrorToast(error.message);
  }
};

const deleteCategoryHandler = async () => {
  try {
    await deleteCategoryById(client, selectedId.value);
    categoryDeleteModal.value = false;
    selectedId.value = "";
    categories.value = await getCategories(client);
    showSuccessToast("category deleted");
  } catch (error: any) {
    showErrorToast(error.message);
  }
};

definePageMeta({
  middleware: "author",
  layout: "author-layout",
});

useHead({
  title: "Category list | My Blog",
  titleTemplate: "Category list | My Blog",
});
</script>
<template>
  <section class="w-full flex justify-evenly mb-5 p-3">
    <NuxtLink
      :to="'/author/categories'"
      class="hover:cursor-pointer text-sm sm:text-base"
    >
      Categories
    </NuxtLink>
    <NuxtLink
      :to="'/author/tags'"
      class="hover:cursor-pointer text-sm sm:text-base"
    >
      Tags
    </NuxtLink>
  </section>

  <section v-if="categories" class="max-w-sm sm:mx-5 lg:mx-10 w-full">
    <button
      @click="showCategoryForm = true"
      class="text-sm leading-tight font-bold text-white bg-red-800 px-3 py-1.5 my-2 rounded-md lg:text-base"
    >
      add category
    </button>

    <Table
      :tableHeadTitle="'Categories'"
      :datas="categories"
      @edit="(id:string) => editCategoryHandler(id) "
      @delete="(id:string)=> {
        categoryDeleteModal = true
        selectedId = id
      }"
    />

    <NewCategoryTagForm
      :title="'Create New Category'"
      :showFormModal="showCategoryForm"
      @create="(value:string) => addCategoryHandler(value)"
      @closeModal="() => (showCategoryForm = false)"
    />
  </section>

  <ConfirmationModalV2
    :show-confirmation-modal="categoryDeleteModal"
    :type="'negative'"
    :message="'Are you sure want to delete the category?'"
    @cancel="categoryDeleteModal = false"
    @confirm="async () => await deleteCategoryHandler()"
  />
</template>
<style scoped>
a.router-link-active {
  @apply border-b-2 border-red-800;
}
</style>
