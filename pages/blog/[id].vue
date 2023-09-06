<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from "vue";
import { getBlogById } from "../../composables/useBlogs";
import { getComments } from "../../composables/useComments";
import { useRoute } from "vue-router";

const route = useRoute();
const blog = ref<GetBlogDetail | undefined>();
const commentData = ref<CommentSnapshots | null | undefined>();
const postId = ref<string>(route.params.id as string);
const isLoading = ref<boolean>(true);

onMounted(async () => {
  try {
    const { data: cacheComments } = useNuxtData(`comments-${postId.value}`);
    const { data: cacheBlog } = useNuxtData(postId.value);

    if (cacheBlog.value && cacheComments.value) {
      blog.value = cacheBlog.value.data;
      commentData.value = cacheComments.value;
    } else {
      const blogResult = await getBlogById(postId.value);
      const commentResults = await getComments(postId.value);
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
  titleTemplate: blog.value?.title,
});
</script>
<template>
  <Head>
  <Title>{{ blog?.title }}</Title>   
</Head>
  <PostDetail
    :blog="blog"
    :commentData="commentData"
    v-if="blog && commentData"
  />
  <Loading v-if="isLoading" />
</template>
