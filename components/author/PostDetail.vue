<script setup lang="ts">
interface Props {
  blog: GetBlogDetail;
  commentData: CommentSnapshots;
}
const props = defineProps<Props>();
</script>

<template>
  <section v-if="props.blog" class="my-10 mx-3 mb-20 sm:mx-6 lg:mx-40">
    <button
      class="absolute -top-1 left-1 sm:top-0 sm:left-5"
      @click="() => useRouter().go(-1)"
    >
      <Icon name="eva:arrow-back-fill" class="w-8 h-8" />
    </button>
    <div
      class="flex gap-1 flex-wrap justify-center font-rubik text-sm mx-2 sm:text-base sm:gap-3"
    >
      <p class="flex items-center gap-1">
        <Icon name="bi:calendar-fill" />{{ formatDate(props.blog.created_at) }}
      </p>
      <p class="flex items-center gap-1">
        <Icon name="basil:chat-outline" size="24" />{{
          props.commentData.comment_counts
        }}
        comments
      </p>
      <p class="flex items-center gap-1">
        <NuxtLink
          :to="{
            path: '/author/posts',
            query: {
              category_id: props.blog.category_id,
            },
          }"
        >
          <Icon name="iconamoon:category-light" size="24" />{{
            props.blog.category
          }}
        </NuxtLink>
      </p>
    </div>
    <div class="my-2">
      <NuxtLink
        v-for="tag in props.blog.tags"
        :key="tag.id"
        class="m-2 underline rounded-md text-sm sm:text-base"
        :to="{
          path: '/author/posts',
          query: {
            tags: [tag.id],
          },
        }"
        >#{{ tag.name }}</NuxtLink
      >
    </div>
    <div class="my-3">
      <h2 class="text-xl text-center font-rubik font-bold">
        {{ props.blog.title }}
      </h2>
      <div class="flex justify-center py-4">
        <NuxtImg
          :src="props.blog.image_url"
          class="max-w-sm aspect-[4/2] object-cover overflow-hidden sm:max-w-2xl"
          loading="lazy"
          quality="50"
          placeholder
          :alt="props.blog.title"
        />
      </div>
      <div
        v-html="props.blog.text"
        class="prose prose-base max-w-[75ch] mx-auto text-black font-rubik my-5 prose-pre:max-w-fit prose-h2:text-xl prose-h2:font-extrabold prose-li:marker:text-black text-sm md:text-base"
      ></div>
      <CommentSection :commentData="props.commentData" />
    </div>
  </section>
</template>
