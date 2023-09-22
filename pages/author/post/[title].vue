<script setup lang="ts">
const route = useRoute();
const blog = ref<GetBlogDetail | undefined>();
const commentData = ref<CommentSnapshots | null | undefined>();
const postTitle = ref<string>(route.params.title as string);
const isLoading = ref<boolean>(true);

onMounted(async () => {
  try {
    const { data: cacheComments } = useNuxtData(`comments-${postTitle.value}`);
    const { data: cacheBlog } = useNuxtData(postTitle.value);

    if (cacheBlog.value && cacheComments.value) {
      blog.value = cacheBlog.value.data;
      commentData.value = cacheComments.value;
    } else {
      const blogResult = await getBlogByTitle(postTitle.value);
      const commentResults = await getComments(postTitle.value);
      blog.value = blogResult;
      commentData.value = commentResults;
    }
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
});

useHead({
  title: blog.value?.title,
  titleTemplate: blog.value?.title
})

definePageMeta({
  middleware: 'author'
})
</script>
<template>
  <AuthorPostDetail :blog="blog" :commentData="commentData" v-if="blog && commentData" />
  <Loading v-if="isLoading" />
</template>
