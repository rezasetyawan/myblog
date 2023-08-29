<script setup lang="ts">
const props = defineProps(["showNavbar"]);
const emit = defineEmits(["toggleNavbar"]);

const toggleNavbar = () => emit("toggleNavbar");
</script>
<template>
  <header
    class="grid grid-cols-3 gap-2.5 items-center sticky top-0 shadow z-[99] bg-[#ffffff] px-5 py-2 md:px-10 md:py-3 font-rubik"
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
        class="gap-8 min-[499px]:justify-end min-[499px]:static min-[499px]:w-full min-[499px]:flex-row min-[499px]:text-sm min-[499px]:flex min-[499px]:py-0 min-[499px]:shadow-none md:text-base"
        :class="{
          'absolute flex flex-col w-[50%] translate-y-8 right-0 items-center list-none text-sm max-[499px]:bg-slate-50 rounded-sm py-8 shadow transition-all':
            props.showNavbar,
          hidden: !props.showNavbar,
        }"
      >
        <li class="inline-block text-center text-red-800 font-bold">
          <NuxtLink
            :to="'/'"
            class="px-3 py-2 hover:text-red-800 hover:bg-slate-100 "
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
        class="p-2 text-red-800 rounded-md outline-none focus:border-gray-400 flex items-center justify-center"
        :class="{ 'bg-red-800': props.showNavbar }"
        @click="toggleNavbar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          view-box="0 0 24 24"
          fill="currentColor"
          v-if="props.showNavbar"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-red-800"
          fill="none"
          view-box="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          v-if="!props.showNavbar"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  </header>
</template>
<style scoped>
@keyframes onblur {
  0% {
    border-bottom: 3px;
    border-color: #991b1b;
    border-width: 100%;
  }

  25% {
    border-width: 75%;
  }

  50% {
    border-width: 50%;
  }

  100% {
    border-width: 0%;
  }
}

@keyframes onhover {
  0% {
    border-bottom: 3px;
    border-color: #991b1b;
    border-width: 0%;
  }

  25% {
    border-width: 25%;
  }

  50% {
    border-width: 50%;
  }

  100% {
    border-width: 100%;
  }
}
</style>
