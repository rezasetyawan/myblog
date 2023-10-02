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
      console.log('dari cache (konten)')
      isLoading.value = false;
      return (blog.value = cacheBlog.value.data);
    } else {
      console.log('bukan dari cache (konten)')
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
      console.log('dari cache (komen)')
      return (commentData.value = cacheComments.value);
    } else if (blog.value) {
      console.log('bukan dari cache (komen)')
      const commentResult = await getComments(blog.value.id);
      return (commentData.value = commentResult);
    }
  } catch (error: any) {
    showErrorToast(error.message);
  }
};

onBeforeMount(() => {
  definePageMeta({
    layout: "my-layout",
  });
});

onMounted(async () => {
  postTitle.value = route.params.title as string;
  await fetchBlogContent();
  await fetchBlogComments();

  useHead({
    title: `My Blog | ${blog.value?.title}`,
    titleTemplate: `My Blog | ${blog.value?.title}`,
  });

  useServerSeoMeta({
    title: `My Blog | ${blog.value?.title}`,
    ogTitle: `My Blog | ${blog.value?.title}`,
    titleTemplate: `My Blog | ${blog.value?.title}`,
    description: blog.value?.text,
    ogDescription: blog.value?.text,
    ogImage: blog.value?.image_url,
    ogImageUrl: blog.value?.image_url,
  });
});
</script>
<template>
  <HeadMetaData
    v-if="blog"
    :title="blog?.title"
    :ogDescription="blog?.title"
    :ogImageUrl="blog?.image_url"
    :pathname="'/' + blog?.url_param"
  />
  <PostDetail :blog="blog" :commentData="commentData" v-if="blog" />
  <Loading v-if="isLoading" />
</template>
