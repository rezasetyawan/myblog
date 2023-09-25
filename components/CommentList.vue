<script setup lang="ts">
interface Props {
  comments: GetComment[];
  replyStates: object | any;
  postId: string
}
const props = defineProps<Props>();
const emit = defineEmits(["commentAdded"]);

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
    <div v-for="comment in props.comments" :key="comment.id" :class="{ 'ml-4 sm:ml-8': comment.parent_id !== null }">
      <div
        class="flex items-center justify-between gap-8 border-t-[1px] border-slate-200 py-3 font-rubik text-sm sm:text-base">
        <div class="w-full">
          <div class="flex justify-between items-center">
            <p class="font-medium"> {{ comment.public_users.name }} <span class="text-red-800">{{
              comment.public_users.user_role === 'admin' ?
              '&#8226 Author' : null }}</span></p>
            <div class="flex items-center gap-3">
              <p class="font-base text-sm">{{ formatDate(comment.time) }}</p>
              <button @click="toggleReplyForm(comment.id)">reply</button>
            </div>
          </div>
          <p class="my-3">{{ comment.text }}</p>
        </div>
      </div>
      <CommentForm v-show="!!props.replyStates[comment.id]" class="my-1" :parent_id="comment.id"
        @commentAdded="() => emit('commentAdded')" :title="`Reply ${comment.public_users.name}`" :postId="props.postId" />
      <CommentList :comments="comment.replies" :replyStates="props.replyStates" @commentAdded="() => emit('commentAdded')"
        :postId="props.postId" />
    </div>
  </div>
</template>
