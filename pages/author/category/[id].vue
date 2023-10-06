<script setup lang="ts">
import {
  getCategoryById,
  updateCategoryById,
} from "../../../composables/useCategories";
const route = useRoute();
const client = useSupabaseClient();
const id = ref<string>(route.params.id as string);

const category = ref<{ id: string; name: string } | undefined | null>();

onMounted(async () => {
  id.value = route.params.id as string;
  const data = await getCategoryById(client, id.value);
  category.value = data;
});

const onSubmitHandler = async () => {
  try {
    if (category.value) {
      await updateCategoryById(client, id.value, category.value.name);
      showSuccessToast("category updated");
    }
  } catch (error: any) {
    showErrorToast(error.message);
  }
};

definePageMeta({
  middleware: "author",
  layout: "author-layout",
});

useHead({
  title: `${category.value?.name} | My Blog`,
  titleTemplate: `${category.value?.name} | My Blog`,
});
</script>
<template>
  <section class="flex justify-center">
    <button
      class="absolute -top-3 left-1 sm:top-0 sm:left-5"
      @click="() => useRouter().push('/author/categories')"
    >
      <Icon name="eva:arrow-back-fill" class="w-7 h-7 sm:w-8 sm:h-8" />
    </button>
    <form
      v-if="category"
      @submit.prevent="onSubmitHandler"
      class="w-fit bg-slate-100 p-8 rounded-lg"
    >
      <div>
        <input
          class="focus:outline-none border-2 p-1 block rounded-md"
          v-model="category.name"
        />
        <button
          type="submit"
          class="text-sm leading-tight font-bold text-white bg-red-800 px-3 py-1.5 my-2 rounded-md lg:text-base"
        >
          update
        </button>
      </div>
    </form>
  </section>
</template>
