<script setup lang="ts">
const sidebar = ref<boolean>(false);
let element: HTMLElement | null;
const sidebarWidth = ref<number | undefined>();

onMounted(() => {
  element = document.getElementById("sidebar");
  if (element) {
    sidebarWidth.value = element.offsetWidth;
  }
});

definePageMeta({
  middleware: 'author'
})
</script>

<template>
  <AuthorTheNavbar @toggleSidebar="sidebar = !sidebar" />
  <div class="font-rubik bg-white">
    <AuthorSidebar :sidebar="sidebar" id="sidebar" />
    <main id="content" class="mt-20 transition-all duration-200 relative p-3 sm:p-0 bg-white" @click="() => sidebar = false">
      <slot />
    </main>
  </div>
  <ScrollToTopBtn />
</template>

<style scoped>
.tablet-and-above {
  width: 100%;
}
</style>
