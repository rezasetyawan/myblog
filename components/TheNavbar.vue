<script setup lang="ts">
const props = defineProps(["showNavbar"]);
const emit = defineEmits(["toggleNavbar"]);

const toggleNavbar = () => emit("toggleNavbar");
</script>
<template>
  <header
    class="grid grid-cols-3 gap-2.5 items-center sticky top-0 shadow z-[99] bg-white px-5 py-2 md:px-10 md:py-3 font-rubik transition-all"
  >
    <div class="">
      <NuxtLink to="/">
        <h1
          class="text-red-800 font-bold text-base min-[425px]:text-xl md:text-2xl border-b-[3px] border-red-900 max-w-fit"
        >
          MyBlog
        </h1>
      </NuxtLink>
    </div>
  </header>
</template>
<style scoped>
.animated-border {
  position: relative;
}

.animated-border::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 3px;
  background-color: #991b1b;
  transition: width 0.3s ease;
}
.animated-border:hover::before,
.animated-border:focus::before {
  width: 100%;
}

.animated-border:focus {
  outline: none;
}
</style>
