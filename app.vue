<script setup lang="ts">
const layout: string = "my-layout";
useServerSeoMeta({
  title: "MyBlog",
  ogTitle: "MyBlog",
  description: "Personal Website that talk about technology, daily life",
});
</script>
<template>
  <NuxtLayout :name="layout">
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
