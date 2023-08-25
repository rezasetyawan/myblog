<script setup lang="ts">
const props = defineProps(["commentData"]);

const postId = ref<string>("");
postId.value = useRoute().params.id as string;

const commentData = ref(props.commentData);

const replyStates = ref({});

const refetchComments = async () => {
  const commentSnapshots = await getComments(postId.value);
  commentData.value = commentSnapshots;
  replyStates.value = {};
};

const hasActiveCommentForm = computed(() => {
  return Object.values(replyStates.value).some((state) => state === true);
});
</script>
<template>
  <article class="mx-20">
    <h3 class="my-6 font-medium">Comments</h3>
    <CommentList
      :comments="commentData.comments"
      :replyStates="replyStates"
      :postId="postId"
      v-if="commentData.comments.length"
      @commentAdded="refetchComments()"
    />
    <CommentForm v-show="!hasActiveCommentForm" class="my-5" @commentAdded="refetchComments()" :postId="postId"/>
  </article>
</template>
