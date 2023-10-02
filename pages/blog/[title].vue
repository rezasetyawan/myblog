<script setup lang="ts">
const route = useRoute();

const blog = ref<GetBlogDetail | undefined>();
const commentData = ref<CommentSnapshots | null | undefined>();
const postTitle = ref<string>(route.params.title as string);
const isLoading = ref<boolean>(true);

const fetchBlogContent = async () => {
  try {
    const { data: cacheBlog } = useNuxtData(postTitle.value);

    if (cacheBlog.value) {
      console.log("dari cache (konten)");
      isLoading.value = false;
      return (blog.value = cacheBlog.value.data);
    } else {
      console.log("bukan dari cache (konten)");
      const blogResult = await getBlogByTitle(postTitle.value);
      if (blogResult) {
        isLoading.value = false;
        return (blog.value = blogResult);
      } else {
        await fetchBlogContent();
      }
    }
  } catch (error: any) {
    showErrorToast(error.message);
  } finally {
    isLoading.value = false;
  }
};

const fetchBlogComments = async () => {
  try {
    const { data: cacheComments } = useNuxtData(`comments-${blog.value?.id}`);

    if (cacheComments.value) {
      console.log("dari cache (komen)");
      return (commentData.value = cacheComments.value);
    } else if (blog.value) {
      console.log("bukan dari cache (komen)");
      const commentResult = await getComments(blog.value.id);
      return (commentData.value = commentResult);
    }
  } catch (error: any) {
    showErrorToast(error.message);
  }
};

definePageMeta({
  middleware: 'is-admin',
});

onMounted(async () => {
  postTitle.value = route.params.title as string;
  await fetchBlogContent();
  await fetchBlogComments();

  useHead({
    title: `${blog.value?.title} | My Blog`,
    titleTemplate: `${blog.value?.title} | My Blog`,
  });

  //   useServerSeoMeta({
  //     title: blog.value?.title + " | " + "My Blog",
  //     ogTitle: blog.value?.title + " | " + "My Blog",
  //     description: truncateString(blog.value?.text as string, 100),
  //     ogDescription: truncateString(blog.value?.text as string, 100),
  //     titleTemplate: blog.value?.title + " | " + "My Blog",
  //     ogImage: blog.value?.image_url,
  //     ogImageUrl: blog.value?.image_url,
  //     twitterTitle: blog.value?.title + " | " + "My Blog",
  //     twitterDescription: truncateString(blog.value?.text as string, 100),
  //     twitterImage: blog.value?.image_url,
  //     ogType: "website",
  //     twitterCard: "summary_large_image",
  //   });
  // }
});
</script>
<template>
  <HeadMetaData
    :title="blog?.title"
    :ogImageUrl="blog?.image_url"
    :pathname="'/blog/' + postTitle"
  />
  <PostDetail :blog="blog" :commentData="commentData" v-if="blog" />
  <Loading v-if="isLoading" />
</template>
