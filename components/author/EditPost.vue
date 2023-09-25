<script setup lang="ts">
// import { updateBlogById, updateBlogTagsById } from "../../composables/useBlogs";
// import { deleteImage } from "../../composables/usePostImage";
// import { isObjectEqual } from "../../utils/isObjectEqual";
// import { isArrayEqual } from "../../utils/isArrayEqual";
// import { getFileNameFromUrl } from "../../utils/getFileName";
// import { showSuccessToast, showErrorToast } from '../../utils/toast'

const config = useRuntimeConfig();

interface Props {
  blog: GetBlogDetail;
}

interface ContentDraft {
  title: string;
  text: string;
  category_id: string;
  is_published: boolean;
}
const props = defineProps<Props>();

const { blog } = toRefs(props);
const client = useSupabaseClient();

const blogCategories = ref<Array<{ id: string; name: string }> | null>(null);
const taglist = ref<Array<{ id: string; name: string }> | null>(null);
const image = ref<File>();
const isImageChanged = ref<boolean>(false);
const isPostUpdated = ref<boolean>(false);

const contentDraft = ref<ContentDraft>({
  title: "",
  text: "",
  category_id: "",
  is_published: false,
});

const initialContentDraft: ContentDraft = {
  title: blog.value.title,
  text: blog.value.text,
  category_id: blog.value.category_id,
  is_published:
    blog.value.is_published !== undefined && blog.value.is_published,
};

contentDraft.value = {
  title: blog.value.title,
  text: blog.value.text,
  category_id: blog.value.category_id,
  is_published:
    blog.value.is_published !== undefined && blog.value.is_published,
};

const contentTags = ref<string[]>();
contentTags.value = blog.value.tags.map((tag) => tag.id);

const initialContentTags: string[] = [];
blog.value.tags.map((tag) => initialContentTags.push(tag.id));

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

const getImageFile = async (): Promise<Blob> => {
  const { data } = await useFetch(blog.value.image_url);
  return data.value as Blob;
};

let imageInitialValue: File;

const setImageInitialValue = async () => {
  const blob: Blob = await getImageFile();

  const file = new File(
    [blob],
    `${getFileNameFromUrl(blog.value.image_url, "post-images")}`,
    {
      type: blob.type,
    }
  );

  imageInitialValue = file;
  image.value = file;
};

onMounted(async () => {
  await getCategories();
  await getTags();
  await setImageInitialValue();

  if (image.value) {
    watch(image, () => {
      isImageChanged.value = true;
    });
  }
});

const onTagsUpdateHandler = (tagId: string) => {
  const index = contentTags.value?.indexOf(tagId);

  if (index !== -1 && index !== undefined) {
    contentTags.value?.splice(index, 1);
  } else {
    contentTags.value?.push(tagId);
  }
};

const onFileChangeHandler = (event: Event) => {
  const target = event.target as HTMLInputElement;
  !!target.files && (image.value = target.files[0]);
};

const checkIsPostUpdated = () => {
  const isContentChanged: boolean = !isObjectEqual(
    contentDraft.value,
    initialContentDraft
  );

  const isTagsChanged: boolean = !isArrayEqual(
    (contentTags.value as []) || [],
    initialContentTags as []
  );

  if (isContentChanged || isTagsChanged || isImageChanged.value) {
    return true;
  }

  return false;
};

const updatePost = async () => {
  try {

    if (!contentDraft.value.title) {
      return showErrorToast('please provide post title')
    }
    if (!contentDraft.value.category_id.length) {
      return showErrorToast('please provide post category')
    }

    if (!contentTags.value?.length) {
      return showErrorToast('please provide post tag')
    }

    const isContentChanged: boolean = !isObjectEqual(
      contentDraft.value,
      initialContentDraft
    );

    const isTagsChanged: boolean = !isArrayEqual(
      (contentTags.value as []) || [],
      initialContentTags as []
    );

    const updatedAt = Date.now().toString();
    let imageUrl;

    if (
      isImageChanged.value &&
      image.value !== undefined &&
      image.value !== null
    ) {
      await deleteImage(client, imageInitialValue.name);
      imageUrl = await updateImageById(
        client,
        blog.value.id,
        image.value,
        config.public.SUPABASE_URL as string
      );
    }

    await updateBlogById(client, blog.value.id, {
      updated_at: updatedAt,
      ...contentDraft.value,
      image_url: imageUrl,
      is_published: false,
      url_param: contentDraft.value.title.toLowerCase().replaceAll(' ', '-')
    });

    if (isContentChanged) {
      await updateBlogById(client, blog.value.id, {
        updated_at: updatedAt,
        ...contentDraft.value,
        image_url: imageUrl,
      });
    }

    if (isTagsChanged && contentTags.value) {
      await updateBlogTagsById(client, blog.value.id, contentTags.value);
    }

    isPostUpdated.value = true;
    showSuccessToast('post updated')
  } catch (error: any) {
    showErrorToast(error.message)
  }
};

onBeforeRouteLeave(async (to, from, next) => {
  const isPostChanged = checkIsPostUpdated()
  if (isPostChanged && !isPostUpdated.value) {
    if (
      confirm("You changed the post content, do you want save it as draft?")
    ) {
      await updatePost();
      clearNuxtData(blog.value.id);
      next();
    } else {
      next();
    }
  } else {
    next();
  }
});

const onSubmitHandler = async () => {
  await updatePost();
  clearNuxtData(blog.value.id);
};
</script>
<template>
  <div>
    <button class="absolute top-5 left-5" @click="() => useRouter().go(-1)">
      <Icon name="eva:arrow-back-fill" class="w-8 h-8" />
    </button>
    <AuthorPostForm :contentDraft="contentDraft" :contentTags="contentTags" :categories="blogCategories" :tags="taglist"
      :image="image" :isEdit="true" @on-tags-update="(tagId: string) => onTagsUpdateHandler(tagId)"
      @onfilechange="(event: Event) => onFileChangeHandler(event)" @onsubmit="onSubmitHandler" class="mb-16" />
  </div>
</template>
