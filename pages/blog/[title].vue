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

    if (cacheBlog.value) {
      blog.value = cacheBlog.value.data;
      commentData.value = cacheComments.value;

      if (blog.value && cacheComments.value) {
        commentData.value = cacheComments.value
        isLoading.value = false
        return
      }

      if (blog.value && !cacheComments.value) {
        const commentSnapshots = await getComments(blog.value.id);
        commentData.value = commentSnapshots;
        isLoading.value = false;
        return
      }

    } else {
      const blogResult = await getBlogByTitle(postTitle.value);
      blog.value = blogResult;
      isLoading.value = false;

      if (blogResult) {
        const commentSnapshots = await getComments(blogResult.id);
        commentData.value = commentSnapshots;
        return;
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
  postTitle.value = route.params.title as string
  await fetchBlogData()

  useHead({
    title: `My Blog | ${blog.value?.title}`,
    titleTemplate: blog.value?.title,
  });

  useServerSeoMeta({
    title: `My Blog | ${blog.value?.title}`,
    ogTitle: `My Blog | ${blog.value?.title}`,
    titleTemplate: `My Blog | ${blog.value?.title}`,
    description: blog.value?.text,
    ogDescription: blog.value?.text,
    ogImage: blog.value?.image_url,
    ogImageUrl:  blog.value?.image_url,
  });
});
</script>
<template>
  <HeadMetaData :title="blog?.title" :ogDescription="blog?.title" :ogImageUrl="blog?.image_url"
    :pathname="'/' + blog?.url_param" />
  <PostDetail :blog="blog" :commentData="commentData" v-if="blog && commentData" />
  <Loading v-if="isLoading" />
</template>
