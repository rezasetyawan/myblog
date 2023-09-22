<script setup lang="ts">
useHead({
    title: 'My Blog | New Post'
})

definePageMeta({
  middleware: 'author'
})
</script>
<template>
    <AuthorNewPost />
</template>