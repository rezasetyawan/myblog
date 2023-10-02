<script setup lang="ts">
import useLayout from './stores/useLayout'

const { layout } = useLayout()
// const supabase = useSupabaseClient();
// // const layout = ref("my-layout");
// const getUserRole = async (claim: string) => {
//   try {
//     const { data, error } = await supabase.rpc("get_my_claim", {
//       claim,
//     } as unknown as undefined);

//     if (error) {
//       throw new Error(error.message);
//     }

//     return data;
//   } catch (error) {
//     throw new Error(error as string);
//   }
// };

useServerSeoMeta({
  title: "My Blog",
  ogTitle: "My Blog",
  description: "Blog Website that talk about technology and daily life",
  ogDescription: "Blog Website that talk about technology and daily life",
});


useHead({
  htmlAttrs: { lang: 'id' }
})

// const userRole = ref("");
// userRole.value = await getUserRole("userrole");
// const route = useRoute();

// userRole.value === "admin" && (layout.value = "author-layout");

// watch(
//   route,
//   (newValue) => {
//     if (
//       newValue.fullPath.startsWith("/blogs") ||
//       newValue.fullPath.startsWith("/blog") ||
//       newValue.fullPath.startsWith("/")
//     ) {
//       layout.value = "my-layout";
//     }

//     if (newValue.fullPath.split("/")[1] === "auth") {
//       layout.value = "default-layout";
//     }

//     if (newValue.fullPath.split("/")[1] === "author") {
//       layout.value = "author-layout";
//     }
//   },
//   { immediate: true, deep: true }
// );
</script>
<template>
  <NuxtLayout :name="layout as any">
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
