<script setup lang="ts">
const props = defineProps(["blogs"]);
</script>
<template>
  <h2 class="font-rubik font-bold text-3xl my-10 text-center">BLOG</h2>
  <section class="grid grid-cols-3 mx-28 gap-4">
    <PostItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
  </section>
</template>
