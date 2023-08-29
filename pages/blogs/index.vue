<script setup lang="ts">
import { getBlogs } from "../../composables/useBlogs";

const client = useSupabaseClient();

const blogs = ref();
const blogCategories = ref<Array<{ id: string; name: string }> | null>(null);

const isLoading = ref<boolean>(false);
const queryParams = ref({
  searchKey: "",
  category: "",
});

const getCategories = async () => {
  const { data: categories } = await useAsyncData("categories", async () => {
    const { data } = (await client.from("categories").select("id, name")) as {
      data: Array<{ id: string; name: string }>;
    };
    return data;
  });

  console.log(categories);
  blogCategories.value = categories.value;
};

const fecthBlogs = async (
  search_key: string = "",
  category_id: string = ""
) => {
  isLoading.value = true;

  try {
    // if (!route.params.search_key && !route.params.category_id) {
    //   console.log('case 1')
    //   blogs.value = await getBlogs();
    // } else {
 
    // }
    const { data: blogSnapshots } = useNuxtData("blogSnapshots");
    if (blogSnapshots.value && !search_key && !category_id) {
      blogs.value = blogSnapshots.value.data;
      isLoading.value = false;
      console.log(blogSnapshots.value)
    } else {
      console.log('tetetete')
      const data = await getBlogs(search_key, category_id);
     
      blogs.value = data
      console.log(blogs.value)
      isLoading.value = false; 
    }

    queryParams.value = {
      searchKey: "",
      category: "",
    };
  } catch (error) {
    console.error(error);
  }
};

// const fecthBlogs = async () => { 
//   isLoading.value = true;
//   const route = useRoute();
//   const { search_key, category_id } = route.query

//   try {
//     if (!search_key && !category_id) {
//       blogs.value = await getBlogs();
//     } else {
//       blogs.value = await getBlogs(search_key, category_id);
//     }
//     isLoading.value = false;
//   } catch (error) {
//     console.error(error);
//   }
// }

onMounted(async () => {
  await fecthBlogs();
  await getCategories();
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
    },
  });
};
     
 
onBeforeRouteUpdate(async (to, from) => {
  await fecthBlogs(queryParams.value.searchKey, queryParams.value.category);
});
</script>
<template>
  <section class="mx-20 flex justify-between items-center gap-3 p-2 font-rubik">
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
    <button @click="searchHandler">Search</button>
  </section>
  <Posts :blogs="blogs" />
  <h2 v-if="isLoading" class="text-center my-20">Loading...</h2>
  <h2 v-if="!blogs && !isLoading" class="text-center my-20">Blog Not Found</h2>
</template>
