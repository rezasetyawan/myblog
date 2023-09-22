<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from "vue";
import { getBlogByTitle } from "../../composables/useBlogs";
import { getComments } from "../../composables/useComments";
import { useRoute } from "vue-router";

const route = useRoute();
const blog = ref<GetBlogDetail | undefined>();
const commentData = ref<CommentSnapshots | null | undefined>();
const postTitle = ref<string>(route.params.title as string);
const isLoading = ref<boolean>(true);

async function fetchDataRecursively(attempt: number = 1) {
  try {
    if (attempt > 3) {
      console.log("Reached the maximum number of recursive attempts.");
      isLoading.value = false;
      return;
    }

    const { data: cacheComments } = useNuxtData(`comments-${postTitle.value}`);
    const { data: cacheBlog } = useNuxtData(postTitle.value);

    if (cacheBlog.value && cacheComments.value) {
      blog.value = cacheBlog.value.data;
      commentData.value = cacheComments.value;
    } else {
      const data = await getBlogByTitle(postTitle.value);
      const commentSnapshots = await getComments(postTitle.value);

      if (data && commentSnapshots) {
        blog.value = data;
        commentData.value = commentSnapshots;
      } else {
        await fetchDataRecursively(attempt + 1);
      }
    }
    console.log(blog.value);
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
}



onMounted(async () => {
  await fetchDataRecursively()
});

useHead({
  title: `My Blog | ${blog.value?.title}`,
  titleTemplate: blog.value?.title,
});

useServerSeoMeta({
  title: blog.value?.title,
  ogTitle: blog.value?.title,
  description: blog.value?.text,
  ogDescription: blog.value?.text,
});

</script>
<template>
  <PostDetail :blog="blog" :commentData="commentData" v-if="blog && commentData" />
  <Loading v-if="isLoading" />
</template>
