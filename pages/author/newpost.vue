<script setup lang="ts">
useHead({
  title: "New Post | My Blog ",
});

definePageMeta({
  middleware: "author",
  layout: "author-layout",
});
</script>
<template>
  <AuthorNewPost />
</template>
