<script setup lang="ts">
const client = useSupabaseClient();
const config = useRuntimeConfig();

const images = ref<ImageData[]>();
const imageFile = ref<File | null>(null);
const isLoading = ref<boolean>(false);

const fetchImages = async () => {
  try {
    isLoading.value = true;
    const imageData = await listImages(client);
    const data = await getImages(client, imageData?.length ? imageData : []);
    images.value = data;
  } catch (error: any) {
    showErrorToast(error.message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await fetchImages();
});

const handleDeleteImage = (imageid: string) => {
  try {
    const index = images.value?.findIndex((image) => image.id === imageid);
    if (index !== undefined && index !== -1) images.value?.splice(index, 1);
    showSuccessToast("image deleted");
  } catch (error: any) {
    showErrorToast(error.message);
  }
};

const onFileChangeHandler = (event: Event) => {
  const target = event.target as HTMLInputElement;
  !!target.files && (imageFile.value = target.files[0]);
};

const getImageUrl = () => {
  if (imageFile?.value) {
    return URL.createObjectURL(imageFile.value);
  }
};

const onUploadImageHandler = async () => {
  try {
    if (imageFile.value) {
      await addImage(
        client,
        imageFile.value.name.split(".")[0],
        imageFile.value,
        config.public.SUPABASE_URL
      );
      showSuccessToast("image uploaded");
      await fetchImages();
    }
  } catch (error: any) {
    showErrorToast(error.message);
  }
};

useHead({
  title: "Images | My Blog",
  titleTemplate: "Images | My Blog",
});

definePageMeta({
  middleware: "author",
  layout: "author-layout",
});
</script>
<template>
  <h2
    class="font-rubik font-bold text-2xl my-5 text-center sm:my-8 lg:text-3xl lg:my-10"
  >
    Images
  </h2>
  <section class="max-w-sm mx-1 sm:mx-5 lg:grid-cols-3 lg:mx-10">
    <form @submit.prevent="onUploadImageHandler">
      <label
        class="block mb-2 text-lg font-semibold text-gray-900"
        for="file_input"
        >Upload Image</label
      >
      <img
        v-if="imageFile"
        :src="getImageUrl()"
        alt="Selected Image"
        class="max-h-[150px] my-3"
      />

      <input
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 file:border-none file:p-2 file:mr-4 file:py-2 file:px-4 file:text-sm file:font-semibold"
        id="file_input"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        required
        @change="(event: Event) => onFileChangeHandler(event)"
      />

      <button class="px-[4em] py-[0.4em] bg-slate-100 rounded-md mt-2">
        Upload Image
      </button>
    </form>
  </section>
  <AuthorImages
    :images="images"
    :isLoading="isLoading"
    @deleteimage="(id: string) => handleDeleteImage(id)"
  />
</template>
