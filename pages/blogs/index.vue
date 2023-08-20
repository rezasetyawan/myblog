<script setup lang="ts">
import { getBlogs } from "../../composables/useBlogs";

const blogs = ref();
const isLoading = ref<boolean>(false);

onMounted(async () => {
  isLoading.value = true;
  try {
    blogs.value = await getBlogs();
    isLoading.value = false;
  } catch (error) {
    console.error(error);
  }
});
</script>
<template>
  <Posts :blogs="blogs" />
  <div v-if="isLoading" class="text-center">Loading...</div>
</template>
