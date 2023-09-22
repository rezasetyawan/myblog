<script setup lang="ts">
interface Props {
  counts: number;
}
const props = defineProps<Props>();
</script>
<template>
    <div
      v-for="index in props.counts"
      :key="index"
      class="border-[1px] slate-500 p-4 rounded-md w-full"
    >
      <div class="rounded-md animate-pulse">
        <div
          class="w-full bg-gray-300 aspect-[4/2] rounded-md"
        ></div>
        <div class="my-3 w-60 h-5 bg-gray-300 mx-auto rounded-md"></div>
        <div class="flex gap-3 justify-center items-center">
          <div class="bg-gray-300 w-20 h-5 rounded-md"></div>
          <div class="bg-gray-300 w-20 h-5 rounded-md"></div>
        </div>
      </div>
    </div>
</template>
