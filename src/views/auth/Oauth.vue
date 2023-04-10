<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { useAuthStore, useUserStore } from "@/store";
import { fetchUserInfo } from "@/api";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();
console.log(route)
const { token } = route.query as { token: string };

interface SignInResponse {
  id: string;
  avatar_url: string;
  email: string;
  token: string;
  username: string;
}

async function SignIn() {
  try {
    console.log("token:",token)
    authStore.setToken(token);
    const { data } = await fetchUserInfo<SignInResponse>();

    if (!data.avatar_url) {
      data.avatar_url = "https://files.catbox.moe/tyr8zm.png";
    }
    userStore.updateUserInfo({ ...data, avatar: data.avatar_url });
    userStore.setUserAuth();
    router.push("/");
  } catch (error: any) {
    console.log("SignIn Error:", error);
    authStore.setToken("");
  }
}

SignIn()
</script>

<template>

</template>
