<script setup lang="ts">
interface Props {
  blog: GetBlogDetail;
  commentData: CommentSnapshots | null | undefined;
}

const props = defineProps<Props>();
</script>

<template>
  <section v-if="props.blog" class="mt-10 mx-3 mb-20 sm:mx-6 lg:mx-40">
    <button
      class="absolute -top-8 left-1 sm:top-0 sm:left-5"
      @click="() => useRouter().push('/')"
    >
      <Icon name="eva:arrow-back-fill" class="w-7 h-7 sm:w-8 sm:h-8" />
    </button>
    <div
      class="flex gap-2 flex-wrap justify-center font-rubik text-sm mx-2 sm:text-base sm:gap-3"
    >
      <p class="flex items-center gap-1">
        <Icon name="bi:calendar-fill" class="w-3 h-3" />{{
          formatDate(props.blog.created_at)
        }}
      </p>
      <p class="flex items-center gap-1">
        <Icon name="basil:chat-outline" class="w-5 h-5" />{{
          props.commentData ? props.commentData.comment_counts : "-"
        }}
        comments
      </p>
      <p class="flex items-center gap-1">
        <NuxtLink
          :to="{
            path: '/',
            query: {
              category_id: props.blog.category_id,
            },
          }"
        >
          <Icon name="iconamoon:category-light" class="w-5 h-5" />{{
            props.blog.category
          }}
        </NuxtLink>
      </p>
    </div>

    <div class="mt-6 mb-3">
      <h2 class="text-xl text-center font-rubik font-bold lg:text-3xl">
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
        id="post-content"
        v-html="props.blog.text"
        class="prose prose-base max-w-[75ch] mx-auto text-black font-rubik my-5 prose-pre:max-w-fit prose-h2:text-xl prose-h2:font-extrabold prose-li:marker:text-black"
      ></div>
      <div class="mt-10 flex flex-wrap gap-1 max-w-[75ch] mx-auto py-2">
        <NuxtLink
          v-for="tag in props.blog.tags"
          :key="tag.id"
          class="p-1 px-4 bg-slate-100 rounded-full text-sm sm:text-base"
          :to="{
            path: '/',
            query: {
              tags: [tag.id],
            },
          }"
          >{{ tag.name }}</NuxtLink
        >
      </div>
      <CommentSection
        :commentData="props.commentData"
        :postId="props.blog.id"
        v-if="props.commentData"
        :comment_counts="props.commentData.comment_counts.toString()"
        class="my-8"
      />
    </div>
  </section>
</template>
<style scoped></style>
