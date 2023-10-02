<script setup lang="ts">
useHead({
    title: 'My Blog | New Post'
})

definePageMeta({
  middleware: "author",
  layout: 'author-layout'
});
</script>
<template>
    <AuthorNewPost />
</template>