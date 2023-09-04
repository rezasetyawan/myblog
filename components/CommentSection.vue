<script setup lang="ts">
interface Props {
  commentData: CommentSnapshots;
}
const props = defineProps<Props>();
const postId = ref<string>("");
postId.value = useRoute().params.id as string;

const commentData = ref<CommentSnapshots | undefined>(props.commentData);

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
  <article>
    <h3 class="my-6 font-medium">Comments</h3>
    <div class="mx-3 sm:mx-6 lg:mx-20">
      <CommentList
        :comments="commentData.comments"
        :replyStates="replyStates"
        @commentAdded="refetchComments()"
      />
      <CommentForm
      v-show="!hasActiveCommentForm"
      class="my-5"
      @commentAdded="refetchComments()"
      :postId="postId"
    />
    </div>
    
  </article>
</template>
