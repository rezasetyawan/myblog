<script setup lang="ts">
const showNavbar = ref(false);
</script>
<template>
  <div class="font-rubik">
    <TheNavbar
      :showNavbar="showNavbar"
      @toggleNavbar="showNavbar = !showNavbar"
    ></TheNavbar>
    <!-- <ScrollToTopBtn/> -->
    <div class="relative">
      <slot /> 
    </div>
  </div>
</template>
