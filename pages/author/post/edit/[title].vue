<script setup lang="ts">
const client = useSupabaseClient();
const route = useRoute();
const blog = ref<GetBlogDetail | undefined>();
const categories = ref<{ id: string; name: string }[] | undefined | null>();
const tags = ref<{ id: string; name: string }[] | undefined | null>();
const postTitle = ref<string>(route.params.title as string);
const isLoading = ref<boolean>(true);

const getBlogInitalData = async () => {
  try {
    const { data: cacheBlog } = useNuxtData(postTitle.value);

    if (cacheBlog.value) {
      isLoading.value = false;
      return (blog.value = cacheBlog.value.data);
    } else {
      const blogResult = await getBlogByTitle(postTitle.value);
      if (blogResult) {
        isLoading.value = false;
        return (blog.value = blogResult);
      } else {
        await getBlogInitalData();
      }
    }
  } catch (error: any) {
    showErrorToast(error.message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  try {
    await getBlogInitalData();
    const categorySnapshots = await getCategories(client);
    const tagSnapshots = await getTags(client);

    categories.value = categorySnapshots;
    tags.value = tagSnapshots;

    useHead({
      title: `${blog.value?.title} | My Blog`,
      titleTemplate: `${blog.value?.title} | My Blog`,
    });
  } catch (error: any) {
    showErrorToast(error.message);
  }
});

definePageMeta({
  middleware: "author",
  layout: "author-layout",
});
</script>
<template>
  <AuthorEditPost
    :blog="blog"
    :categories="categories"
    :tags="tags"
    v-if="blog && categories && tags"
  />
  <Loading v-if="isLoading" />
</template>
