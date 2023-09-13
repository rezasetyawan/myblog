<script setup lang="ts">
import { nanoid } from "nanoid";
import { addBlog } from "../../composables/useBlogs";
import { addImage } from "../../composables/usePostImage";

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
const image = ref<File | null>(null);

const contentDraft = ref<ContentDraft>({
  title: blog.value ? blog.value.title : "",
  text: blog.value ? blog.value.text : `<h2>Hi there,</h2>`,
  category_id: blog.value ? blog.value.category_id : "",
  is_published:
    blog.value.is_published !== undefined ? blog.value.is_published : false,
});

const contentTags = ref<string[]>([]);
blog.value ? (contentTags.value = blog.value.tags.map((tag) => tag.id)) : null;

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

const setImageInitialValue = async () => {
  const blob: Blob = await getImageFile();

  const file = new File([blob], `${blog.value.title}-img`, {
    type: blob.type,
  });

  image.value = file;
};

onMounted(async () => {
  await getCategories();
  await getTags();
  setImageInitialValue()
});

watch(contentDraft.value, () => {
  console.log(contentDraft.value);
});

watch(contentTags.value, () => {
  console.log(contentTags.value);
});

watch(image, () => {
  console.log(image.value);
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
  const target = event.target as HTMLInputElement;
  !!target.files && (image.value = target.files[0]);
};

const onSubmitHandler = async () => {
  try {
    if (!contentTags.value.length) {
      throw new Error("mohon sertakan tag");
    }
    const postId = `post-${nanoid(10)}`;
    const timestamp = Date.now().toString();

    let imageUrl = "";
    if (image.value) {
      const imgUrl = await addImage(client, postId, image.value);
      !!imgUrl && (imageUrl = imgUrl);
    }

    const postData: AddBlog = {
      id: postId,
      created_at: timestamp,
      updated_at: timestamp,
      image_url: imageUrl,
      ...contentDraft.value,
      is_published: true,
    };

    await addBlog(client, postId, postData, contentTags.value);
    alert("success");
  } catch (error: any) {
    console.error(error.message);
  }
};
</script>
<template>
  <div>
    <button class="absolute top-5 left-5" @click="() => useRouter().go(-1)">
      <Icon name="eva:arrow-back-fill" class="w-8 h-8" />
    </button>
    <AuthorPostForm
      :contentDraft="contentDraft"
      :contentTags="contentTags"
      :categories="blogCategories"
      :tags="taglist"
      :image="image"
      @on-tags-update="(tagId: string) => onTagsUpdateHandler(tagId)"
      @onfilechange="(event: Event) => onFileChangeHandler(event)"
      @onsubmit="onSubmitHandler"
      class="mb-16"
    />
  </div>
</template>
