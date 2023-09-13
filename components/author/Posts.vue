<script setup lang="ts">
interface Props {
  blogs: GetBlog[] | undefined | [];
}
const props = defineProps<Props>();

const { blogs } = toRefs(props);

const handlePublishStatusChange = (postid: string) => {
  const index = blogs.value?.findIndex((blog) => blog.id === postid);

  if (index !== -1 && index !== undefined) {
    blogs.value
      ? (blogs.value[index].is_published = !blogs.value[index].is_published)
      : null;
  }
};
</script>
<template>
  <h2 class="font-rubik font-bold text-3xl my-10 text-center">POSTS</h2>
  <section
    class="grid-cols-1 mx-4 gap-4 justify-items-center relative sm:grid-cols-2 sm:mx-5 lg:grid-cols-3 lg:mx-10"
  >
    <AuthorPostItem
      v-for="blog in blogs"
      :key="blog.id"
      :blog="blog"
      @updatePublishStatus="(id) => handlePublishStatusChange(id)"
    />
   
  </section>
</template>
