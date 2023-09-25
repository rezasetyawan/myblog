<script setup lang="ts">
const route = useRoute();

const blog = ref<GetBlogDetail | undefined>();
const commentData = ref<CommentSnapshots | null | undefined>();
const postTitle = ref<string>(route.params.title as string);
const isLoading = ref<boolean>(true);

async function fetchBlogData() {
  try {
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
        isLoading.value = false;
        return
      } else {
        await fetchBlogData();
      }
    }
  } catch (error: any) {
    showErrorToast(error.message)
  } finally {
    isLoading.value = false;
  }
}

onMounted(async () => {
  await fetchBlogData()

  useHead({
    title: `My Blog | ${blog.value?.title}`,
    titleTemplate: blog.value?.title,
  });

  useServerSeoMeta({
    title: `My Blog | ${blog.value?.title}`,
    ogTitle: `My Blog | ${blog.value?.title}`,
    description: blog.value?.text,
    ogDescription: blog.value?.text,
    ogImage: blog.value?.image_url,
  });
});
</script>
<template>
  <PostDetail :blog="blog" :commentData="commentData" v-if="blog && commentData" />
  <Loading v-if="isLoading" />
</template>
