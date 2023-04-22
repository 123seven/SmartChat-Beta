<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { fetchApp } from "@/api";
import { useBasicLayout } from "@/hooks/useBasicLayout";
import MarkdownIt from "markdown-it";
import mdKatex from "@traptitech/markdown-it-katex";
import mila from "markdown-it-link-attributes";
import hljs from "highlight.js";
import { ElMessage } from "element-plus";
import { t } from "@/locales";

const route = useRoute();
const loading = ref(true);
const answerLoading = ref(true);
const { appId } = route.params as { appId: string };
const { isMobile } = useBasicLayout();
const message = ref("");
const answer = ref("");

interface App {
  id: string;
  emoji: string;
  name: string;
  name_en: string;
  description: string;
  description_en: string;
  example: string;
  example_en: string;
}
const app = ref<App>({
  id: "",
  emoji: "",
  name: "",
  name_en: "",
  description: "",
  description_en: "",
  example: "",
  example_en: "",
});

const mdi = new MarkdownIt({
  linkify: true,
  highlight(code, language) {
    const validLang = !!(language && hljs.getLanguage(language));
    if (validLang) {
      const lang = language ?? "";
      return highlightBlock(
        hljs.highlight(code, { language: lang }).value,
        lang
      );
    }
    return highlightBlock(hljs.highlightAuto(code).value, "");
  },
});

mdi.use(mila, { attrs: { target: "_blank", rel: "noopener" } });
mdi.use(mdKatex, {
  blockClass: "katexmath-block rounded-md p-[10px]",
  errorColor: " #cc0000",
});

const wrapClass = computed(() => {
  return [
    "text-wrap",
    "min-w-[20px]",
    "rounded-md",
    isMobile.value ? "p-2" : "px-3 py-2",
  ];
});

function highlightBlock(str: string, lang?: string) {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">${t(
    "chat.copyCode"
  )}</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`;
}

// 获取应用详情
async function fetchAppInfo(appId: string) {
  try {
    loading.value = true;
    const { data } = await fetchApp<App>(appId);
    app.value = data;
  } finally {
    loading.value = false;
  }
}
// 获取应用回答
async function fetchAppAskData() {
  answerLoading.value = true;
  answer.value = ""
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_BASE_URL}api/v1/app/${appId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message.value,
      }),
    }
  );
  console.log("Edge function returned.");

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // This data is a ReadableStream
  const data = response.body;
  if (!data) {
    answerLoading.value = false;
    return;
  }

  const reader = data.getReader();
  const decoder = new TextDecoder();
  answerLoading.value = false;
  let done = false;

  let text = "";
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);

    text += chunkValue;
    answer.value = mdi.render(text);
  }
}

// copy回答
function copyAnswer() {
  navigator.clipboard.writeText(answer.value);
  ElMessage({
    type: "success",
    message: "✂️已成功复制内容",
  });
}
onMounted(() => {
  fetchAppInfo(appId);
});
</script>

<template>
  <div class="w-full bg-slate-50 dark:bg-[#161618] pb-20 overflow-y-auto overscroll-none h-full">
    <div class="mx-auto max-w-7xl px-4 pt-5 md:pt-10 sm:px-6 lg:px-8">
      <nav
        class="flex"
        aria-label="Breadcrumb"
      >
        <ol
          role="list"
          class="flex items-center space-x-4"
        >
          <li>
            <div>
              <router-link
                class="flex items-center gap-2 text-sm text-gray-400 dark:text-white hover:text-gray-500"
                to="/chat/apps"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  class="h-5 w-5 flex-shrink-0"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span>应用列表</span>
              </router-link>
            </div>
          </li>
        </ol>
      </nav>

      <div class="mx-auto flex max-w-3xl flex-col items-center justify-center py-2">
        <main class="mt-12 flex w-full flex-1 flex-col items-center justify-center px-4  sm:mt-20">
          <h1 class="max-w-[708px] text-4xl font-bold text-slate-900 dark:text-white sm:text-6xl">{{ app.name }}</h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">{{ app.description }}</p>

          <div class="flex w-full max-w-xl flex-col items-center">
            <div class="flex mt-4 items-center space-x-3 mb-3">
              <p class="text-left font-medium">
                请输入您的内容
              </p>
            </div>

            <textarea
              v-model="message"
              :rows="4"
              class="my-2 px-2 w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black "
              :placeholder="app.example"
            />

            <div class="flex gap-4 self-end pt-6">
              <!-- <button
                type="button"
                class="mx-atuo rounded-xl border bg-white px-8 py-2 font-medium text-black hover:bg-gray-200/80"
              >收藏</button> -->
              <button
                @click="fetchAppAskData"
                type="button"
                class="mx-atuo rounded-xl bg-black px-8 py-2 font-medium text-white hover:bg-black/80"
              >运行</button>
            </div>

            <div
            class="pt-6"
              :class="wrapClass"
              v-if="!answerLoading"
            >
              <div
                ref="textRef"
                class="bg-white text-sm rounded-xl shadow-md dark:bg-[#0d1117] dark:text-white transition cursor-copy borde py-2 px-4"
              >
                <div
                  v-if="answer"
                  @click="copyAnswer"
                  v-html="answer"
                  class="markdown-body"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>

</template>
