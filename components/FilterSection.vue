<script setup lang="ts">
interface PostCategoryAndTag {
  id: string;
  name: string;
}

interface QueryParams {
  searchKey: string;
  category: string;
  tags: string[];
  page: string;
}

interface Props {
  queryParams: QueryParams;
  postCategories: PostCategoryAndTag[] | null;
  postTags: PostCategoryAndTag[] | null;
}

const props = defineProps<Props>();
const emit = defineEmits(["onSearch"]);

const checkedTags = computed(() =>
  props.postTags?.filter((tag) => props.queryParams.tags.includes(tag.id))
);

const uncheckedTags = computed(() =>
  props.postTags?.filter((tag) => !props.queryParams.tags.includes(tag.id))
);

const searchHandler = async () => {
  useRouter().push({
    query: {
      search_key: props.queryParams.searchKey,
      category_id: props.queryParams.category,
      tags: props.queryParams.tags,
    },
  });
  emit("onSearch");
};
</script>
<template>
  <section
    class="mx-3 flex flex-wrap justify-between items-center gap-3 p-2 font-rubik my-3 sm:flex-nowrap sm:mx-5 lg:mx-10"
  >
    <input
      type="text"
      class="p-[0.4em] focus:outline-none border-2 rounded-md w-full text-sm sm:text-base"
      @keyup.enter="searchHandler"
      v-model="props.queryParams.searchKey"
      placeholder="Search blog..."
    />
    <select
      v-model="props.queryParams.category"
      class="px-[0.8em] py-[0.4em] text-sm sm:text-base"
    >
      <option value="" disabled class="px-2 py-1">Chose Category</option>
      <option value="" class="px-2 py-1 my-1">All Category</option>
      <option
        v-for="category in props.postCategories"
        :key="category.id"
        :value="category.id"
        class="px-2 py-1 my-1"
      >
        {{ category.name }}
      </option>
    </select>

    <button
      @click="searchHandler"
      class="px-[0.8em] py-[0.4em] bg-slate-100 rounded-md text-sm sm:text-base"
    >
      Search
    </button>
  </section>
  <div class="font-rubik mx-3 sm:mx-5 lg:mx-10 text-sm sm:text-base">
    <p>Select Tags:</p>
    <div class="flex flex-wrap max-w-[300px] gap-0">
      <label
        v-for="tag in checkedTags"
        :key="tag.id"
        class="checked-label border-2 border-slate-100 px-[0.8em] py-[0.4em] rounded-md hover:cursor-pointer"
      >
        <input
          type="checkbox"
          v-model="props.queryParams.tags"
          :value="tag.id"
          class="w-full h-full hidden"
        />
        {{ tag.name }}
      </label>
      <label
        v-for="tag in uncheckedTags"
        :key="tag.id"
        class="border-2 border-slate-100 px-[0.8em] py-[0.4em] rounded-md hover:cursor-pointer text-sm sm:text-base"
      >
        <input
          type="checkbox"
          v-model="props.queryParams.tags"
          :value="tag.id"
          class="w-full h-full hidden"
        />
        {{ tag.name }}
      </label>
    </div>
  </div>
</template>
<style scoped>
.checked-label {
  background-color: #e2e8f0; /* Change this color to your desired background color */
}
</style>
