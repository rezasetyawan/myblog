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
    } else {
      const blogResult = await getBlogByTitle(postTitle.value);
      blog.value = blogResult;
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
  } catch (error: any) {
    showErrorToast(error.message)
  }
});

definePageMeta({
  middleware: 'author'
})
</script>
<template>
  <Head>
    <Title>{{ blog?.title }}</Title>
  </Head>
  <AuthorEditPost :blog="blog" v-if="blog" />
</template>
