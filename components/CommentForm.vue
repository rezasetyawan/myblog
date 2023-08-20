<script setup lang="ts">
const { title } = defineProps(["title"]);
import { addComment } from "../composables/useComments";
const blogId = ref();
blogId.value = useRoute().params.id as string;
const emit = defineEmits(["commentAdd"])

const commentDraft = ref({
  name: "",
  email: "",
  text: "",
  blogId: blogId.value,
});

const onSubmitHandler = async () => {
  await addComment(commentDraft.value);
  emit("commentAdd")
};


</script>
<template>
  <form class="font-rubik" @submit.prevent="onSubmitHandler">
    <h2>{{ title ? title : "Leave a comment" }}</h2>
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
    <button
      type="submit"
      class="text-base leading-tight font-bold text-white bg-red-800 px-3 py-1.5 my-2 float-right"
    >
      POST COMMENT
    </button>
  </form>
</template>
