<script setup lang="ts">
import { formatDate } from "../utils/formatDate";

interface Props {
  blog: GetBlog;
  isLoading: boolean;
}
const props = defineProps<Props>();
console.log(props.blog)
</script>

<template>
  <NuxtLink :to="`/blog/${props.blog.url_param}`">
    <div class="group w-full" v-if="props.blog">
      <NuxtImg
        :src="props.blog.image_url ? props.blog.image_url : ''"
        class="min-h-[200px] max-h-[200px] sm:min-h-[250px] sm:max-h-[250px] object-cover brightness-90 group-hover:brightness-100 transition-all rounded-sm aspect-[4/2] block mx-auto"
        loading="lazy"
        quality="50"
        :alt="props.blog.title"
        placeholder
      />
      <h3 class="text-center font-medium text-xl py-3 font-rubik">{{ props.blog.title }}</h3>
     <div class="flex gap-3 items-center justify-center font-medium text-sm text-slate-700">
      <p>
        {{ formatDate(props.blog.created_at) }}
      </p>
      &#8226
      <p>{{ props.blog.comment_counts }} comments</p>
     </div>
    </div>
  </NuxtLink>
</template>

