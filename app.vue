<script setup lang="ts">
const supabase = useSupabaseClient();
const layout = ref("my-layout");
const getUserRole = async (claim: string) => {
  try {
    const { data, error } = await supabase.rpc("get_my_claim", {
      claim,
    } as unknown as undefined);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    throw new Error(error as string);
  }
};

useServerSeoMeta({
  title: "My Blog",
  ogTitle: "My Blog",
  description: "Blog Website that talk about technology and daily life",
  ogDescription: "Blog Website that talk about technology and daily life",
});
useHead({
  title: "My Blog",
  titleTemplate: "My Blogs",
  meta: [
    {
      name: "description",
      content: "Blog Website that talk about technology and daily life",
    },
  ],
});

const userRole = ref("");
userRole.value = await getUserRole("userrole");
const route = useRoute();

userRole.value === "admin" && (layout.value = "author-layout");
console.log(layout.value);

onBeforeRouteUpdate((to, from) => {
  console.log(to.path);
  console.log(to.name);
  console.log(to.matched);
  console.log(to.hash);
  console.log(to.fullPath);
  console.log(to.meta);
});

// console.log(route.path);
// console.log(route.name);
// console.log(route.matched);
// console.log(route.hash);
// console.log(route.fullPath.split('/')[1] === ('auth'));
// console.log(route.meta);
// console.log(route);

watch(
  route,
  (newValue) => {
    console.log("change");
    if (
      newValue.fullPath.startsWith("/blogs") ||
      newValue.fullPath.startsWith("/blog") ||
      newValue.fullPath.startsWith("/")
    ) {
      console.log('my-layout')
      layout.value = "my-layout";
    }

    if (newValue.fullPath.split("/")[1] === "auth") {
      console.log("default layout");
      layout.value = "default-layout";
    }

    if (newValue.fullPath.split("/")[1] === "author") {
      console.log('author layout')
      layout.value = "author-layout";
    }
  },
  { immediate: true, deep: true }
);
</script>
<template>
  <NuxtLayout :name="layout">
    <!-- <SeoKit /> -->
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
