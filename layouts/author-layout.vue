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
</script>

<template>
  <AuthorTheNavbar @toggleSidebar="sidebar = !sidebar" />
  <div class="font-rubik">
    <AuthorSidebar :sidebar="sidebar" id="sidebar" />
    <div
      id="content"
      class="mt-20 transition-all duration-200 relative p-3 sm:p-0"
      :style="{
        left: sidebarWidth && sidebar ? `${sidebarWidth}px` : '0',
        '--my-css-variable': sidebarWidth && sidebar ? sidebarWidth + 'px' : 0,
      }"
      :class="{ 'tablet-and-above': sidebarWidth && sidebar }"
    >
      <slot />
    </div>
  </div>
  <ScrollToTopBtn />
</template>

<style scoped>
* {
  overflow-x: hidden;
}
.tablet-and-above {
  width: 100%;
}

@media (min-width: 640px) {
  .tablet-and-above {
    width: calc(100% - var(--my-css-variable));
  }
}
</style>
