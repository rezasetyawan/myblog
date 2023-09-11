<script setup lang="ts">
interface Props {
  blog: GetBlog;
  isLoading?: boolean;
}
const props = defineProps<Props>();
</script>
<template>
  <NuxtLink :to="`/author/post/${props.blog.id}`">
  <div class="group border-2 rounded-lg p-1 my-2 w-full flex justify-between">
    <div class="flex gap-2">
      <NuxtImg
        :src="props.blog.image_url"
        class="min-h-[100px] max-h-[100px] sm:min-h-[100px] sm:max-h-[100px] object-cover brightness-90 group-hover:brightness-100 transition-all rounded-sm aspect-[4/2]"
        loading="lazy"
        quality="50"
        :alt="props.blog.title"
        placeholder
      />
      <div>
        <h3 class="text-left font-medium text-xl py-1 font-rubik">
          {{ props.blog.title }}
        </h3>
        <p>
          {{ formatDate(props.blog.created_at) }}
        </p>
      </div>
    </div>
    <div class="flex gap-3 items-center justify-center font-medium text-sm text-black">
      <p>{{ props.blog.comment_counts }}  <Icon name="basil:chat-outline" size="24" /> </p>
     </div>
  </div>
</NuxtLink>
</template>
