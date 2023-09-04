<script setup lang="ts">
import { formatDate } from "../utils/formatDate";

interface Props {
  blog: GetBlog;
  isLoading: boolean;
}
const props = defineProps<Props>();

</script>

<template>
  <NuxtLink :to="`/blog/${props.blog.id}`">
    <div class="group" v-if="!props.isLoading">
      <img
        :src="props.blog.image_url"
        class="min-h-[250px] max-h-[250px] object-cover brightness-90 group-hover:brightness-100 transition-all rounded-sm"
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
