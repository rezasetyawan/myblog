<script setup lang="ts">
import { ref } from "vue";

const isVisible = ref<boolean>(false);

const toggleVisible = () => {
  const scrolled = document.documentElement.scrollTop;
  if (scrolled > 300) {
    isVisible.value = true;
  } else {
    isVisible.value = false;
  }
};

const scrollToTop = () => {
  if (window) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

onMounted(() => {
  if (window) {
    window.addEventListener("scroll", toggleVisible);
  }
});
</script>

<template>
  <button
    @click="scrollToTop"
    class="fixed bottom-5 right-5 opacity-0 transition-all duration-700 z-[200] p-4"
    :class="{ 'opacity-100': isVisible }"
  >
    <span
      class="fixed bottom-5 right-5 w-10 h-10 bg-red-800 flex justify-center items-center rounded-full rotate-0 transition-transform duration-200 hover:rotate-0 sm:w-14 sm:h-14"
    >
      <Icon name="bytesize:chevron-top" color="white" class="w-4 h-4 sm:w-6 sm:h-6" />
    </span>
  </button>
</template>
