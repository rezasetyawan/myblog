<script setup lang="ts">
import { getBlogs } from "../../composables/useBlogs";


const blogs = ref();

onBeforeMount(async () => {
  try {
    blogs.value = await getBlogs();
  } catch (error) {
    console.error(error);
  }
});

onMounted(() => {
  console.log(blogs.value);
});
</script>
<template>
  <Posts :blogs="blogs"/>
</template>
