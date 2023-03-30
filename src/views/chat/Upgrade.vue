<template>
  <div class="px-6 py-2 mx-auto">
    <div
      class="max-w-2xl p-1.5 mx-auto overflow-hidden bg-gray-100 rounded-lg dark:bg-[#252529]"
    >
      <div class="grid gap-3 md:grid-cols-3">
        <button
          class="px-3 py-2 font-medium text-gray-800 uppercase transition-colors duration-300 transform bg-transparent rounded-lg focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 hover:bg-gray-200"
        >
          每月
        </button>

        <button
          class="flex items-center justify-center px-3 py-2 font-medium text-gray-800 uppercase transition-colors duration-300 transform bg-gray-200 rounded-lg dark:bg-gray-700 focus:outline-none dark:text-gray-200"
        >
          <span class="mx-1">每季</span>
          <span
            class="text-xs mx-1 font-normal text-white bg-blue-500 rounded-full py-0.5 px-1.5"
            >优惠 10%</span
          >
        </button>

        <button
          class="flex items-center justify-center px-3 py-2 font-medium text-gray-800 uppercase transition-colors duration-300 transform bg-transparent rounded-lg focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 hover:bg-gray-200"
        >
          <span class="mx-1">每年</span>
          <span
            class="text-xs mx-1 font-normal text-white bg-blue-500 rounded-full py-0.5 px-1.5"
            >优惠 20%</span
          >
        </button>
      </div>
    </div>

    <div
      class="flex flex-col items-center justify-center  mt-16 space-y-3 md:items-end md:-mx-5 md:space-y-0 md:flex-row"
    >
      <div
        class="w-full px-6 py-4 transition-colors duration-300 transform rounded-lg md:mx-5 md:w-80 bg-gray-50 dark:bg-[#252529]"
      >
        <div class="text-center">
          <p class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Basic
          </p>
          <p class="mt-4 text-gray-500 dark:text-gray-300">基本功能</p>
          <h4 class="mt-2 text-gray-600 line-through dark:text-gray-400">
            ¥9.99
          </h4>
          <h4
            class="mt-2 text-4xl font-semibold text-gray-800 dark:text-gray-100"
          >
            ¥0.00
          </h4>
          <p class="mt-4 text-gray-500 dark:text-gray-300">每季</p>
          <p class="mt-4 text-gray-500 dark:text-gray-300">Bill all 6 months</p>
        </div>

        <div class="mt-8 space-y-8">
          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>

            <span class="mx-4 text-gray-700 dark:text-gray-300"
              >访问部分功能</span
            >
          </div>

          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="mx-4 text-gray-700 dark:text-gray-300">15次/天</span>
          </div>

          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>

            <span class="mx-4 text-gray-700 dark:text-gray-300"
              >提示词支持</span
            >
          </div>

          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>

            <span class="mx-4 text-gray-700 dark:text-gray-300"
              >对话历史</span
            >
          </div>

          <div class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-blue-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>

            <span class="mx-4 text-gray-700 dark:text-gray-300"
              >个人APIKEY</span
            >
          </div>
        </div>

        <button
          class="w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-300 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          当前选择
        </button>
      </div>

      <div
        class="w-full overflow-hidden transition-colors duration-300 transform rounded-lg md:mx-5 md:w-80 bg-gray-50 dark:bg-[#252529]"
      >
        <p class="py-2 text-sm text-center text-white uppercase bg-blue-500">
          专家推荐
        </p>
        <div class="px-6 py-4">
          <div class="text-center">
            <p class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Pro
            </p>
            <p class="mt-4 text-gray-500 dark:text-gray-300">
              高级功能
            </p>
            <h4 class="mt-2 text-gray-600 line-through dark:text-gray-400">
              ¥408.00
            </h4>
            <h4
              class="mt-2 text-4xl font-semibold text-gray-800 dark:text-gray-100"
            >
              ¥59.99
            </h4>
            <p class="mt-4 text-gray-500 dark:text-gray-300">每季</p>
            <p class="mt-4 text-gray-500 dark:text-gray-300">
              Bill all 6 months
            </p>
          </div>

          <div class="mt-8 space-y-8">
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class="mx-4 text-gray-700 dark:text-gray-300"
                >访问全部功能</span
              >
            </div>

            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class="mx-4 text-gray-700 dark:text-gray-300"
                >100次/天</span
              >
            </div>

            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class="mx-4 text-gray-700 dark:text-gray-300"
                >提示词支持</span
              >
            </div>

            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class="mx-4 text-gray-700 dark:text-gray-300"
                >对话历史</span
              >
            </div>

            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class="mx-4 text-gray-700 dark:text-gray-300"
                >AI应用</span
              >
            </div>
          </div>

          <button
            class="w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            选择 Pro
          </button>
        </div>
      </div>

      <div
        class="w-full overflow-hidden transition-colors duration-300 transform rounded-lg md:mx-5 md:w-80 bg-gray-50 dark:bg-[#252529]"
      >
        <div class="px-6 py-4">
          <div class="text-center">
            <p class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
              Team
            </p>
            <p class="mt-4 text-gray-500 dark:text-gray-300">
              高级功能+企业定制功能
            </p>
            <h4 class="mt-2 text-gray-600 line-through dark:text-gray-400">
              ¥12000.00
            </h4>
            <h4
              class="mt-2 text-4xl font-semibold text-gray-800 dark:text-gray-100"
            >
              ¥3600.00
            </h4>
            <p class="mt-4 text-gray-500 dark:text-gray-300">每季</p>
            <p class="mt-4 text-gray-500 dark:text-gray-300">
              Bill all 6 months
            </p>
          </div>

          <div class="mt-8 space-y-8">
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class="mx-4 text-gray-700 dark:text-gray-300"
                >企业特殊定制功能</span
              >
            </div>

            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class="mx-4 text-gray-700 dark:text-gray-300"
                >500次/天</span
              >
            </div>

            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class="mx-4 text-gray-700 dark:text-gray-300"
                >团队账户</span
              >
            </div>

            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class="mx-4 text-gray-700 dark:text-gray-300"
                >可供0～50人使用</span
              >
            </div>

            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>

              <span class="mx-4 text-gray-700 dark:text-gray-300"
                >AI应用</span
              >
            </div>
          </div>

          <button
            class="w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            选择 Team
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
