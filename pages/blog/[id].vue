<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from "vue";
import { getBlogById } from "../../composables/useBlogs";
import { useRoute } from "vue-router";

const blog = ref();
const blogId = ref<string>("");
const route = useRoute();
blogId.value = route.params.id as string;

onBeforeMount(async () => {
  try {
    blog.value = await getBlogById(blogId.value);
    console.log(blog.value);
  } catch (error) {
    console.error(error);
  }
});

onMounted(() => {});
</script>

<template>
  <section v-if="blog" class="py-10 px-28">
    <h2 class="text-3xl font-semibold text-center">{{ blog.title }}</h2>
    <div class="flex justify-center py-4">
      <img :src="blog.image_url" class="max-w-lg">
    </div>
    <div v-html="blog.text"></div>
  </section>
</template>
