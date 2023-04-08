<script lang="ts" setup>
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";
import { ElMessage } from "element-plus";
import confetti from "canvas-confetti";
import { fetchActivationCode } from "@/api";

// Props
interface Props {
  isOpen: boolean;
}
const props = defineProps<Props>();

// Emit
interface Emit {
  (ev: "close"): void;
  (ev: "open"): void;
}
const emit = defineEmits<Emit>();

const activationCode = ref<string>("");
const loading = ref(false);

function closeModal() {
  emit("close");
}
function openModal() {
  emit("open");
}

function validateActivationCode(activationCode: string) {
  const regex = /^[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}$/;
  return regex.test(activationCode);
}

async function handleActivation() {
  if (!validateActivationCode(activationCode.value)) {
    activationCode.value = "";
    ElMessage({
      type: "error",
      message: "激活码错误",
    });
    return;
  }

  try {
    loading.value = true;
    const { data } = await fetchActivationCode(activationCode.value);
  } catch (error: any) {
    console.log("error:", error);
    loading.value = false;
    activationCode.value = "";
    ElMessage({
      type: "error",
      message: error.message || "激活码错误",
    });
    return;
  }

  loading.value = false;

  // 成功激活
  confetti({
    particleCount: 360,
    spread: 360,
  });
  ElMessage({
    type: "success",
    message: "激活成功",
  });
  // 关闭对话框
  closeModal();
}
</script>


<template>
  <TransitionRoot
    appear
    :show="props.isOpen"
    as="template"
  >
    <Dialog
      as="div"
      @close="closeModal"
      class="relative z-10"
    >
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >{{ $t("common.activationCode") }}
              </DialogTitle>
              <div class="mt-2">
                <div class="w-full sm:max-w-xs">
                  <label
                    for="activationCode"
                    class="sr-only"
                  >activationCode</label>
                  <input
                    v-model="activationCode"
                    type="activationCode"
                    name="activationCode"
                    id="activationCode"
                    class="w-full h-10 pl-2 border rounded-md border-purple-400 hover:border-purple-600 sm:text-sm"
                    placeholder="UXE30-EXBMF-IF6BY-CXFRJ-ABCDE"
                  />
                </div>
                <p class="mt-2 text-xs text-gray-500">
                  <!-- {{ $t("common.activationCodeDocs") }} -->
                  试运行，如有升级套餐需求，请添加微信: Steven-Zhu-WeChat
                </p>
              </div>
              <div class=" mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="handleActivation"
                >
                  <ArrowPathIcon
                    v-show="loading"
                    class="animate-spin h-5 w-5 mr-1 "
                  ></ArrowPathIcon>
                  {{ $t("common.activation") }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

