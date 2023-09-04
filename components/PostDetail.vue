<script setup lang="ts">
interface Props {
  blog: GetBlogDetail;
  commentData: CommentSnapshots;
}
const props = defineProps<Props>();
</script>

<template>
  <section v-if="props.blog" class="py-10 px-28 mb-20">
    <div class="flex gap-3 justify-center font-rubik">
      <p class="flex items-center gap-1">
        <Icon name="bi:calendar-fill" />{{ formatDate(props.blog.created_at) }}
      </p>
      <p class="flex items-center gap-1">
        <Icon name="basil:chat-outline" size="24" />{{
          props.commentData.comment_counts
        }}
        comments
      </p>
      <p class="flex items-center gap-1">
        <Icon name="iconamoon:category-light" size="24" />{{
          props.blog.category
        }}
      </p>
    </div>
    <span
      v-for="tag in props.blog.tags"
      :key="tag.id"
      class="m-2 underline rounded-md"
      >#{{ tag.name }}</span
    >
    <h2 class="text-3xl text-center font-rubik font-bold">
      {{ props.blog.title }}
    </h2>
    <div class="flex justify-center py-4">
      <NuxtImg :src="props.blog.image_url" class="max-w-2xl aspect-[4/2] object-cover" loading="lazy"
        quality="50"
        placeholder />
    </div>
    <div
      v-html="props.blog.text"
      class="prose prose-base max-w-none prose-stone mx-20 prose-pre:max-w-fit prose-h2:text-2xl prose-h2:font-extrabold"
    ></div>
    <CommentSection :commentData="props.commentData" />
  </section>
</template>
