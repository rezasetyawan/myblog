<script setup lang="ts">
interface Props {
    images: ImageData[] | undefined
    isLoading: boolean
}

const props = defineProps<Props>()
const emit = defineEmits(['deleteimage'])

const deleteImageHandler = (imageid: string) => {
    emit('deleteimage', imageid)
}
</script>

<template>
    <section
        class="sm:grid grid-cols-1 mx-0 gap-4 justify-items-center relative my-5 sm:grid-cols-2 sm:mx-5 lg:grid-cols-3 lg:mx-10 overflow-hidden mb-20 max-sm:min-h-[2000px] transition-all"
        v-if="props.images">
        <template v-for="image in props.images" :key="image.id">
            <AuthorImageItem :image="image" @deleteimage="(id: string) => deleteImageHandler(id)" />
        </template>
    </section>
    <section
        class="grid grid-cols-1 mx-0 gap-4 justify-items-center relative my-5 sm:grid-cols-2 sm:mx-5 lg:grid-cols-3 lg:mx-10 overflow-hidden mb-20"
        v-if="
        props.isLoading">
       <AuthorImageItemSkeleton :counts="3"/>
    </section>
</template>

