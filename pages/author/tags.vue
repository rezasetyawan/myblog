<script setup lang="ts">
import { addTag, deleteTagById } from "../../composables/useTags";
const client = useSupabaseClient();

const tags = ref<{ id: string; name: string }[] | undefined | null>();
const showTagForm = ref<boolean>(false);
const tagDeleteModal = ref<boolean>(false);
const selectedId = ref<string>("");

onMounted(async () => {
  const tagSnapshots = await getTags(client);
  tags.value = tagSnapshots;
});

const editTagHandler = (id: string) => {
  useRouter().push("/author/tag/" + id);
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

useHead({
  title: "Tag list | My Blog",
  titleTemplate: "Tag list | My Blog",
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

  <section v-if="tags" class="sm:mx-5 lg:mx-10 w-full border p-10">
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
    :show-confirmation-modal="tagDeleteModal"
    :type="'negative'"
    :message="'Are you sure want to delete the tag?'"
    @cancel="tagDeleteModal = false"
    @confirm="async () => await deleteTagHandler()"
  />
</template>
<style scoped>
a.router-link-active {
  @apply border-b-2 border-red-800;
}
</style>
