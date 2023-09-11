<script setup lang="ts">
const supabase = useSupabaseClient();
interface Props {
  sidebar: boolean;
}
const props = defineProps<Props>();

const signOutUser = async () => {
  try {
    await supabase.auth.signOut().then(() => {
      return useRouter().replace("/auth/login");
    });
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <aside
    id="logo-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform duration-200 -translate-x-full bg-white border-r border-gray-200"
    :class="{ 'translate-x-0': props.sidebar }"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white">
      <ul class="space-y-2 font-medium text-sm">
        <li class="group">
          <NuxtLink
            to="/author/"
            class="flex items-center p-2 font-semibold rounded-lg hover:bg-gray-100"
          >
            <svg
              class="w-6 h-6 transition duration-75 group-hover:scale-105 font-semibold"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span class="ml-3">Dashboard</span>
          </NuxtLink>
        </li>
        <li class="group">
          <NuxtLink
            to="/author/posts"
            class="flex items-center p-2 font-semibold rounded-lg hover:bg-gray-100"
          >
            <Icon name="ooui:articles-rtl" size="24" />

            <span class="flex-1 ml-3 whitespace-nowrap"> Posts </span>
          </NuxtLink>
        </li>
        <li class="group">
          <NuxtLink
            to="/author/images"
            class="flex items-center p-2 font-semibold rounded-lg hover:bg-gray-100"
          >
            <Icon name="ion:images" size="24" />
            <span class="flex-1 ml-3 whitespace-nowrap"> Images </span>
          </NuxtLink>
        </li>
        <li class="group">
          <button
            class="flex items-center p-2 font-semibold rounded-lg hover:bg-gray-100 pr-[120px]"
            @click="signOutUser"
          >
            <svg
              class="flex-shrink-0 w-6 h-6 transition duration-75 group-hover:scale-105 font-semibold"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Sign Out</span>
          </button>
        </li>
      </ul>
    </div>
  </aside>
</template>
<style scoped>
a.router-link-active {
  color: #991b1b;
}
</style>
