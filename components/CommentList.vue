<script setup lang="ts">
interface Props {
  comments: GetComment[];
  replyStates: object | any;
}
const props = defineProps<Props>();
const emit = defineEmits(["commentAdded"]);
const postId = ref<string>("");
postId.value = useRoute().params.id as string;

const prevVisibleReplyForm = ref<string>("");

const toggleReplyForm = (commentId: string) => {
  if (props.replyStates[commentId] === true) {
    props.replyStates[commentId] = false;
    prevVisibleReplyForm.value = "";
  } else {
    Object.keys(props.replyStates).forEach((id) => {
      props.replyStates[id] = false;
    });
    props.replyStates[commentId] = true;
    prevVisibleReplyForm.value = commentId;
  }
};
</script>

<template>
  <div>
    <div
      v-for="(comment, index) in props.comments"
      :key="comment.id"
      :class="{ 'ml-4 sm:ml-8': comment.parent_id !== null }"
    >
      <div class="flex items-center justify-between gap-8 border-t-[1px] border-slate-200 py-3 font-rubik text-sm sm:text-base">
        <!-- <img
        :src="comment.public_users.avatar_url"
        :alt="comment.public_users.name + ' avatar'"
        class="rounded-[50%]"
      />  -->
        <div class="w-full">
          <div class="flex justify-between items-center">
            <p class="font-medium">{{ comment.public_users.name }}</p>
            <div class="flex items-center gap-3">
              <p class="font-base text-sm">{{ formatDate(comment.time) }}</p>
              <button @click="toggleReplyForm(comment.id)">reply</button>
            </div>
          </div>
          <p class="my-3">{{ comment.text }}</p>
        </div>
      </div>
      <CommentForm
        v-show="!!props.replyStates[comment.id]"
        class="my-1"
        :parent_id="comment.id"
        @commentAdded="() => emit('commentAdded')"
        :title="`Reply ${comment.public_users.name}`"
        :postId="postId"
      />
      <CommentList
        :comments="comment.replies"
        :replyStates="props.replyStates"
        @commentAdded="() => emit('commentAdded')"
      />
    </div>
  </div>
</template>
