<script setup lang="ts">
const showNavbar = ref(false);
definePageMeta({
  middleware: 'is-admin'
})
</script>
<template>
  <main class="font-rubik min-h-[100vh] bg-white">
    <TheNavbar :showNavbar="showNavbar" @toggleNavbar="showNavbar = !showNavbar"></TheNavbar>
    <ScrollToTopBtn />
    <div class="relative">
      <slot />
    </div>

  </main>
  <TheFooter />
</template>
