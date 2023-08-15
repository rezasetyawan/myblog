<script setup lang="ts">
import { formatDate } from "../utils/formatDate";

const { blog } = defineProps(["blog"]);
</script>

<template>
  <NuxtLink :to="`/blog/${blog.id}`">
    <div>
      <img
        :src="blog.image_url"
        class="min-h-[250px] max-h-[250px] object-cover"
      />
      <h2 class="text-center font-semibold text-xl py-3">{{ blog.title }}</h2>
      <p class="text-sm font-semibold text-center">
        {{ formatDate(blog.created_at) }}
      </p>
    </div>
  </NuxtLink>
</template>
