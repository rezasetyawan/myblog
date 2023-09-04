<script setup lang="ts">
import PostItemSkeleton from "./PostItemSkeleton.vue";

interface Props {
  blogs: GetBlog[] | undefined | [];
  isLoading: boolean;
}
const props = defineProps<Props>();
</script>
<template>
  <h2 class="font-rubik font-bold text-3xl my-10 text-center">BLOG</h2>
  <section class="grid grid-cols-1 mx-4 gap-4 justify-items-center relative sm:grid-cols-2 sm:mx-5 lg:grid-cols-3 lg:mx-20">
    <PostItem
      v-for="blog in props.blogs"
      :key="blog.id"
      :blog="blog"
      :isLoading="props.isLoading"
    />
    <PostItem
      v-for="blog in props.blogs"
      :key="blog.id"
      :blog="blog"
      :isLoading="props.isLoading"
    />
    <PostItem
      v-for="blog in props.blogs"
      :key="blog.id"
      :blog="blog"
      :isLoading="props.isLoading"
    />
    <PostItem
      v-for="blog in props.blogs"
      :key="blog.id"
      :blog="blog"
      :isLoading="props.isLoading"
    />
    <PostItem
      v-for="blog in props.blogs"
      :key="blog.id"
      :blog="blog"
      :isLoading="props.isLoading"
    />
    <PostItem
      v-for="blog in props.blogs"
      :key="blog.id"
      :blog="blog"
      :isLoading="props.isLoading"
    />
    <PostItem
      v-for="blog in props.blogs"
      :key="blog.id"
      :blog="blog"
      :isLoading="props.isLoading"
    />
    <PostItem
      v-for="blog in props.blogs"
      :key="blog.id"
      :blog="blog"
      :isLoading="props.isLoading"
    />
    <PostItem
      v-for="blog in props.blogs"
      :key="blog.id"
      :blog="blog"
      :isLoading="props.isLoading"
    />
    <PostItem
      v-for="blog in props.blogs"
      :key="blog.id"
      :blog="blog"
      :isLoading="props.isLoading"
    />
    <PostItem
      v-for="blog in props.blogs"
      :key="blog.id"
      :blog="blog"
      :isLoading="props.isLoading"
    />
    <PostItem
      v-for="blog in props.blogs"
      :key="blog.id"
      :blog="blog"
      :isLoading="props.isLoading"
    />
    <PostItemSkeleton v-if="isLoading" />
  </section>
</template>
