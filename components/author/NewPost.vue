<script setup lang="ts">
import { nanoid } from "nanoid";
import { addBlog } from "../../composables/useBlogs";
import { addImage } from "../../composables/usePostImage";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import { getTags } from "../../composables/useTags";
import { getCategories } from "../../composables/useCategories";

const client = useSupabaseClient();
const config = useRuntimeConfig();
const blogCategories = ref<Array<{ id: string; name: string }> | null>(null);
const blogTags = ref<Array<{ id: string; name: string }> | null>(null);
const image = ref<File | null>(null);
let postId: string;

interface ContentDraft {
  title: string;
  text: string;
  category_id: string;
  is_published: boolean;
}

const contentDraft = ref<ContentDraft>({
  title: "",
  text: `<h2>Hi there,</h2>`,
  category_id: "",
  is_published: false,
});

const contentTags = ref<string[]>([]);

const fetchBlogCategories = async () => {
  const categories = await getCategories(client);
  blogCategories.value = categories;
};

const fetchBlogTags = async () => {
  const tags = await getTags(client);
  blogTags.value = tags;
};

const resetPostForm = () => {
  contentDraft.value = {
    title: "",
    text: `<h2>Hi there,</h2>`,
    category_id: "",
    is_published: false,
  };

  contentTags.value = [];
  image.value = null;
};

onMounted(async () => {
  await fetchBlogCategories();
  await fetchBlogTags();
});

const onTagsUpdateHandler = (tagId: string) => {
  const index = contentTags.value.indexOf(tagId);

  if (index !== -1) {
    contentTags.value.splice(index, 1);
  } else {
    contentTags.value.push(tagId);
  }
};

const onFileChangeHandler = (event: Event) => {
  try {
    const target = event.target as HTMLInputElement;
    if (target.files) image.value = target.files[0];
  } catch (error) {}
};

const savePost = async (isPublish: boolean) => {
  try {
    postId = `post-${nanoid(10)}`;

    if (!contentDraft.value.title) {
      return showErrorToast("please provide posts title");
    }
    if (!contentDraft.value.category_id.length) {
      return showErrorToast("please provide post category");
    }

    if (!contentTags.value.length) {
      return showErrorToast("please provide post tag");
    }

    const timestamp = Date.now().toString();
    let imageUrl = "";
    if (image.value) {
      const imgUrl = await addImage(
        client,
        postId,
        image.value,
        config.public.SUPABASE_URL as string
      );
      imgUrl && (imageUrl = imgUrl);
    }

    const postData: AddBlog = {
      id: postId,
      created_at: timestamp,
      updated_at: timestamp,
      image_url: imageUrl,
      ...contentDraft.value,
      is_published: isPublish,
      url_param: contentDraft.value.title.toLowerCase().replaceAll(" ", "-"),
    };

    await addBlog(client, postId, postData, contentTags.value);
    isPublish
      ? showSuccessToast("post added")
      : showSuccessToast("saved to draft");
  } catch (error: any) {
    showErrorToast(error.message);
  }
};

const onSaveDraftHandler = async () => {
  await savePost(false);
};

const onSubmitHandler = async () => {
  await savePost(true);
  resetPostForm();
};

onBeforeRouteLeave(async (to, from, next) => {
  if (
    contentDraft.value.title &&
    contentDraft.value.category_id &&
    contentDraft.value &&
    contentTags.value &&
    contentDraft.value.text
  ) {
    if (
      confirm("You changed the post content, do you want save it as draft?")
    ) {
      await savePost(false);
      next();
    } else {
      next();
    }
  } else {
    next();
  }
});
</script>
<template>
  <div class="sm:mx-6 lg:mx-40 relative">
    <button class="absolute top-5 left-2" @click="() => useRouter().go(-1)">
      <Icon name="eva:arrow-back-fill" class="w-7 h-7 sm:w-8 sm:h-8" />
    </button>
    <button class="absolute top-5 right-2 group" @click="onSaveDraftHandler">
      <Icon name="material-symbols:save" class="w-7 h-7 sm:w-8 sm:h-8" /><span
        class="hidden bg-slate-100 group-hover:inline whitespace-nowrap group-hover:absolute right-0 top-8 z-20 px-[0.8em] py-[0.4em] rounded-sm"
        >save to draft</span
      >
    </button>
  </div>
  <AuthorPostForm
    :contentDraft="contentDraft"
    :contentTags="contentTags"
    :categories="blogCategories"
    :tags="blogTags"
    :image="image"
    @on-tags-update="(tagId: string) => onTagsUpdateHandler(tagId)"
    @onfilechange="(event: Event) => onFileChangeHandler(event)"
    @onsubmit="onSubmitHandler"
    class="mb-16"
  />
</template>
