<script setup lang="ts">
interface Props {
  showConfirmationModal: boolean;
  type?: string;
  message?: string
}

const props = defineProps<Props>();

const emit = defineEmits(["cancel", "confirm"]);

const confirmHandler = () => {
  emit("confirm");
};
const cancelHandler = () => {
  emit("cancel");
};
</script>
<template>
  <section v-if="props.showConfirmationModal">
    <div
      tabindex="-1"
      class="fixed top-0 left-0 right-0 z-[3000] w-full overflow-hidden h-screen p-5 bg-black/80 flex items-center font-poppins"
      @click="cancelHandler"
    >
      <div
        class="relative w-full max-w-sm max-h-full mx-auto z-[3001]"
        :class="{
          open: props.showConfirmationModal,
          close: !props.showConfirmationModal,
        }"
      >
        <div class="relative bg-white rounded-lg shadow">
          <button
            type="button"
            class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            @click="cancelHandler"
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
          <div class="p-6 text-center">
            <svg
              aria-hidden="true"
              class="mx-auto my-4 text-[#656161] w-14 h-14 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                fill=""
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <strong class="mb-5 text-base font-sans block font-semibold">
            {{ props.message ? props.message : 'Are you sure?' }}
            </strong>
            <button
              type="button"
              class="text-white font-sans focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-3 py-2.5 text-center mr-2 positive"
              :class="{ negative: props.type === 'negative' }"
              @click="confirmHandler"
            >
              Yes, I&apos;m sure
            </button>
            <button
              type="button"
              class="text-gray-500 font-sans bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-3 py-2.5 hover:text-gray-900 focus:z-10"
              @click="cancelHandler"
            >
              No, cancel
            </button>
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
