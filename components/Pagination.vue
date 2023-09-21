<script setup lang="ts">
const route = useRoute();
const props = defineProps({ page: Number, totalPage: Number });
const { page = 1, totalPage = 1 } = toRefs(props);
</script>
<template>
  <div
    class="flex font-rubik items-center justify-center gap-3 my-10 text-sm sm:text-base sm:gap-5"
  >
    <button :disabled="page === 1">
      <NuxtLink
        class="px-[0.8em] py-[0.4em] bg-[#cbd5e1] rounded-md text-black"
        :to="{
          query: {
            ...route.query,
            page: page > 1 ? page - 1 : 1,
          },
        }"
        :class="{ 'disable': page === 1 }"
      >
        Prev
      </NuxtLink>
    </button>
    <NuxtLink
      v-if="page - 1 > 3"
      class="px-[0.8em] py-[0.4em] bg-slate-200 rounded-md w-10 text-center"
      :to="{ query: { ...route.query, page: 1 } }"
      :class="{ active_link: page === 1 }"
    >
      1
    </NuxtLink>
    <template v-for="index in totalPage" :key="'index-' + index">
      <NuxtLink
        v-if="
          Math.abs(index - page) < 3 || index == totalPage as number - 1 || index == 0
        "
        class="px-[0.8em] py-[0.4em] bg-slate-200 rounded-md w-10 text-center"
        :to="{ query: { ...route.query, page: index } }"
        :class="{ active_link: page === index }"
      >
        {{ index }}
      </NuxtLink>
    </template>

    <NuxtLink
      v-if="totalPage - page > 3"
      class="px-[0.8em] py-[0.4em] bg-slate-200 rounded-md w-10 text-center"
      :to="{ query: { ...route.query, page: totalPage } }"
      :class="{ active_link: page === totalPage }"
    >
      1
    </NuxtLink>
    <button :disabled="page === totalPage">
      <NuxtLink
        class="px-[0.8em] py-[0.4em] bg-[#cbd5e1] rounded-md text-black"
        :to="{
          query: {
            ...route.query,
            page: page === totalPage ? page : page + 1,
          },
        }"
        :class="{ 'disable': page === totalPage }"
      >
        Next
      </NuxtLink>
    </button>
  </div>
</template>
<style scoped>
.active_link {
  border: 1px solid #991b1b;
}

.disable {
  background-color: #991b1b;
}

/* .disable {
  background-color: #b91c1c;
} */
</style>
