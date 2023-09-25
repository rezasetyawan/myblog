<script setup lang="ts">
interface Props {
  commentData: CommentSnapshots;
  postId: string;
}
const props = defineProps<Props>();

const commentData = ref<CommentSnapshots | undefined>(props.commentData);

const replyStates = ref({});

const refetchComments = async () => {
  const commentSnapshots = await getComments(props.postId);
  commentData.value = commentSnapshots;
  replyStates.value = {};
};

const hasActiveCommentForm = computed(() => {
  return Object.values(replyStates.value).some((state) => state === true);
});
</script>
<template>
  <article class="my-20 max-w-[75ch] mx-auto">
    <h3 class="my-6 font-medium">Comments</h3>
    <div class="">
      <CommentList
        :comments="commentData.comments"
        :replyStates="replyStates"
        @commentAdded="refetchComments()"
        :postId="props.postId"
      />
      <CommentForm
      v-show="!hasActiveCommentForm"
      class="my-5"
      @commentAdded="refetchComments()"
      :postId="props.postId"
    />
    </div>
    
  </article>
</template>
