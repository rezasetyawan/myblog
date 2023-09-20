<script setup lang="ts">
import { addComment } from "../composables/useComments";

interface Props {
  title?: string;
  parent_id?: string;
  postId: string;
}

interface User {
  name: string;
  email: string;
}

const props = defineProps<Props>();
const emit = defineEmits(["commentAdded"]);

const isLocalStorageAvailable = () => {
  return typeof Storage !== undefined;
};

const getUserFromLocalStorage = (): User | null | undefined => {
  let user: string | null = JSON.stringify({ name: "", email: "" });
  if (isLocalStorageAvailable()) {
    user = localStorage.getItem("user");
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  } else {
    return null;
  }
};

const setUserInLocalStorage = (userData: User) => {
  if (isLocalStorageAvailable()) {
    localStorage.setItem("user", JSON.stringify(userData));
  }
};

const user = ref<User>({ name: "", email: "" });

const commentDraft = ref<CommentDraf>({
  parent_id: props.parent_id ? props.parent_id : null,
  name: user.value.name,
  email: user.value.email,
  text: "",
  post_id: props.postId,
});

const resetCommentDraft = () => {
  commentDraft.value = {
    parent_id: props.parent_id ? props.parent_id : null,
    name: user.value.name,
    email: user.value.email,
    text: "",
    post_id: props.postId,
  };
};

onMounted(() => {
  const userData = getUserFromLocalStorage();
  userData ? (user.value = userData) : null;
});

const onSubmitHandler = async () => {
  user.value && setUserInLocalStorage(user.value);
  await addComment(commentDraft.value).then(() => {
    resetCommentDraft();
  });
  emit("commentAdded");
};

watch(
  () => user,
  (newValue) => {
    commentDraft.value.name = newValue.value.name;
    commentDraft.value.email = newValue.value.email;
  },
  { immediate: true, deep: true }
);
</script>
<template>
  <form class="font-rubik w-full" @submit.prevent="onSubmitHandler">
    <h2>{{ props.title ? props.title : "Leave a comment" }}</h2>
    <textarea
      rows="7"
      class="w-full border-2 border-slate-700 p-2 text-sm"
      placeholder="Your comment here..."
      spellcheck="false"
      v-model="commentDraft.text"
    ></textarea>
    <div class="sm:flex items-center gap-4">
      <input
        type="text"
        placeholder="Name(required)"
        required
        minlength="3"
        class="p-2 text-sm border-2 border-slate-700 w-full"
        v-model="user.name"
      />
      <input
        type="email"
        placeholder="Email(required)"
        required
        class="p-2 text-sm border-2 border-slate-700 w-full mt-2 sm:mt-0"
        v-model="user.email"
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
