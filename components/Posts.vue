<script setup lang="ts">
interface Props {
  blogs: GetBlog[] | undefined | [];
  isLoading: boolean;
}
const props = defineProps<Props>();
</script>
<template>
  <h2 class="font-rubik font-bold text-3xl my-10 text-center">BLOG</h2>
  <section
    class="grid grid-cols-1 mx-4 gap-4 justify-items-center relative sm:grid-cols-2 sm:mx-5 xl:grid-cols-3 lg:mx-20"
  >
    <!-- <PostItem
      v-for="blog in props.blogs"
      :key="blog.id"
      :blog="blog"
      :isLoading="props.isLoading"
    /> -->
    <template v-for="blog in props.blogs" :key="blog.id">
      <PostItem v-if="blog && !props.isLoading" :blog="blog" :isLoading="props.isLoading" />
    </template>
  </section>
  <section
    v-if="props.isLoading"
    class="grid grid-cols-1 mx-4 gap-4 justify-items-center relative sm:grid-cols-2 sm:mx-5 xl:grid-cols-3 lg:mx-20"
  >
    <PostItemSkeleton :counts="3" />
  </section>
</template>
