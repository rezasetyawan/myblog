<script setup lang="ts">
import {
  addCategory,
  deleteCategoryById,
} from "../../composables/useCategories";
import { addTag, deleteTagById } from "../../composables/useTags";
const client = useSupabaseClient();

const categories = ref<{ id: string; name: string }[] | undefined | null>();
const tags = ref<{ id: string; name: string }[] | undefined | null>();
const showCategoryForm = ref<boolean>(false);
const showTagForm = ref<boolean>(false);
const currentSection = ref<string>("categories");
const tagDeleteModal = ref<boolean>(false);
const categoryDeleteModal = ref<boolean>(false);
const selectedId = ref<string>("");

onMounted(async () => {
  const categorySnapshots = await getCategories(client);
  const tagSnapshots = await getTags(client);

  categories.value = categorySnapshots;
  tags.value = tagSnapshots;
});

const editCategoryHandler = (id: string) => {
  useRouter().push("/author/category/" + id);
};

const editTagHandler = (id: string) => {
  useRouter().push("/author/tag/" + id);
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

const addTagHandler = async (value: string) => {
  try {
    await addTag(client, value);
    showTagForm.value = false;
    tags.value = await getTags(client);
    showSuccessToast("new tag added");
  } catch (error: any) {
    showErrorToast(error.message);
  }
};

const deleteTagHandler = async () => {
  try {
    console.log(selectedId.value);
    await deleteTagById(client, selectedId.value);
    tagDeleteModal.value = false;
    selectedId.value = "";
    tags.value = await getTags(client);
    showSuccessToast("tag deleted");
  } catch (error: any) {
    showErrorToast(error.message);
  }
};

definePageMeta({
  middleware: "author",
  layout: "author-layout",
});
</script>
<template>
  <section class="w-full flex justify-evenly mb-5">
    <label
      class="hover:cursor-pointer text-sm sm:text-base"
      :class="{ 'border-b-2 border-red-800': currentSection === 'categories' }"
    >
      <input
        type="radio"
        value="categories"
        class="w-full h-full hidden"
        v-model="currentSection"
      />
      categories </label
    ><label
      class="hover:cursor-pointer text-sm sm:text-base"
      :class="{ 'border-b-2 border-red-800': currentSection === 'tags' }"
    >
      <input
        type="radio"
        value="tags"
        class="w-full h-full hidden"
        v-model="currentSection"
      />
      tags
    </label>
  </section>

  <section
    v-if="categories && currentSection === 'categories'"
    class="max-w-sm sm:mx-5 lg:grid-cols-3 lg:mx-10 w-full"
  >
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

  <section
    v-if="tags && currentSection === 'tags'"
    class="max-w-sm sm:mx-5 lg:grid-cols-3 lg:mx-10 w-full"
  >
    <button
      @click="showTagForm = true"
      class="text-sm leading-tight font-bold text-white bg-red-800 px-3 py-1.5 my-2 rounded-md lg:text-base"
    >
      add tag
    </button>
    <Table
      :tableHeadTitle="'Tag'"
      :datas="tags"
      :url="'/author/tag/'"
      @edit="(id:string) => editTagHandler(id) "
      @delete="(id:string) => {
        tagDeleteModal = true
        selectedId = id
      }"
      class="mt-2"
    />
    <NewCategoryTagForm
      :title="'Create New Tag'"
      :showFormModal="showTagForm"
      @create="(value:string) => addTagHandler(value)"
      @closeModal="() => (showTagForm = false)"
    />
  </section>
  <ConfirmationModalV2
    :show-confirmation-modal="categoryDeleteModal"
    :type="'negative'"
    :message="'Are you sure want to delete the category?'"
    @cancel="categoryDeleteModal = false"
    @confirm="async () => await deleteCategoryHandler()"
  />

  <ConfirmationModalV2
    :show-confirmation-modal="tagDeleteModal"
    :type="'negative'"
    :message="'Are you sure want to delete the tag?'"
    @cancel="tagDeleteModal = false"
    @confirm="async () => await deleteTagHandler()"
  />
</template>
