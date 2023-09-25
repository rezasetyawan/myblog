<script setup lang="ts">
import { showErrorToast } from "../../utils/toast"
interface Props {
    image: ImageData
}

const client = useSupabaseClient()
const props = defineProps<Props>()
const emit = defineEmits(['deleteimage'])
const showDeleteModal = ref<boolean>(false)

const copyToClipboard = () => {
    try {
        const copyText: HTMLInputElement = document.getElementById(props.image.id + '_url') as HTMLInputElement
        if (copyText) {
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(copyText.value);
        }
    } catch (error) {
        showErrorToast('failed to copy url')
    }
}

const deleteImageHandler = async () => {
    try {
        await deleteImage(client, props.image.name)
        emit('deleteimage', props.image.id)
    } catch (error: any) {
        showErrorToast(error.message)
    }
}

</script>
<template>
    <div class="shadow-md rounded-lg p-2 my-2 w-full">
        <NuxtImg :src="props.image.url"
            class="object-cover brightness-90 group-hover:brightness-100 transition-all w-full rounded-sm aspect-[4/2]"
            loading="lazy" quality="50" :alt="props.image.name" placeholder />

        <div class="flex justify-between items-center">
            <h3 class="text-left font-medium text-lg py-1 font-rubik">
                <Icon name="material-symbols:post-outline-rounded" size="20" /> {{ props.image.post || '-' }}
            </h3>
            <button @click="() => showDeleteModal = true">
                <Icon name="mdi:trash" class="h-6 w-6" />
            </button>
        </div>
        <div class="flex flex-col gap-1 items-start justify-center font-medium text-sm w-full ">
            <div class="flex gap-1">
                <Icon name="mdi:image-outline" size="20" class="block" />
                <div class="">
                    <p>
                        {{ truncateString(image.name, 40) }}.{{ image.metadata.mimetype.split('/')[1] }}
                    </p>
                    <p>{{ (props.image.metadata.size
                        /
                        1024).toFixed(2) }}KB</p>
                </div>
            </div>
            <p>
                <Icon name="mdi:date-range" size="20" />
                {{
                    new Date(props.image.created_at).toLocaleString(undefined, {
                        hour12: false,
                    })
                }}
            </p>

            <label class="group relative">
                <Icon name="ph:link-bold" size="20" />
                <input :value="image.url" readonly class="p-1 max-w-[80%] sm:max-w-full focus:outline-none"
                    :id="image.id + '_url'">
                <button @click="copyToClipboard">
                    <Icon name="fluent:copy-32-regular" size="20" rotate="90" />
                    <span class="tooltip">copy to clipboard</span>
                </button>
            </label>

        </div>
    </div>
    <ConfirmationModal :showConfirmationModal="showDeleteModal" :actionFunction="deleteImageHandler" :type="'negative'"
        @closeModal="() => showDeleteModal = false">Are you want to delete {{ props.image.name }}.{{
            image.metadata.mimetype.split('/')[1] }}
    </ConfirmationModal>
</template>
<style scoped>
.tooltip {
    @apply hidden bg-gray-200 group-hover:inline group-hover:absolute right-0 top-8 z-20 px-[0.8em] py-[0.4em] rounded-sm whitespace-nowrap text-black
}

.title-info {
    @apply font-semibold
}
</style>