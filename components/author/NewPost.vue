<script setup lang="ts">
const client = useSupabaseClient();
const blogCategories = ref<Array<{ id: string; name: string }> | null>(null);
const taglist = ref<Array<{ id: string; name: string }> | null>(null);

interface ContentDraft {
  content: string;
  category: string;
  tags: string[];
}
const contentDraft = ref<ContentDraft>({
  content: "",
  category: "",
  tags: [],
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

onMounted(async () => {
  await getCategories();
  await getTags();
});

watch(contentDraft.value, () => {
  console.log(contentDraft.value);
});

const checkedTags = computed(() =>
  taglist.value?.filter((tag) => contentDraft.value.tags.includes(tag.id))
);

const uncheckedTags = computed(() =>
  taglist.value?.filter((tag) => !contentDraft.value.tags.includes(tag.id))
);
</script>
<template>
  <main class="font-rubik sm:mx-6 lg:mx-20">
    <h2 class="font-bold text-3xl my-10 text-center">Create New Post</h2>
    <div class="my-5">
      <label class="font-medium my-1">Title</label>
      <input
        class="bg-white px-[0.4em] py-[0.3em] border-[1px] rounded-md block w-[50%] focus:outline-none"
      />
    </div>
    <div class="my-5">
      <label class="font-medium my-1 block">Category</label>
      <select
        class="px-[0.4em] py-[0.3em] block border-[1px] rounded-md b"
        v-model="contentDraft.category"
      >
        <option value="" disabled class="px-2 py-1">Chose Category</option>
        <option
          v-for="category in blogCategories"
          :key="category.id"
          :value="category.id"
          class="px-2 py-1 my-1"
        >
          {{ category.name }}
        </option>
      </select>
    </div>
    <div class="font-rubik my-5">
      <label class="font-medium">Tags</label>
      <div class="flex flex-wrap max-w-[300px] gap-0">
        <label
          v-for="tag in checkedTags"
          :key="tag.id"
          class="checked-label border-2 border-slate-100 px-[0.8em] py-[0.4em] rounded-md hover:cursor-pointer"
        >
          <input
            type="checkbox"
            v-model="contentDraft.tags"
            :value="tag.id"
            class="w-full h-full hidden"
            required
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
            v-model="contentDraft.tags"
            :value="tag.id"
            class="w-full h-full hidden"
            required
          />
          {{ tag.name }}
        </label>
      </div>
    </div>
    <div class="my-5 w-fit">
      <label class="font-medium">Image</label>
      <div class="flex items-center gap-2 relative">
        <div class="bg-slate-200 p-1 w-fit rounded-md absolute -z-10">
          <Icon
            name="octicon:plus-16"
            size="24"
            class="w-6 h-6 transition duration-75 group-hover:scale-105 font-semibold"
          />
        </div>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          class="block w-fit file:hidden pb-3 py-4 my-3 pl-10 font-normal hover:cursor-pointer"
          required
        />
      </div>
    </div>
    <div class="my-5">
      <label class="font-medium my-1 block">Body</label>
      <TiptapEditor
        @onchange="(editorcontent) => (contentDraft.content = editorcontent)"
      />
    </div>
  </main>
</template>
<style scoped>
.checked-label {
  background-color: #e2e8f0; /* Change this color to your desired background color */
}
</style>
