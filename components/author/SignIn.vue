<script setup lang="ts">
const supabase = useSupabaseClient();

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

const signInWithGoogle = async () => {
  try {
    await supabase.auth
      .signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
          redirectTo: process.env.NUXT_PUBLIC_SITE_URL + "/author/",
        },
      })
      .then(() => {
        useRouter().push("/author/");
      });
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <main class="font-rubik flex justify-center items-center h-[100vh]">
    <button
      class="flex gap-6 justify-center items-center bg-white rounded-full my-44 shadow-lg w-fit mx-auto p-3 px-20"
      @click="signInWithGoogle"
    >
      <Icon name="flat-color-icons:google" size="40"></Icon>
      <p class="font-medium">Sign In With Google</p>
    </button>
  </main>
</template>
