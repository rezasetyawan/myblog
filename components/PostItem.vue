<script setup lang="ts">
import { formatDate } from "../utils/formatDate";

interface Props {
  blog: GetBlog;
  isLoading: boolean;
}
const props = defineProps<Props>();
</script>

<template>
  <div class="group rounded-lg p-2 my-2 shadow-md w-full" v-if="props.blog">
    <NuxtLink :to="`/blog/${props.blog.url_param}`">
      <NuxtImg :src="props.blog.image_url ? props.blog.image_url : ''"
        class="object-cover brightness-90 group-hover:brightness-100 transition-all w-full rounded-sm aspect-[4/2]"
        loading="lazy" quality="50" :alt="props.blog.title" placeholder />
      <h3 class="text-center font-medium text-xl py-3 font-rubik">{{ props.blog.title }}</h3>
      <div class="flex gap-3 items-center justify-center font-medium text-sm text-slate-700">
        <p>
          {{ formatDate(props.blog.created_at) }}
        </p>
        &#8226
        <p>{{ props.blog.comment_counts }} comments</p>
      </div>
    </NuxtLink>
  </div>
</template>

