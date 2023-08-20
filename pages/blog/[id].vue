<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from "vue";
import { getBlogById } from "../../composables/useBlogs";
import { getComments } from "../../composables/useComments";
import { useRoute } from "vue-router";

const blog = ref();
const comments = ref();
const blogId = ref<string>("");
const route = useRoute();
blogId.value = route.params.id as string;
const isLoading = ref<boolean>(false);

onMounted(async () => {
  isLoading.value = true;
  try {
    blog.value = await getBlogById(blogId.value);
    const commentSnapshots = await getComments(blogId.value);
    comments.value = commentSnapshots
    isLoading.value = false;
    console.log(blog.value);
    console.log(comments.value);
  } catch (error) {
    console.error(error);
  }
});


</script>

<template>
  <PostDetail :blog="blog" :comments="comments" v-if="blog && comments"/>
  <div v-if="isLoading" class="text-center">Loading...</div>
</template>
