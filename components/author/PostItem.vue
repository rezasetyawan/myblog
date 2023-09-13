<script setup lang="ts">
import {updateBlogById, deleteBlogByID} from '../../composables/useBlogs'
const client = useSupabaseClient()

interface Props {
  blog: GetBlog;
  isLoading?: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(["updatePublishStatus"])

const updatePostPublishStatus = async () => {
try {
  await updateBlogById(client, props.blog.id, {is_published: !props.blog.is_published})
  emit('updatePublishStatus', props.blog.id)  

} catch (error){
  console.error(error);
}
}

const deletePostHandler = async (title: string, postId: string) => {
 const deletePost = confirm('Are you sure want to delete '+ title)

 if (deletePost) {
  try {
    await deleteBlogByID(client, postId)
  }
  catch (error) {
        console.error(error)
    }
 }
}
</script>
<template>
  
    <div class="group border-2 rounded-lg p-1 my-2 w-full flex justify-between">
      <NuxtLink :to="`/author/post/${props.blog.id}`">
      <div class="flex gap-2">
        <NuxtImg
          :src="props.blog.image_url"
          class="min-h-[100px] max-h-[100px] sm:min-h-[100px] sm:max-h-[100px] object-cover brightness-90 group-hover:brightness-100 transition-all rounded-sm aspect-[4/2]"
          loading="lazy"
          quality="50"
          :alt="props.blog.title"
          placeholder
        />
        <div>
          <h3 class="text-left font-medium text-xl py-1 font-rubik">
            {{ props.blog.title }}
          </h3>
          <div class="flex gap-3 items-center justify-center font-medium text-sm ">
            <p v-if="props.blog.is_published">Published</p>
          <p v-else class=" text-orange-600">Draft</p>
          
          &#8226
            <p>
            {{ formatDate(props.blog.created_at) }}
          </p>
          </div>
        </div>
      </div>
    </NuxtLink>
      <div class="z-10">
       <div class="flex items-center gap-2"> 
        <button v-if="props.blog.is_published" @click="updatePostPublishStatus">
          <Icon name="material-symbols:send-and-archive" class="h-6 w-6" />
        </button>
        <button v-else @click="updatePostPublishStatus">
          <Icon name="material-symbols:send" class="h-6 w-6" />
        </button>

        <NuxtLink :to="`/author/post/edit/${props.blog.id}`">
            <Icon name="material-symbols:edit" class="h-6 w-6"/>
          </NuxtLink>
        
        <button @click="() => deletePostHandler(blog.title, blog.id)">
          <Icon name="mdi:trash" class="h-6 w-6"/>
        </button></div>
        <div
          class="flex gap-3 items-center justify-center font-medium text-sm text-black"
        >
        
          <p>
            {{ props.blog.comment_counts }}
            <Icon name="basil:chat-outline" size="24" />
          </p>
        </div>
      </div>
    </div>
  
</template>
