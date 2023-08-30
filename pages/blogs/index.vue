<script setup lang="ts">
import { getBlogs } from "../../composables/useBlogs";

const client = useSupabaseClient();

const blogs = ref<GetBlog[] | null | undefined>([]);
const blogCategories = ref<Array<{ id: string; name: string }> | null>(null);
const tags = ref<Array<{ id: string; name: string }> | null>(null);
const isLoading = ref<boolean>(false);

const queryParams = ref({
  searchKey: "",
  category: "",
  tags: [] as string[]
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
  tags.value = data.value;
}

// const fetchBlogs = async (
//   search_key: string = "",
//   category_id: string = ""
// ) => {
//   try {
//     isLoading.value = true;

//     // const { data: blogSnapshots } = useNuxtData(
//     //   `blogsnapshot-search_key=${search_key}&category_id=${category_id}`
//     // );

//     // console.log(blogSnapshots.value);
//     // if (blogSnapshots.value !== null) {
//     //   blogs.value = blogSnapshots.value;
//     // } else {
//       console.log("ampun bang");
//       console.log(
//         `blogsnapshot-search_key=${search_key}&category_id=${category_id}`
//       );
//       // console.log(blogSnapshots.value)
//       blogs.value = await getBlogs(search_key, category_id);
//       console.log(blogs.value);
//     // }

//     // if (blogs.value?.length === 0 || blogs.value === null) {
//     //   blogs.value = await getBlogs(search_key, category_id);
//     //   console.log(blogs.value);
//     // }

//     isLoading.value = false;

//     queryParams.value = {
//       searchKey: "",
//       category: "",
//       tags: []
//     };
//   } catch (error) {
//     console.error(error);
//   }
// };

const fetchBlogs = async (search_key: string = "", category_id: string = "") => {
  try {
    isLoading.value = true;

    

    blogs.value = await getBlogs(search_key, category_id, queryParams.value.tags);

    isLoading.value = false;

    queryParams.value = {
      searchKey: "",
      category: "",
      tags: [] // Clear selected tags after fetching
    };
  } catch (error) {
    console.error(error);
  }
};


onBeforeMount(async () => {
  await fetchBlogs(queryParams.value.searchKey, queryParams.value.category);
  await getCategories();
  await getTags()
});

// onBeforeRouteUpdate(async (to, from) => {
//   if (to.path === "/blogs") {
//     await fecthBlogs();
//   }
// });

const searchHandler = async () => {
  useRouter().push({
    path: "/blogs",
    query: {
      search_key: queryParams.value.searchKey,
      category_id: queryParams.value.category,
      tags: queryParams.value.tags,
    },
  });
};

onBeforeRouteUpdate(async (to, from) => {
  await fetchBlogs(queryParams.value.searchKey, queryParams.value.category);
});

watch(queryParams, () => {
  console.log(queryParams)
}, {immediate: true})
</script>
<template>
  <section
    class="mx-20 flex justify-between items-center gap-3 p-2 font-rubik my-3"
  >
    <input
      type="text"
      class="p-2 focus:outline-none border-2 rounded-md w-full"
      @keyup.enter="searchHandler()"
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
  <label v-for="tag in tags" :key="tag.id" class="block max-w-fit">
    <input
      type="checkbox"
      v-model="queryParams.tags"
      :value="tag.id"
      @change="console.log(queryParams)"
    />
    {{ tag.name }}
  </label>
</div>
  <Posts :blogs="blogs" />
  <h2 v-if="isLoading" class="text-center my-20">Loading...</h2>
  <h2 v-if="!blogs && !isLoading" class="text-center my-20">Blog Not Found</h2>
</template>
