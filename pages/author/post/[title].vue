<script setup lang="ts">
const route = useRoute();
const blog = ref<GetBlogDetail | undefined>();
const commentData = ref<CommentSnapshots | null | undefined>();
const postTitle = ref<string>(route.params.title as string);
const isLoading = ref<boolean>(true);

const fetchBlogData = async () => {
  try {
    const { data: cacheComments } = useNuxtData(`comments-${postTitle.value}`);
    const { data: cacheBlog } = useNuxtData(postTitle.value);

    if (cacheBlog.value) {
      blog.value = cacheBlog.value.data;
      commentData.value = cacheComments.value;
      
      if (blog.value && !cacheComments.value) {
        const commentSnapshots = await getComments(blog.value.id);
        commentData.value = commentSnapshots;
        return
      }
      isLoading.value = false;
    } else {
      const blogResult = await getBlogByTitle(postTitle.value);
      blog.value = blogResult;
      isLoading.value = false

      if (blogResult) {
        const commentResults = await getComments(blogResult.id);
        blog.value = blogResult;
        commentData.value = commentResults;
      } else {
        await fetchBlogData()
      }
    }
  } catch (error: any) {
    showErrorToast(error.message)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await fetchBlogData()

  useHead({
    title: blog.value?.title,
    titleTemplate: blog.value?.title
  })
});

definePageMeta({
  middleware: 'author'
})
</script>
<template>
  <AuthorPostDetail :blog="blog" :commentData="commentData" v-if="blog && commentData" />
  <Loading v-if="isLoading" />
</template>
