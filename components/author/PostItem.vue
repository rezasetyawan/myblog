<script setup lang="ts">
import { updateBlogById, deleteBlogByID } from '../../composables/useBlogs'
import { deleteImage } from '../../composables/usePostImage'
import { getFileNameFromUrl } from '../../utils/getFileName'
import { truncateString } from "../../utils/truncateText"
import { showErrorToast } from "../../utils/toast"

const client = useSupabaseClient()

interface Props {
  blog: GetBlog;
  isLoading?: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(["updatePublishStatus", "deletePost"])
const showMobileMenu = ref<boolean>(false)
const showDeleteModal = ref<boolean>(false)

const updatePostPublishStatus = async () => {
  try {
    await updateBlogById(client, props.blog.id, { is_published: !props.blog.is_published })
    emit('updatePublishStatus', props.blog.id)

  } catch (error: any) {
    showErrorToast(error.message)
  }
}


const deletePostHandler = async (postId: string) => {
  try {
    await deleteBlogByID(client, postId)

    const fileKey = getFileNameFromUrl(props.blog.image_url, 'post-images')
    await deleteImage(client, fileKey ? fileKey : '')
    emit('deletePost', props.blog.id)
  }
  catch (error: any) {
    showErrorToast(error.message)
  }
}
</script>
<template>
  <div class="rounded-lg p-2 my-2 shadow-md w-full">
    <NuxtImg :src="props.blog.image_url ? props.blog.image_url : ''"
      class="object-cover brightness-90 group-hover:brightness-100 transition-all w-full rounded-sm aspect-[4/2]"
      loading="lazy" quality="50" :alt="props.blog.title" placeholder />

    <div class="flex justify-between mt-1 items-start">
      <div>
        <NuxtLink :to="`/author/post/${props.blog.url_param}`">
          <h3 class="text-left font-medium py-1 font-rubik text-base sm:hidden sm:text-lg lg:text-xl">
            {{ truncateString(props.blog.title, 18) }}
          </h3>
          <h3 class="text-left font-medium py-1 font-rubik text-base hidden sm:block sm:text-lg lg:text-xl">
            {{ truncateString(props.blog.title, 20) }}
          </h3>
        </NuxtLink>

        <div class="flex gap-3 items-center justify-start font-medium text-xs sm:text-sm">
          <p v-if="props.blog.is_published">Published</p>
          <p v-else class=" text-orange-600">Draft</p>

          &#8226
          <p>
            {{ new Date(parseInt(props.blog.created_at)).toLocaleDateString('en-GB') }}
          </p>
          <div class="flex gap-3 items-center justify-center font-medium text-sm text-black">
            <p>
              {{ props.blog.comment_counts }}
              <Icon name="basil:chat-outline" size="24" />
            </p>
          </div>
        </div>
      </div>

      <div class="items-center justify-end gap-2 hidden sm:flex">
        <button v-if="props.blog.is_published" @click="updatePostPublishStatus" class="group relative">
          <Icon name="material-symbols:send-and-archive" class="h-6 w-6" />
          <span class="tooltip">unpublish</span>
        </button>

        <button v-else @click="updatePostPublishStatus" class="group relative">
          <Icon name="material-symbols:send" class="h-6 w-6" />
          <span class="tooltip">publish</span>
        </button>

        <NuxtLink :to="`/author/post/edit/${props.blog.url_param}`" class="group relative">
          <Icon name="material-symbols:edit" class="h-6 w-6" />
          <span class="tooltip">edit
            post</span>
        </NuxtLink>

        <button @click="() => showDeleteModal = true" class="group relative">
          <Icon name="mdi:trash" class="h-6 w-6" />
          <span class="tooltip">delete</span>
        </button>
      </div>

      <div class="relative sm:hidden  z-[2000]">
        <button @click="() => showMobileMenu = !showMobileMenu">
          <Icon name="pepicons-pencil:dots-y" size="24" />
        </button>
        <div class="absolute p-3 transition-all duration-200 top-8 bg-white right-0 shadow-md"
          :class="{ 'hidden': !showMobileMenu }">
          <button class="flex gap-2 w-32 items-center p-1 my-2 text-sm" v-if="props.blog.is_published"
            @click="updatePostPublishStatus">
            <Icon name="material-symbols:send-and-archive" class="h-6 w-6" /> Unpublish
          </button>
          <button class="flex gap-2 w-32 items-center p-1 my-2 text-sm" v-else @click="updatePostPublishStatus">
            <Icon name="material-symbols:send" class="h-6 w-6" />
            Publish
          </button>

          <NuxtLink :to="`/author/post/edit/${props.blog.url_param}`"
            class="flex gap-2 w-32 items-center p-1 my-2 text-sm">
            <Icon name="material-symbols:edit" class="h-6 w-6" />
            Edit
          </NuxtLink>

          <button class="flex gap-2 w-git items-center p-1 my-2 text-sm" @click="() => showDeleteModal = true">
            <Icon name="mdi:trash" class="h-6 w-6" />
            Delete
          </button>

        </div>
      </div>
    </div>

  </div>
  <ConfirmationModal :showConfirmationModal="showDeleteModal" :actionFunction="() => deletePostHandler(props.blog.id)"
    :type="'negative'" @closeModal="() => showDeleteModal = false">Are you want to delete {{ props.blog.title }}
  </ConfirmationModal>
</template>
<style scoped>
.tooltip {  
  @apply hidden bg-gray-200 group-hover:inline group-hover:absolute right-0 top-8 z-20 px-[0.8em] py-[0.4em] rounded-sm whitespace-nowrap text-black
}
</style>
