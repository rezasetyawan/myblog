<script setup lang="ts">
const props = defineProps(["comments"]);
console.log(props.comments);

const postId = ref();
postId.value = useRoute().params.id as string;

const comments = ref(props.comments);

const computedComments = ref(
  comments.value.comments.map((comment: object) => {
    return {
      ...comment,
      showReplyForm: false,
    };
  })
);

watch(
  comments,
  (newValue) => {
    console.log(newValue);
    computedComments.value = newValue.comments.map((comment: object) => {
      return {
        ...comment,
        showReplyForm: false,
      };
    });
  },
  { immediate: true, deep: true }
);
const prevVisibleReplyForm = ref(-1);

const toggleReplyForm = (index: number) => {
  if (prevVisibleReplyForm.value !== index) {
    computedComments.value[prevVisibleReplyForm.value] &&
      (computedComments.value[prevVisibleReplyForm.value].showReplyForm =
        false);
  }
  computedComments.value[index].showReplyForm =
    !computedComments.value[index].showReplyForm;
  prevVisibleReplyForm.value = index;
};

const fetchComment = async () => {
  const commentSnapshots = await getComments(postId.value);
  commentSnapshots ? (comments.value = commentSnapshots) : null;
  console.log(comments.value);
};
</script>
<template>
  <article v-if="computedComments" class="mx-20">
    <h3 class="my-6 font-medium">Comments</h3>
    <div
      v-for="(comment, index) in computedComments"
      :key="comment.id"
      class=""
    >
      <div class="flex items-center gap-8 border-t-[1px] border-slate-200 py-3">
        <!-- <img
        :src="comment.public_users.avatar_url"
        :alt="comment.public_users.name + ' avatar'"
        class="rounded-[50%]"
      /> -->

        <!-- {{ console.log(comment) }} -->
        <div class="w-full">
          <div class="flex justify-between items-center">
            <p class="font-medium">{{ comment.public_users.name }}</p>
            <div class="flex items-center gap-3">
              <p class="font-base text-sm">{{ formatDate(comment.time) }}</p>
              <button @click="toggleReplyForm(index)">reply</button>
            </div>
          </div>
          <p class="my-3">{{ comment.text }}</p>
        </div>
      </div>
      <CommentForm v-show="comment.showReplyForm" />
    </div>
    <CommentForm @commentAdd="fetchComment" />
  </article>
</template>
