<script setup lang="ts">
const client = useSupabaseClient();
const route = useRoute();

const blogsData = ref<BlogSnapshots | null | undefined>();
const blogCategories = ref<Array<{ id: string; name: string }> | null>(null);
const blogTags = ref<Array<{ id: string; name: string }> | null>(null);
const isLoading = ref<boolean>(false);
const page = ref<number>(parseInt(route.query.page as string) || 1);
const cacheKey = ref<string>("/author/posts");

const queryParams = ref({
  searchKey: route.query.search_key ? (route.query.search_key as string) : "",
  category: route.query.category_id ? (route.query.category_id as string) : "",
  tags: route.query.tags?.length ? (route.query.tags as string[]) : [],
  page: route.query ? (route.query.page as string) : "1",
});

const fetchBlogCategories = async () => {
  const categories = await getCategories(client);
  blogCategories.value = categories;
};

const fetchBlogTags = async () => {
  const tags = await getTags(client);
  blogTags.value = tags;
};

const fetchBlogs = async () => {
  try {
    isLoading.value = true;
    const { data: blogsDataCache } = useNuxtData(cacheKey.value);
    if (blogsDataCache.value) {
      blogsData.value = blogsDataCache.value;
    } else {
      const data = await getAuthorBlogs(
        queryParams.value.searchKey,
        queryParams.value.category,
        queryParams.value.tags,
        page.value,
        cacheKey.value
      );

      console.log(data);
      data ? (blogsData.value = data) : null;
    }

    blogsData.value && (isLoading.value = false);
  } catch (error: any) {
    showErrorToast(error.message);
  }
};

// BUAT SOLVE BUG ANEH (DATA NULL) NGGAK TAU KENAPA, TAPI INTINYA FUNCTIONNYA TETAP KE CALL SATU KALI DOANG BESOK GWE BENERIN (OPSIONAL)
await getAuthorBlogs(
  queryParams.value.searchKey,
  queryParams.value.category,
  queryParams.value.tags,
  page.value,
  cacheKey.value
);

onMounted(async () => {
  cacheKey.value = route.fullPath;
  await fetchBlogs();
  await fetchBlogCategories();
  await fetchBlogTags();
});

onBeforeRouteUpdate(async (to, from) => {
  if (Object.keys(to.query).length !== 0) {
    to.fullPath === "/author/posts?page=1"
      ? (cacheKey.value = "/author/posts")
      : (cacheKey.value = to.fullPath);

    page.value = parseInt(to.query.page as string) || 1;
    await fetchBlogs();
  } else {
    blogsData.value = await getAuthorBlogs();
    queryParams.value = {
      searchKey: "",
      category: "",
      tags: [],
      page: "1",
    };
  }
});

watch(
  [route],
  async () => {
    await fetchBlogs();
  },
  { immediate: true }
);

watch(route, (newValue) => {
  cacheKey.value = newValue.fullPath;
});

const handlePublishStatusChange = (postId: string) => {
  const index = blogsData.value?.blogs.findIndex((blog) => blog.id === postId);

  if (index !== -1 && index !== undefined) {
    blogsData.value?.blogs
      ? (blogsData.value.blogs[index].is_published =
          !blogsData.value?.blogs[index].is_published)
      : null;
  }
};

const handleDeletePost = (postId: string) => {
  try {
    const index = blogsData.value?.blogs?.findIndex(
      (blog) => blog.id === postId
    );
    if (index !== undefined && index !== -1)
      blogsData.value?.blogs?.splice(index, 1);
    showSuccessToast("post deleted");
  } catch (error: any) {
    showErrorToast(error.message);
  }
};

useHead({
  title: "Posts | My Blog",
  titleTemplate: "Posts | My Blog",
});

definePageMeta({
  middleware: "author",
  layout: "author-layout",
});
</script>
<template>
  <FilterSection
    :queryParams="queryParams"
    :postCategories="blogCategories"
    :postTags="blogTags"
    @onSearch="page = 1"
  />
  <AuthorPosts
    :blogs="blogsData?.blogs"
    :isLoading="isLoading"
    @update-post-status="(id: string) => handlePublishStatusChange(id)"
    @delete-post="(id: string) => handleDeletePost(id)"
  />
  <h2
    v-if="blogsData?.blogs.length === 0 && !isLoading"
    class="text-center mb-40"
  >
    Blog Not Found
  </h2>
  <Pagination :page="page" :totalPage="blogsData?.totalPage" />
</template>
