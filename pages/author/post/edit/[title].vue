<script setup lang="ts">
const route = useRoute();
const blog = ref<GetBlogDetail | undefined>();
const postTitle = ref<string>(route.params.title as string);
const isLoading = ref<boolean>(true);

const getBlogInitalData = async () => {
  try {
    const { data: cacheBlog } = useNuxtData(postTitle.value);

    if (cacheBlog.value) {
      blog.value = cacheBlog.value.data;
      return
    } else {
      const blogResult = await getBlogByTitle(postTitle.value);
      blog.value = blogResult;
      return
    }
  } catch (error: any) {
    showErrorToast(error.message)
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  try {
    await getBlogInitalData()
    
    useHead({
      title: `Edit ${blog.value?.title}`,
      titleTemplate: `Edit ${blog.value?.title}`
    })
  } catch (error: any) {
    showErrorToast(error.message)
  }
});

definePageMeta({
  middleware: 'author'
})
</script>
<template>
  <AuthorEditPost :blog="blog" v-if="blog" />
  <Loading v-if="isLoading" />
</template>
