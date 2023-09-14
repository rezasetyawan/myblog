<script setup lang="ts">
import { nanoid } from "nanoid";
import { addBlog } from "../../composables/useBlogs";
import { addImage } from "../../composables/usePostImage";

const client = useSupabaseClient();
const blogCategories = ref<Array<{ id: string; name: string }> | null>(null);
const taglist = ref<Array<{ id: string; name: string }> | null>(null);
const image = ref<File | null>(null);
const config = useRuntimeConfig();

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

    if (!contentDraft.value.category_id.length) {
      throw new Error("mohon sertakan category");
    }
    const postId = `post-${nanoid(10)}`;
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
      console.log(imageUrl);
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
</template>
