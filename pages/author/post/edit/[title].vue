<script setup lang="ts">
const route = useRoute();
const blog = ref<GetBlogDetail | undefined>();
const postTitle = ref<string>(route.params.id as string);
const isLoading = ref<boolean>(true);

onMounted(async () => {
  try {
    const { data: cacheBlog } = useNuxtData(postTitle.value);

    if (cacheBlog.value) {
      blog.value = cacheBlog.value.data;
    } else {
      const blogResult = await getBlogByTitle(postTitle.value);
      blog.value = blogResult;
    }
    isLoading.value = false;
  } catch (error) {
    console.error(error);
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
