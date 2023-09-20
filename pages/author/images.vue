<script setup lang="ts">
import { getImages, listImages } from "../../composables/usePostImage";
const client = useSupabaseClient();

const images = ref<ImageData[]>();
onMounted(async () => {
  const imageData = await listImages(client);
  const data = await getImages(client, imageData?.length ? imageData : []);
  images.value = data;
});
</script>
<template>
  <div v-for="img in images">
    <div class="group border-2 rounded-lg p-1 my-2 w-full flex justify-between">
      <div class="flex gap-2">
        <NuxtImg
          :src="img.url"
          class="min-h-[100px] max-h-[100px] sm:min-h-[100px] sm:max-h-[100px] object-cover brightness-90 group-hover:brightness-100 transition-all rounded-sm aspect-[4/2]"
          loading="lazy"
          quality="50"
          :alt="img.name"
          placeholder
        />
        <div>
          <h3 class="text-left font-medium text-xl py-1 font-rubik">
            {{ img.post }}
          </h3>
          <div class="gap-3 items-center justify-center font-medium text-sm">
            <p>
              {{
                new Date(img.created_at).toLocaleString(undefined, {
                  hour12: false,
                })
              }}
            </p>
            <p>{{ (img.metadata.size / 1024 / 1024).toFixed(2) }}MB</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
