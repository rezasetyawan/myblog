<script setup lang="ts">
const props = defineProps(["blogs"]);
</script>
<template>
  <h2 class="font-rubik font-bold text-3xl my-10 text-center">BLOG</h2>
 <section class="grid grid-cols-3 mx-28 gap-4">
    <div v-for="blog in props.blogs">
    <PostItem :blog="blog" />
  </div>
 </section>
</template>
