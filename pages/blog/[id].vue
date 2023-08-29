<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from "vue";
import { getBlogById } from "../../composables/useBlogs";
import { getComments } from "../../composables/useComments";
import { useRoute } from "vue-router";

const blog = ref();
const commentData = ref();
const postId = ref<string>("");
const route = useRoute();

const isLoading = ref<boolean>(false);

onBeforeMount(() => {
  postId.value = route.params.id as string;
});

onMounted(async () => {
  isLoading.value = true;
  try {
    // const blogSnapshot = await getBlogById(postId.value);
    // console.log(blogSnapshot);
    // const commentSnapshots = await getComments(postId.value);
    // blog.value = blogSnapshot;
    // commentData.value = commentSnapshots;
    // isLoading.value = false;
    // console.log(postId.value);
    // console.log(commentSnapshots)

    const {data: cacheBlog} = useNuxtData(postId.value)
    console.log(postId.value)
    const {data: cacheComments} = useNuxtData(`comments-${postId.value}`)
  

    if (cacheBlog.value && cacheComments.value) {
      blog.value = cacheBlog.value.data
      commentData.value = cacheComments.value
    } else {
      blog.value =  await getBlogById(postId.value);
      commentData.value = await getComments(postId.value);
    }
   
  } catch (error) {
    console.error(error);
  } 
});
</script>

<template>
  <PostDetail :blog="blog" :commentData="commentData" v-if="blog && commentData" />
  <div v-if="isLoading" class="text-center">Loading...</div>
</template>
