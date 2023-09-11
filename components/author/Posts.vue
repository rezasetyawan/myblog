<script setup lang="ts">
interface Props {
  blogs: GetBlog[] | undefined | [];
}
const props = defineProps<Props>();
</script>
<template>
  <h2 class="font-rubik font-bold text-3xl my-10 text-center">POSTS</h2>
  <section class=" grid-cols-1 mx-4 gap-4 justify-items-center relative sm:grid-cols-2 sm:mx-5 lg:grid-cols-3 lg:mx-10">
    <AuthorPostItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
    <AuthorPostItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
    <AuthorPostItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
    <AuthorPostItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
    <AuthorPostItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
    <AuthorPostItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
    <AuthorPostItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
    <AuthorPostItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
    <AuthorPostItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
    <AuthorPostItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
    <AuthorPostItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
    <AuthorPostItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
    <AuthorPostItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
    <AuthorPostItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
    <AuthorPostItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
    <AuthorPostItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
    <AuthorPostItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
    <AuthorPostItem v-for="blog in props.blogs" :key="blog.id" :blog="blog" />
  </section>
</template>
