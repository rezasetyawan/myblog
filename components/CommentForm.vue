<script setup lang="ts">
const props = defineProps(["title", "parent_id", "postId"]);
import { addComment } from "../composables/useComments";
const postId = ref<string>("");
const emit = defineEmits(["commentAdded"]);

const commentDraft = ref<CommentDraf>({
  parent_id: props.parent_id ? props.parent_id : null,
  name: "",
  email: "",
  text: "",
  post_id: props.postId,
});

const resetCommentDraft = () => {
  commentDraft.value = {
    parent_id: props.parent_id ? props.parent_id : null,
    name: "",
    email: "",
    text: "",
    post_id: props.postId,
  };
};

const onSubmitHandler = async () => {
  console.log(props.postId)
  await addComment(commentDraft.value).then(() => {
    resetCommentDraft()
  })
  emit("commentAdded");
  // emit("commentAdded", commentDraft.value.parent_id || null); // Pass the new comment's parent_id if available
};
</script>
<template>
  <form class="font-rubik" @submit.prevent="onSubmitHandler">
    <h2>{{ props.title ? props.title : "Leave a comment" }}</h2>
    <textarea
      rows="5"
      class="w-full border-2 border-slate-700 p-2 text-sm"
      placeholder="Your comment here..."
      spellcheck="false"
      v-model="commentDraft.text"
    ></textarea>
    <div class="flex items-center gap-4">
      <input
        type="text"
        placeholder="Name(required)"
        required
        class="p-2 text-sm border-2 border-slate-700 w-full"
        v-model="commentDraft.name"
      />
      <input
        type="email"
        placeholder="Email(required)"
        required
        class="p-2 text-sm border-2 border-slate-700 w-full"
        v-model="commentDraft.email"
      />
    </div>
    <div class="flex justify-end">
      <button
        type="submit"
        class="text-base leading-tight font-bold text-white bg-red-800 px-3 py-1.5 my-2"
      >
        POST COMMENT
      </button>
    </div>
  </form>
</template>
