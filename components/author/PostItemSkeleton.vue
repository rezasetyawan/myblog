<script setup lang="ts">
interface Props {
    counts: number;
}
const props = defineProps<Props>();
</script>
<template>
    <div v-for="index in props.counts" :key="index" class="border-[1px] slate-500 p-4 rounded-md w-full">
        <div class="rounded-md animate-pulse">
            <div class="w-full bg-gray-300 aspect-[4/2] rounded-md"></div>
            <div class="flex items-start">
                <div>
                    <div>
                        <p class="my-3 w-60 h-5 bg-gray-300 text-left rounded-md"></p>
                    </div>
                    <div class="flex justify-between w-full">
                        <div class="flex gap-3 items-center w-full">
                            <div class="bg-gray-300 w-[30%] h-5 rounded-md"></div>
                            <div class="bg-gray-300 w-[50%] h-5 rounded-md"></div>
                            <div class="bg-gray-300 w-[12%] h-5 rounded-md"></div>

                        </div>

                    </div>
                </div>
                <div class="items-center justify-end gap-1 w-full my-3 hidden sm:flex" >
                    <div class="bg-gray-300 w-[12%] h-5 rounded-md"></div>
                    <div class="bg-gray-300 w-[12%] h-5 rounded-md"></div>
                    <div class="bg-gray-300 w-[12%] h-5 rounded-md"></div>
                </div>
                <div class="flex flex-col items-end justify-center gap-1 w-full my-3 sm:hidden" >
                    <div class="bg-gray-300 w-[3px] h-[3px] rounded-full"></div>
                    <div class="bg-gray-300 w-[3px] h-[3px] rounded-full"></div>
                    <div class="bg-gray-300 w-[3px] h-[3px] rounded-full"></div>
                </div>
            </div>
        </div>
    </div>
</template>
