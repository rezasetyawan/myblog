<script setup lang="ts">
const route = useRoute();
const blog = ref<GetBlogDetail | undefined>();
const postTitle = ref<string>(route.params.title as string);
const isLoading = ref<boolean>(true);

const getBlogInitalData = async () => {
  try {
    const { data: cacheBlog } = useNuxtData(postTitle.value);

    if (cacheBlog.value) {
      isLoading.value = false;
      return (blog.value = cacheBlog.value);
    } else {
      const blogResult = await getBlogByTitle(postTitle.value);
      if (blogResult) {
        console.log(blogResult);
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
    useHead({
      title: `Edit Post |  ${blog.value?.title}`,
      titleTemplate: `Edit Post | ${blog.value?.title}`,
    });
  } catch (error: any) {
    showErrorToast(error.message);
  }
});

definePageMeta({
  middleware: "author",
});
</script>
<template>
  <AuthorEditPost :blog="blog" v-if="blog" />
  <Loading v-if="isLoading" />
</template>
