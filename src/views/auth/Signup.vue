<script lang="ts" setup>
import { fetchSignUp } from "@/api";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { useBasicLayout } from '@/hooks/useBasicLayout'
import { t } from "@/locales";

const router = useRouter();
const { isMobile } = useBasicLayout()

const SignUpData = {
  username: "",
  email: "",
  password: "",
  passwordRepeat: "",
};

interface SignUpResponse {
  id: string;
  avatar_url: string;
  email: string;
  token: string;
  username: string;
}
// 大小写字母、数字、下划线和连接符号。长度3-16.
function validateUsername() {
  const regex = /^[a-zA-Z0-9_-]{3,16}$/;
  return regex.test(SignUpData.username);
}
// 邮箱格式有效性验证
function validateEmail() {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(SignUpData.email);
}
// 检查密码长度是否大于8
function validatePassword() {
  return SignUpData.password.length > 8;
}
// 两个密码输入是否一致
function passwordsMatch() {
  return SignUpData.password === SignUpData.passwordRepeat;
}

async function SignUp() {
  try {
    if (!validateUsername()) {
      ElMessage({
        type: "error",
        message: "用户名无效",
      });
      return;
    }

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

    if (!passwordsMatch()) {
      ElMessage({
        type: "error",
        message: "两次输入密码不一致",
      });
      return;
    }

    const { data } = await fetchSignUp<SignUpResponse>(
      SignUpData.username,
      SignUpData.email,
      SignUpData.password
    );
    ElMessage({
      type: "success",
      message: "注册成功，请您到您的邮箱中点击激活链接来激活您的帐号",
    });
    setTimeout(() => {
      router.push("/signin");
    }, 3000);
  } catch (error: any) {
    console.log("SignUp Error:", error);
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
      SignUp()
    }
  } else {
    if (event.key === 'Enter' && event.ctrlKey) {
      event.preventDefault()
      SignUp()
    }
  }
}
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="container flex items-center justify-center min-h-screen px-6 mx-auto">
      <div class="w-full max-w-md">
        <div class="flex justify-center mx-auto">
          <div class="flex flex-shrink-0 items-center">
            <span class="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
              {{ $t('common.productName') }}
            </span>
            <span class="bg-[#9750dd] text-white rounded ml-1 px-1 py-1 text-sm font-bold leading-none">{{ $t('common.beta') }}</span>
          </div>
        </div>

        <div class="flex items-center justify-center mt-6">
          <a
            href="#"
            class="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
          >
            {{ t('common.signup') }}
          </a>
        </div>

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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>

          <input
            v-model="SignUpData.username"
            type="text"
            class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-10 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            :placeholder="t('common.username')"
          />
        </div>

        <div class="relative flex items-center mt-6">
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
            v-model="SignUpData.email"
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
            v-model="SignUpData.password"
            type="password"
            class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            :placeholder="t('common.password')"
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
            v-model="SignUpData.passwordRepeat"
            @keypress="handleEnter"
            type="password"
            class="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            :placeholder="t('common.confirmPassword')"
          />
        </div>

        <div class="mt-2 text-sm text-red-400">{{ t('common.changeEmailTryagain') }}</div>

        <div class="mt-6">
          <button
            @click="SignUp"
            class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            {{ t('common.signup') }}
          </button>

          <div class="mt-6 text-center">
            <router-link
              to="/signin"
              class="text-sm text-blue-500 hover:underline dark:text-blue-400"
            >
              {{ t('common.haveAccount') }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
