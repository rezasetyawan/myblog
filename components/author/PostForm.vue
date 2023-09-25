<script setup lang="ts">
interface ContentDraft {
  title: string;
  text: string;
  category_id: string;
  is_published: boolean;
}

interface PostCategoryAndTag {
  id: string;
  name: string;
}

interface Props {
  contentDraft: ContentDraft;
  contentTags: string[] | null | undefined;
  categories: PostCategoryAndTag[] | null | undefined;
  tags: PostCategoryAndTag[] | null | undefined;
  image?: File | null;
  isEdit?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["onsubmit", "onfilechange", "on-tags-update"]);

const { contentDraft, contentTags, categories, tags, image } = toRefs(props);

const uncheckedTags = computed(() =>
  tags.value?.filter((tag) => !contentTags.value?.includes(tag.id))
);

const checkedTags = computed(() =>
  tags.value?.filter((tag) => contentTags.value?.includes(tag.id))
);

const setInputInitialValue = () => {
  let inputImage: HTMLInputElement | null;
  inputImage = document.getElementById("inputImage") as HTMLInputElement;

  if (image && image.value) {
    const data = new DataTransfer();
    data.items.add(image.value as File);
    if (inputImage) {
      inputImage.files = data.files;
    }
  }
};

if (image) {
  watch(image, () => {
    setInputInitialValue();
  });
}

const getImageUrl = () => {
  if (image?.value) {
    return URL.createObjectURL(image.value);
  }
};

onMounted(() => {
  setInputInitialValue();
});
</script>
<template>
  <form id="post-form" class="font-rubik sm:mx-6 lg:mx-40" @submit.prevent="() => emit('onsubmit')">
    <h2 class="font-bold text-xl my-3 text-center sm:text-2xl sm:my-5 lg:text-3xl">
      {{ props.isEdit ? "Edit Post" : "Create New Post" }}
    </h2>
    <section class="text-sm sm:text-base">
      <div class="my-5">
        <label class="font-medium my-1">Title</label>
        <input class="bg-white px-[0.4em] py-[0.3em] border-[1px] rounded-md block w-full sm:w-[50%] focus:outline-none"
          v-model="contentDraft.title" required />
      </div>
      <div class="my-5">
        <label class="font-medium my-1 block">Category</label>
        <select class="px-[0.4em] py-[0.3em] block border-[1px] rounded-md b" v-model="contentDraft.category_id" required>
          <option value="" disabled class="px-2 py-1">Chose Category</option>
          <option v-for="category in categories" :key="category.id" :value="category.id" class="px-2 py-1 my-1">
            {{ category.name }}
          </option>
        </select>
      </div>
      <div class="font-rubik my-5">
        <label class="font-medium">Tags</label>
        <div class="flex flex-wrap max-w-[300px] gap-0">
          <label v-for="tag in checkedTags" :key="tag.id"
            class="checked-label border-2 border-slate-100 px-[0.8em] py-[0.4em] rounded-md hover:cursor-pointer">
            <input type="checkbox" @change="emit('on-tags-update', tag.id)" :value="tag.id"
              class="w-full h-full hidden" />
            {{ tag.name }}
          </label>
          <label v-for="tag in uncheckedTags" :key="tag.id"
            class="border-2 border-slate-100 px-[0.8em] py-[0.4em] rounded-md hover:cursor-pointer">
            <input type="checkbox" @change="emit('on-tags-update', tag.id)" :value="tag.id"
              class="w-full h-full hidden" />
            {{ tag.name }}
          </label>
        </div>
      </div>
      <div class="my-5 w-fit">
        <label class="font-medium">Image</label>
        <img v-if="image" :src="getImageUrl()" alt="Selected Image" class="max-w-[150px] mt-3" />
        <div class="flex items-center w-fit gap-2 relative">
          <div class="bg-slate-200 p-1 w-fit rounded-md absolute -z-10">
            <Icon name="octicon:plus-16" size="24" class="w-6 h-6 font-semibold" />
          </div>
          <input id="inputImage" type="file" @change="(event) => emit('onfilechange', event)"
            accept="image/png, image/jpeg, image/jpg" required
            class="block max-w-fit file:hidden pb-3 py-4 my-3 pl-12 font-normal hover:cursor-pointer" />
        </div>
      </div>
    </section>
    <div class="my-5">
      <label class="font-medium my-1 block">Body</label>
      <TiptapEditor :text="contentDraft.text" @onchange="(editorcontent) => (contentDraft.text = editorcontent)" />
    </div>
    <div class="flex justify-end items-center">
      <button type="submit"
        class="text-sm leading-tight font-bold text-white bg-red-800 px-3 py-1.5 my-2 sm:text-base lg:text-lg">
        {{ props.isEdit ? "UPDATE POST" : "CREATE POST" }}
      </button>
    </div>
  </form>
</template>
<style scoped>
.checked-label {
  background-color: #e2e8f0;
}
</style>
