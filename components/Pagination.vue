<script setup lang="ts">
const route = useRoute();
const props = defineProps({ page: Number, totalPage: Number });
const { page = 1, totalPage = 1 } = toRefs(props);
</script>
<template>
  <div class="flex font-rubik items-center justify-center gap-5 my-10 text-sm sm:text-base">
    <NuxtLink
      class="px-[0.8em] py-[0.4em] bg-slate-300 rounded-md"
      :to="{
        query: {
          ...route.query,
          page: page > 1 ? page - 1 : 1,
        },
      }"
      :disabled="page === 1"
      :class="{ 'bg-slate-500': page === 1 }"
    >
      Prev
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
      class="px-[0.8em] py-[0.4em] bg-slate-300 rounded-md"
      :to="{
        query: {
          ...route.query,
          page: page === totalPage ? page : page + 1,
        },
      }"
      :disabled="page === totalPage"
      :class="{ 'bg-slate-500': page === totalPage }"
    >
      Next
    </NuxtLink>
  </div>
</template>
<style scoped>
.active_link {
  border: 1px solid #991b1b;
}
</style>
