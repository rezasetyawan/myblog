<script setup lang="ts">
const layout:string = "my-layout"
useServerSeoMeta({
  title: "My Blog",
  ogTitle: "My Blog",
  description: "Blog Website that talk about technology and daily life",
  ogDescription: "Blog Website that talk about technology and daily life"
})
useHead({
  title: "My Blog",
  titleTemplate: "My Blogs",
  meta: [
    {
      name: "description",
      content: "Blog Website that talk about technology and daily life",
    },
  ],
});
</script>
<template>
  <NuxtLayout :name="layout">
    <SeoKit />
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
