<script setup lang="ts">
const showNavbar = ref(false);
definePageMeta({
  middleware: 'is-admin'
})
</script>
<template>
  <div class="font-rubik min-h-[100vh] bg-white">
    <TheNavbar :showNavbar="showNavbar" @toggleNavbar="showNavbar = !showNavbar"></TheNavbar>
    <ScrollToTopBtn />
    <main class="relative p-0">
      <slot />
    </main>
  </div>
  <TheFooter />
</template>
