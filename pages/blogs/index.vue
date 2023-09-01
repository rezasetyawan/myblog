<script setup lang="ts">
import { getBlogs } from "../../composables/useBlogs";

const client = useSupabaseClient();
const route = useRoute();

const blogsData = ref<BlogSnapshots | null | undefined>({
  blogs: [],
  totalPage: 1,
});
const blogCategories = ref<Array<{ id: string; name: string }> | null>(null);
const taglist = ref<Array<{ id: string; name: string }> | null>(null);
const isLoading = ref<boolean>(true);
const page = ref<number>(parseInt(route.query.page as string) || 1);
const cacheKey = ref<string>("/blogs");

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

    if (cacheKey.value !== "/blogs") {
      const { data: blogsDataCache } = useNuxtData(cacheKey.value);
      if (blogsDataCache.value) {
        blogsData.value = blogsDataCache.value;
      } else {
        blogsData.value = await getBlogs(
          queryParams.value.searchKey,
          queryParams.value.category,
          queryParams.value.tags,
          page.value,
          cacheKey.value
        );
      }
    } else {
      blogsData.value = await getBlogs(
        queryParams.value.searchKey,
        queryParams.value.category,
        queryParams.value.tags,
        page.value,
        cacheKey.value
      );
    }
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
};

const checkedTags = computed(() =>
  taglist.value?.filter((tag) => queryParams.value.tags.includes(tag.id))
);

const uncheckedTags = computed(() =>
  taglist.value?.filter((tag) => !queryParams.value.tags.includes(tag.id))
);

onBeforeMount(async () => {
  await fetchBlogs();
  await getCategories();
  await getTags();
});

const searchHandler = async () => {
  useRouter().push({
    query: {
      search_key: queryParams.value.searchKey,
      category_id: queryParams.value.category,
      tags: queryParams.value.tags,
    },
  });
  page.value = 1;
};

onBeforeRouteUpdate(async (to, from) => {
  if (Object.keys(to.query).length !== 0) {
    cacheKey.value = to.fullPath;
    page.value = parseInt(to.query.page as string) || 1;
    await fetchBlogs();
  } else {
    isLoading.value = true;
    blogsData.value = await getBlogs();
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
</script>
<template>
  <main class="relative">
    <section
      class="mx-20 flex justify-between items-center gap-3 p-2 font-rubik my-3"
    >
      <input
        type="text"
        class="p-2 focus:outline-none border-2 rounded-md w-full"
        @keyup.enter="searchHandler"
        v-model="queryParams.searchKey"
        placeholder="Search blog..."
      />
      <select v-model="queryParams.category" class="p-[0.3em]">
        <option value="" disabled class="px-2 py-1">Chose Category</option>
        <option value="" class="px-2 py-1 my-1">All Category</option>
        <option
          v-for="category in blogCategories"
          :key="category.id"
          :value="category.id"
          class="px-2 py-1 my-1"
        >
          {{ category.name }}
        </option>
      </select>

      <button
        @click="searchHandler"
        class="px-[0.8em] py-[0.4em] bg-slate-100 rounded-md"
      >
        Search
      </button>
    </section>
    <div class="font-rubik mx-20">
      <p>Select Tags:</p>
      <div class="flex flex-wrap max-w-[300px] gap-0">
        <label
          v-for="tag in checkedTags"
          :key="tag.id"
          class="checked-label border-2 border-slate-100 px-[0.8em] py-[0.4em] rounded-md hover:cursor-pointer"
        >
          <input
            type="checkbox"
            v-model="queryParams.tags"
            :value="tag.id"
            class="w-full h-full hidden"
          />
          {{ tag.name }}
        </label>

        <label
          v-for="tag in uncheckedTags"
          :key="tag.id"
          class="border-2 border-slate-100 px-[0.8em] py-[0.4em] rounded-md hover:cursor-pointer"
        >
          <input
            type="checkbox"
            v-model="queryParams.tags"
            :value="tag.id"
            class="w-full h-full hidden"
          />
          {{ tag.name }}
        </label>
      </div>
    </div>
    <Posts :blogs="blogsData?.blogs">
      <div v-if="isLoading">
        <Loading />
      </div>
    </Posts>
    <h2
      v-if="blogsData?.blogs.length === 0 && !isLoading"
      class="text-center my-20"
    >
      Blog Not Found
    </h2>
    <Pagination
      :page="page"
      :totalPage="blogsData?.totalPage"
      :class="{'my-32': isLoading}"
    />
  </main>
</template>
<style scoped>
.checked-label {
  background-color: #e2e8f0; /* Change this color to your desired background color */
}
</style>
