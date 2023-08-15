<script setup lang="ts">
const showNavbar = ref(false);
</script>
<template>
  <div>
    <TheNavbar
      :showNavbar="showNavbar"
      @toggleNavbar="showNavbar = !showNavbar"
    ></TheNavbar>
    <slot />
  </div>
</template>
