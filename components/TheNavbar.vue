<script setup lang="ts">
const props = defineProps(["showNavbar"]);
const emit = defineEmits(["toggleNavbar"]);

const toggleNavbar = () => emit("toggleNavbar");
</script>
<template>
  <header
    class="grid grid-cols-3 gap-2.5 items-center sticky top-0 shadow z-[99] bg-[#ffffff] px-5 py-2 md:px-10 md:py-3 font-rubik transition-all"
  >
    <div class="">
      <NuxtLink to="/student/">
        <h1
          class="text-red-800 font-bold text-base min-[425px]:text-xl md:text-2xl border-b-[3px] border-red-900 max-w-fit"
        >
          MyBlog
        </h1>
      </NuxtLink>
    </div>
    <nav
      class="px-1.5 py-3 min-[499px]:w-full min-[499px]:justify-around min-[499px]:col-span-2"
    >
      <ul
        class="gap-8 min-[499px]:justify-end min-[499px]:static min-[499px]:w-full min-[499px]:flex-row min-[499px]:text-sm min-[499px]:flex min-[499px]:py-0 min-[499px]:shadow-none md:text-base hidden"
      >
        <li class="inline-block text-center text-red-800 font-bold">
          <NuxtLink :to="'/'" class="px-3 py-2 animated-border">
            Home
          </NuxtLink>
        </li>
        <li class="inline-block text-center text-red-800 font-bold">
          <NuxtLink :to="'/blogs'" class="px-3 py-2 animated-border">
            Blog
          </NuxtLink>
        </li>
        <li class="inline-block text-center text-red-800 font-bold">
          <NuxtLink :to="'/'" class="px-3 py-2 animated-border">
            About
          </NuxtLink>
        </li>
      </ul>
      <ul
        class="min-[499px]:hidden top-14 fixed z-[300] flex flex-col gap-8 w-[50%] translate-x-[300px] right-0 transition-all duration-200 items-center list-none text-sm max-[499px]:bg-slate-50 rounded-sm py-8 shadow"
        :class="{
          'translate-x-[0px] overflow-visible': props.showNavbar,
        }"
      >
        <li class="inline-block text-center text-red-800 font-bold">
          <NuxtLink
            :to="'/'"
            class="px-3 py-2 hover:text-red-800 hover:bg-slate-100"
          >
            Home
          </NuxtLink>
        </li>
        <li class="inline-block text-center text-red-800 font-bold">
          <NuxtLink
            :to="'/blogs'"
            class="px-3 py-2 hover:text-red-800 hover:bg-slate-100 hover:rounded-md focus:bg-slate-200 focus:rounded-md"
          >
            Blog
          </NuxtLink>
        </li>
        <li class="inline-block text-center text-red-800 font-bold">
          <NuxtLink
            :to="'/'"
            class="px-3 py-2 hover:text-red-800 hover:bg-slate-100 hover:rounded-md focus:bg-slate-200 focus:rounded-md"
          >
            About
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <div
      class="grid justify-items-end content-center self-center min-[499px]:hidden"
    >
      <button
        class="p-2 text-red-800 rounded-md outline-none focus:border-gray-400 flex items-center justify-center transition-colors"
        :class="{ 'bg-red-800': props.showNavbar }"
        @click="toggleNavbar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 15 15"
          v-if="props.showNavbar"
        >
          <path
            fill="white"
            d="M3.64 2.27L7.5 6.13l3.84-3.84A.92.92 0 0 1 12 2a1 1 0 0 1 1 1a.9.9 0 0 1-.27.66L8.84 7.5l3.89 3.89A.9.9 0 0 1 13 12a1 1 0 0 1-1 1a.92.92 0 0 1-.69-.27L7.5 8.87l-3.85 3.85A.92.92 0 0 1 3 13a1 1 0 0 1-1-1a.9.9 0 0 1 .27-.66L6.16 7.5L2.27 3.61A.9.9 0 0 1 2 3a1 1 0 0 1 1-1c.24.003.47.1.64.27Z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 15 15"
          v-else
        >
          <path
            fill="none"
            stroke="#991b1b"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"
          />
        </svg>
      </button>
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
