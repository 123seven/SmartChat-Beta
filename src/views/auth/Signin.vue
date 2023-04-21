<script lang="ts" setup>
import { fetchSignIn } from "@/api";
import { useAuthStore, useUserStore } from "@/store";
import { useRouter } from "vue-router";
import { ElDialog, ElMessage, ElMessageBox } from "element-plus";
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { t } from "@/locales";

const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();
const { isMobile } = useBasicLayout()

const SignInData = {
  email: "",
  password: "",
};

interface SignInResponse {
  id: string;
  avatar_url: string;
  email: string;
  token: string;
  username: string;
}

// 邮箱格式有效性验证
function validateEmail() {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(SignInData.email);
}
// 检查密码长度是否大于8
function validatePassword() {
  return SignInData.password.length > 8;
}

async function SignIn() {
  try {
    if (!validateEmail()) {
      ElMessage({
        type: "error",
        message: "邮箱无效",
      });
      return;
    }

    if (!validatePassword()) {
      ElMessage({
        type: "error",
        message: "密码必须大于8位字符",
      });
      return;
    }

    const { data } = await fetchSignIn<SignInResponse>(
      SignInData.email,
      SignInData.password
    );
    authStore.setToken(data.token);
    if (!data.avatar_url) {
      data.avatar_url = "https://files.catbox.moe/tyr8zm.png";
    }
    userStore.updateUserInfo({ ...data, avatar: data.avatar_url });
    userStore.setUserAuth();
    ElMessage({
      type: "success",
      message: "登录成功",
    });
    router.push("/");
  } catch (error: any) {
    console.log("SignIn Error:", error);
    ElMessage({
      type: "error",
      message: error.message,
    });
  }
}

// 回车登录
function handleEnter(event: KeyboardEvent) {
  if (!isMobile.value) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      SignIn()
    }
  } else {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault()
      SignIn()
    }
  }
}
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="container flex items-center justify-center min-h-screen px-6 mx-auto">
      <div class="w-full max-w-md">
        <div class="flex flex-shrink-0 items-center">
          <span class="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
            {{ $t('common.productName') }}
          </span>
          <span class="bg-[#9750dd] text-white rounded ml-1 px-1 py-1 text-sm font-bold leading-none">{{ $t('common.beta') }}</span>
        </div>

        <h1 class="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">
          {{ t('common.signin') }}
        </h1>

        <div class="relative flex items-center mt-8">
          <span class="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </span>

          <input
            v-model="SignInData.email"
            type="email"
            class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-10 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            :placeholder="t('common.email')"
          />
        </div>

        <div class="relative flex items-center mt-4">
          <span class="absolute">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </span>

          <input
            v-model="SignInData.password"
            @keypress="handleEnter"
            type="password"
            class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            :placeholder="t('common.password')"
          />
        </div>

        <div class="mt-6">
          <button
            @click="SignIn"
            class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            {{ t('common.signin') }}
          </button>

          <p class="mt-4 text-center text-gray-600 dark:text-gray-400">
            {{ t('common.or') }}
          </p>
          <!-- Github登录，由于国内网络不稳定暂时不显示该方式 -->
          <!-- <a
          href="https://openai-api.unknownbyte.com/api/v1/user/signin/github"

            class="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <svg
              class="w-6 h-6 mx-2"
              viewBox="0 -3.5 256 256"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin meet"
              fill="#000000"
            >
              <g
                id="SVGRepo_bgCarrier"
                stroke-width="0"
              ></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g fill="#161614">
                  <path d="M127.505 0C57.095 0 0 57.085 0 127.505c0 56.336 36.534 104.13 87.196 120.99 6.372 1.18 8.712-2.766 8.712-6.134 0-3.04-.119-13.085-.173-23.739-35.473 7.713-42.958-15.044-42.958-15.044-5.8-14.738-14.157-18.656-14.157-18.656-11.568-7.914.872-7.752.872-7.752 12.804.9 19.546 13.14 19.546 13.14 11.372 19.493 29.828 13.857 37.104 10.6 1.144-8.242 4.449-13.866 8.095-17.05-28.32-3.225-58.092-14.158-58.092-63.014 0-13.92 4.981-25.295 13.138-34.224-1.324-3.212-5.688-16.18 1.235-33.743 0 0 10.707-3.427 35.073 13.07 10.17-2.826 21.078-4.242 31.914-4.29 10.836.048 21.752 1.464 31.942 4.29 24.337-16.497 35.029-13.07 35.029-13.07 6.94 17.563 2.574 30.531 1.25 33.743 8.175 8.929 13.122 20.303 13.122 34.224 0 48.972-29.828 59.756-58.22 62.912 4.573 3.957 8.648 11.717 8.648 23.612 0 17.06-.148 30.791-.148 34.991 0 3.393 2.295 7.369 8.759 6.117 50.634-16.879 87.122-64.656 87.122-120.973C255.009 57.085 197.922 0 127.505 0"></path>
                  <path d="M47.755 181.634c-.28.633-1.278.823-2.185.389-.925-.416-1.445-1.28-1.145-1.916.275-.652 1.273-.834 2.196-.396.927.415 1.455 1.287 1.134 1.923M54.027 187.23c-.608.564-1.797.302-2.604-.589-.834-.889-.99-2.077-.373-2.65.627-.563 1.78-.3 2.616.59.834.899.996 2.08.36 2.65M58.33 194.39c-.782.543-2.06.034-2.849-1.1-.781-1.133-.781-2.493.017-3.038.792-.545 2.05-.055 2.85 1.07.78 1.153.78 2.513-.019 3.069M65.606 202.683c-.699.77-2.187.564-3.277-.488-1.114-1.028-1.425-2.487-.724-3.258.707-.772 2.204-.555 3.302.488 1.107 1.026 1.445 2.496.7 3.258M75.01 205.483c-.307.998-1.741 1.452-3.185 1.028-1.442-.437-2.386-1.607-2.095-2.616.3-1.005 1.74-1.478 3.195-1.024 1.44.435 2.386 1.596 2.086 2.612M85.714 206.67c.036 1.052-1.189 1.924-2.705 1.943-1.525.033-2.758-.818-2.774-1.852 0-1.062 1.197-1.926 2.721-1.951 1.516-.03 2.758.815 2.758 1.86M96.228 206.267c.182 1.026-.872 2.08-2.377 2.36-1.48.27-2.85-.363-3.039-1.38-.184-1.052.89-2.105 2.367-2.378 1.508-.262 2.857.355 3.049 1.398"></path>
                </g>
              </g>
            </svg>

            <span class="mx-2">{{ t("common.signWithGithub") }}</span>
          </a> -->

          <a
            href="#"
            class="flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <span class="mx-2">{{ t('common.tryOut') }}</span>
          </a>

          <div class="mt-6 text-center">
            <router-link
              to="/signup"
              class="text-sm text-blue-500 hover:underline dark:text-blue-400"
            >
              {{ t('common.dontHaveAccount') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
