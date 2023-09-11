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
      class="mt-20 transition-all duration-200 relative"
      :style="{
        left: sidebarWidth && sidebar ? `${sidebarWidth}px` : '0',
        width:
          sidebarWidth && sidebar ? `calc(100% - ${sidebarWidth}px)` : '100%',
      }"
    >
      <slot />
    </div>
  </div>
</template>
