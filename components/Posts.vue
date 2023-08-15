<script setup lang="ts">
const props = defineProps(["blogs"]);
</script>
<template>
 <section class="grid grid-cols-3 px-28 py-10 gap-4">
    <div v-for="blog in props.blogs">
    <PostItem :blog="blog" />
  </div>
 </section>
</template>
