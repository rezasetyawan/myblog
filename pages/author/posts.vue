<script setup lang="ts">
import { getAuthorBlogs } from '../../composables/useBlogs';
const client = useSupabaseClient();
const route = useRoute();

const blogsData = ref<BlogSnapshots | null | undefined>();
const blogCategories = ref<Array<{ id: string; name: string }> | null>(null);
const taglist = ref<Array<{ id: string; name: string }> | null>(null);
const isLoading = ref<boolean>(true);
const page = ref<number>(parseInt(route.query.page as string) || 1);
const cacheKey = ref<string>("");

const queryParams = ref({
  searchKey: route.query.search_key ? (route.query.search_key as string) : "",
  category: route.query.category_id ? (route.query.category_id as string) : "",
  tags: route.query.tags?.length ? (route.query.tags as string[]) : [],
  page: route.query.page ? (route.query.page as string) : "1",
});

const getCategories = async () => {
  const { data: categories } = await useAsyncData("categories", async () => {
    const { data } = (await client.from("categories").select("id, name")) as {
      data: Array<{ id: string; name: string }>;
    };
    return data;
  });
  blogCategories.value = categories.value;
};

const getTags = async () => {
  const { data } = await useAsyncData("categories", async () => {
    const { data } = (await client.from("tags").select("id, name")) as {
      data: Array<{ id: string; name: string }>;
    };
    return data;
  });
  taglist.value = data.value;
};

const fetchBlogs = async () => {
  try {
    isLoading.value = true;
    const { data: blogsDataCache } = useNuxtData(cacheKey.value);
    if (blogsDataCache.value) {
      blogsData.value = blogsDataCache.value;
    } else {
      blogsData.value = await getAuthorBlogs(
        queryParams.value.searchKey,
        queryParams.value.category,
        queryParams.value.tags,
        page.value,
        cacheKey.value
      );
    }
    blogsData.value && (isLoading.value = false);
  } catch (error) {
    console.error(error);
  }
};

onBeforeMount(async () => {
  cacheKey.value = route.fullPath;
  await fetchBlogs();
  await getCategories();
  await getTags();
});

onBeforeRouteUpdate(async (to, from) => {
  if (Object.keys(to.query).length !== 0) {
    to.fullPath === "/author/posts?page=1"
      ? (cacheKey.value = "/author/posts")
      : (cacheKey.value = to.fullPath);

    page.value = parseInt(to.query.page as string) || 1;
    await fetchBlogs();
  } else {
    isLoading.value = true;
    blogsData.value = await getAuthorBlogs();
    isLoading.value = false;
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

useServerSeoMeta({
  title: "My Blog",
  ogTitle: "My Blog",
  description: "Blog Website that talk about technology and daily life",
  ogDescription: "Blog Website that talk about technology and daily life",
});

useHead({
  title: "My Blogs",
  titleTemplate: "My Blogs",
  meta: [
    {
      name: "description",
      content: "Blog Website that talk about technology and daily life",
    },
  ],
});
</script>
<template>
  <main>
    <FilterSection
      :queryParams="queryParams"
      :postCategories="blogCategories"
      :postTags="taglist"
      @onSearch="page = 1"
    />
    <AuthorPosts :blogs="blogsData?.blogs"/>
    <h2
      v-if="blogsData?.blogs.length === 0 && !isLoading"
      class="text-center my-20"
    >
      Blog Not Found
    </h2>
    <Pagination :page="page" :totalPage="blogsData?.totalPage" />
  </main>
</template>
