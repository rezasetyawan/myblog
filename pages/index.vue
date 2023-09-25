<script setup lang="ts">
import { getTags } from '../composables/useTags';
import { getCategories } from '../composables/useCategories'

definePageMeta({
  middleware: 'is-admin'
})
const client = useSupabaseClient();
const route = useRoute();

const blogsData = ref<BlogSnapshots | null | undefined>();
const blogCategories = ref<Array<{ id: string; name: string }> | null>(null);
const blogTags = ref<Array<{ id: string; name: string }> | null>(null);
const isLoading = ref<boolean>(true);
const page = ref<number>(parseInt(route.query.page as string) || 1);
const cacheKey = ref<string>("");

const queryParams = ref({
  searchKey: route.query.search_key ? (route.query.search_key as string) : "",
  category: route.query.category_id ? (route.query.category_id as string) : "",
  tags: route.query.tags?.length ? (route.query.tags as string[]) : [],
  page: route.query.page ? (route.query.page as string) : "1",
});

const fetchBlogCategories = async () => {
  const categories = await getCategories(client)
  blogCategories.value = categories
};

const fetchBlogTags = async () => {
  const tags = await getTags(client)
  blogTags.value = tags
}

const fetchBlogs = async () => {
  try {
    isLoading.value = true;
    const { data: blogsDataCache } = useNuxtData(cacheKey.value);
    if (blogsDataCache.value) {
      blogsData.value = blogsDataCache.value;
    } else {
      const data = await getBlogs(
        queryParams.value.searchKey,
        queryParams.value.category,
        queryParams.value.tags,
        page.value,
        cacheKey.value
      );

      data ? (blogsData.value = data) : null;
    }
    blogsData.value && (isLoading.value = false);
  } catch (error: any) {
    showErrorToast(error.message)
  }
};

onMounted(async () => {
  cacheKey.value = route.fullPath;
  await fetchBlogs();
  await fetchBlogCategories();
  await fetchBlogTags();

});

onBeforeRouteUpdate(async (to, from) => {
  if (Object.keys(to.query).length !== 0) {
    to.fullPath === "/?page=1"
      ? (cacheKey.value = "/blogs")
      : (cacheKey.value = to.fullPath);

    page.value = parseInt(to.query.page as string) || 1;
    await fetchBlogs();
  } else {
    await fetchBlogs();
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
  title: "My Blog",
  titleTemplate: "My Blog",
  meta: [
    {
      name: "description",
      content: "Blog Website that talk about technology and daily life",
    },
    {
      name: 'google-site-verification',
      content: 'isXAGr5a6Hby5euUgrk9eeLnRKlA2hfeQrUmC1jk_y0'
    }
  ],
});

definePageMeta({
  middleware: 'is-admin'
})
</script>
<template>
    <FilterSection :queryParams="queryParams" :postCategories="blogCategories" :postTags="blogTags"
      @onSearch="page = 1" />
    <Posts :blogs="blogsData?.blogs" :isLoading="isLoading"/>
    <h2 v-if="blogsData?.blogs.length === 0 && !isLoading" class="text-center mb-40">
      Blog Not Found
    </h2>
    <Pagination :page="page" :totalPage="blogsData?.totalPage"/>
</template>
