<script setup lang="ts">
interface Props {
    counts: number
}

const props = defineProps<Props>()
</script>
<template>
    <div v-for="index in props.counts" :key="index" class="border-[1px] slate-500 p-4 rounded-md w-full">
        <div class="rounded-md animate-pulse w-full">
            <div class="w-full bg-gray-300 aspect-[4/2] rounded-md"></div>
            <div class="flex items-start w-full mt-1">
                <div class="w-full">
                    <div class="flex w-full">
                        <div class="my-1 w-4 h-4 bg-gray-300 text-left rounded-md mr-3"></div>
                        <div class="my-1 w-[60%] h-4 bg-gray-300 text-left rounded-sm"></div>
                    </div>
                    <div class="flex items-start gap-3 w-full">
                        <div class="my-1 w-4 h-4 bg-gray-300 text-left rounded-md"></div>
                        <div class="w-full">
                            <div class="my-2 w-[60%] h-4 bg-gray-300 text-left rounded-sm"></div>
                            <div class="my-2 w-[60%] h-4 bg-gray-300 text-left rounded-sm"></div>
                        </div>
                    </div>
                </div>
                <div class="my-1 w-4 h-4 bg-gray-300 text-left rounded-md mr-3"></div>
            </div>
        </div>
    </div>
</template>