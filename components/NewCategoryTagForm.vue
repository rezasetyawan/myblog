<script setup lang="ts">
interface Props {
  title: string;
  showFormModal: boolean;
}

const props = defineProps<Props>();
const inputText = ref<string>("");

const emit = defineEmits(["closeModal", "create"]);

const closeModal = () => {
  emit("closeModal");
};

const onSubmitHandler = () => {
  emit("create", inputText.value);
};
</script>
<template>
  <section v-if="props.showFormModal">
    <div
      tabindex="-1"
      class="fixed top-0 left-0 right-0 z-[3000] w-full overflow-hidden h-screen p-5 bg-black/80 flex items-center font-poppins"
    >
      <div
        class="relative w-full max-w-sm max-h-full mx-auto z-[4000]"
        :class="{
          open: props.showFormModal,
          close: !props.showFormModal,
        }"
      >
        <div class="relative bg-white rounded-lg shadow">
          <button
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            @click="closeModal"
          >
            <svg
              class="w-5 h-5 text-[#656161]"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <div class="p-6">
            <h2 class="text-lg font-semibold">{{ props.title }}</h2>
            <form @submit.prevent="onSubmitHandler" class="mt-6">
              <input
                class="focus:outline-none border-2 p-1 w-full block rounded-md"
                placeholder="Type here"
                v-model="inputText"
                required
              />
              <button
                type="submit"
                class="text-base leading-tight font-bold text-white bg-red-800 px-3 py-1.5 my-2 rounded-md" 
              >
                create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.open {
  animation: fadeup 250ms;
}

.close {
  animation: fadedown 250ms;
}

.positive {
  @apply bg-green-600 hover:bg-green-800 focus:ring-green-300;
}

.negative {
  @apply bg-red-600 hover:bg-red-800 focus:ring-red-300;
}

@keyframes fadeup {
  from {
    opacity: 0;
    top: -5%;
  }

  to {
    opacity: 1;
    top: 0%;
  }
}

@keyframes fadedown {
  from {
    opacity: 1;
    top: 0%;
  }

  to {
    opacity: 0;
    top: -5%;
  }
}
</style>
