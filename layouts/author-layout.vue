<script setup lang="ts">
const sidebar = ref<boolean>(false);
let element: HTMLElement | null;
const contentWidth = ref<number | undefined>();

onMounted(() => {
  element = document.getElementById("sidebar");
  if (element) {
    contentWidth.value = element.offsetWidth;
  }
});
watch(sidebar, () => {
  console.log(contentWidth.value);
});
</script>
<template>
  <AuthorTheNavbar @toggleSidebar="sidebar = !sidebar" />
  <div class="font-rubik">
    <AuthorSidebar :sidebar="sidebar" id="sidebar" />
    <div
      id="content"
      class="mt-20 transition-all duration-200 relative"
      :style="{ left: contentWidth && sidebar ? `${contentWidth}px` : '0' }"
    >
      <slot />
    </div>
  </div>
</template>
