<script setup lang="ts">
const route = useRoute();
const blog = ref<GetBlogDetail | undefined>();
const commentData = ref<CommentSnapshots | null | undefined>();
const postTitle = ref<string>(route.params.title as string);
const isLoading = ref<boolean>(true);

// const fetchBlogData = async () => {
//   try {
//     const { data: cacheComments } = useNuxtData(`comments-${postTitle.value}`);
//     const { data: cacheBlog } = useNuxtData(postTitle.value);

//     if (cacheBlog.value) {
//       blog.value = cacheBlog.value.data;
//       commentData.value = cacheComments.value;

//       if (blog.value && cacheComments.value) {
//         commentData.value = cacheComments.value;
//         isLoading.value = false;
//         return;
//       }

//       if (blog.value && !cacheComments.value) {
//         const commentSnapshots = await getComments(blog.value.id);
//         commentData.value = commentSnapshots;
//         isLoading.value = false;
//         return;
//       }
//     } else {
//       const blogResult = await getBlogByTitle(postTitle.value);
//       blog.value = blogResult;

//       if (blogResult) {
//         const commentResults = await getComments(blogResult.id);
//         blog.value = blogResult;
//         commentData.value = commentResults;
//         isLoading.value = false;
//       } else {
//         await fetchBlogData();
//         isLoading.value = false;
//       }
//     }
//   } catch (error: any) {
//     showErrorToast(error.message);
//   } finally {
//     isLoading.value = false;
//   }
// };

const fetchBlogContent = async () => {
  try {
    const { data: cacheBlog } = useNuxtData(postTitle.value);

    if (cacheBlog.value) {
      isLoading.value = false;
      return (blog.value = cacheBlog.value);
    } else {
      const blogResult = await getBlogByTitle(postTitle.value);
      if (blogResult) {
        console.log(blogResult);
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
    const { data: cacheComments } = useNuxtData(`comments-${postTitle.value}`);

    if (cacheComments.value) {
      return (commentData.value = cacheComments.value);
    } else if (blog.value) {
      const commentResult = await getComments(blog.value.id);
      return (commentData.value = commentResult);
    }
  } catch (error: any) {
    showErrorToast(error.message);
  }
};

onMounted(async () => {
  postTitle.value = route.params.title as string;
  await fetchBlogContent();
  await fetchBlogComments();

  useHead({
    title: `My Blog | ${blog.value?.title}`,
    titleTemplate: `My Blog | ${blog.value?.title}`,
  });
});

definePageMeta({
  middleware: "author",
});

definePageMeta({
  middleware: "author",
});
</script>
<template>
  <AuthorPostDetail :blog="blog" :commentData="commentData" v-if="blog" />
  <Loading v-if="isLoading" />
</template>
