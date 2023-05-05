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
import { useCopyCode } from "./hooks/useCopyCode";
import { copyText } from "@/utils/format";

useCopyCode();
const route = useRoute();
const answerLoading = ref(true);
const { isMobile } = useBasicLayout();
const answer = ref("");
const message = ref();
console.log(route);

const { q } = route.query as { q: string };

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
    isMobile.value ? "p-2" : "",
  ];
});

function highlightBlock(str: string, lang?: string) {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">${t(
    "chat.copyCode"
  )}</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`;
}

// 获取应用回答
async function fetchQuestionAskData() {
  answerLoading.value = true;
  answer.value = "";
  const response = await fetch(
    `${import.meta.env.VITE_APP_API_BASE_URL}api/v1/chat/question/stream`,
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
  if (navigator.clipboard?.writeText)
    navigator.clipboard.writeText(answer.value ?? "");
  else copyText({ text: answer.value, origin: true });

  ElMessage({
    type: "success",
    message: "✂️已成功复制内容",
  });
}
onMounted(() => {
  if (!q) {
    return;
  }
  message.value = q;
  fetchQuestionAskData();
});
</script>

<template>
  <div class="w-full bg-slate-50 dark:bg-[#161618] pb-20 overflow-y-auto overscroll-none h-full">
    <div class="mx-auto max-w-7xl px-4 pt-5 md:pt-10 sm:px-6 lg:px-8">

      <div class="mx-auto flex max-w-3xl flex-col items-center justify-center py-2">
        <main class="mt-5 flex w-full flex-1 flex-col items-center justify-center px-4  sm:mt-20">
          <h1 class="max-w-[708px] text-4xl font-bold text-slate-900 dark:text-white sm:text-6xl">AI智能问答</h1>

          <div class="flex w-full max-w-3xl flex-col items-center mt-10">

            <input
              v-model="message"
              class="block w-full py-3 text-gray-700 bg-white border rounded-lg px-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 border-blue-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              :placeholder="q"
            />

            <!-- <input
              v-model="message"
              class="my-2 px-2 w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black text-sm"
              :placeholder="q"
            /> -->

            <div class="flex gap-4 self-end pt-6">

              <button
                @click="fetchQuestionAskData"
                type="button"
                class="mx-atuo rounded-xl bg-black px-8 py-2 font-medium text-white hover:bg-black/80"
              >搜索</button>
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
