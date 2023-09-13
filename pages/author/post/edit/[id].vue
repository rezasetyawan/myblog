<script setup lang="ts">
import { getBlogData } from "../../../../composables/useBlogs";

const route = useRoute();
const blog = ref<GetBlogDetail | undefined>();
const postId = ref<string>(route.params.id as string);
const isLoading = ref<boolean>(true);

onMounted(async () => {
  try {
    const { data: cacheBlog } = useNuxtData(postId.value);

    if (cacheBlog.value) {
      blog.value = cacheBlog.value.data;
    } else {
      const blogResult = await getBlogData(postId.value);
      blog.value = blogResult;
    }
    console.log(blog.value);
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
});
</script>
<template>
  <Head>
    <Title>{{ blog?.title }}</Title>
  </Head>
  <AuthorEditPost :blog="blog" v-if="blog" />
</template>
