<script setup lang="ts">
import { formatDate } from "../utils/formatDate";

const { blog } = defineProps(["blog"]);
</script>

<template>
  <NuxtLink :to="`/blog/${blog.id}`">
    <div class="group">
      <img
        :src="blog.image_url"
        class="min-h-[250px] max-h-[250px] object-cover brightness-90 group-hover:brightness-100 transition-all rounded-sm"
      />
      <h3 class="text-center font-medium text-xl py-3 font-rubik">{{ blog.title }}</h3>
     <div class="flex gap-3 items-center justify-center font-medium text-sm text-slate-700">
      <p>
        {{ formatDate(blog.created_at) }}
      </p>
      &#8226
      <p>{{ blog.comment_counts }} comments</p>
     </div>
    </div>
  </NuxtLink>
</template>
