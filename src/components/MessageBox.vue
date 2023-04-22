<script lang="ts" setup>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

// Props
interface Props {
  isOpen: boolean
}
const props = defineProps<Props>()

// Emit
interface Emit {
  (ev: 'close'): void
}
const emit = defineEmits<Emit>()

function closeModal() {
  emit('close')
}
</script>

<template>
  <TransitionRoot appear :show="props.isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
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
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ $t('common.welcome') }}
              </DialogTitle>

              <div class="mt-4">
                <article class="prose prose-slate">
                  <h4 class="mt-2">SmartChat 1.2发布🎉</h4>
                  <p class="text-xs leading-none my-2.5">
                    非常高兴，经过半个多月的不断优化、迭代，成功推出<strong>1.2</strong>版本
                  </p>
                  <p class="text-xs leading-none my-2.5">
                    该版本修复若干BUG，提升系统稳定性与用户体验！
                  </p>
                  <p class="text-xs leading-none my-2.5">
                    由于目前项目是利用业务时间维护的，所以会有疏漏、错误、体验不佳等问题。
                  </p>
                  <p class="text-xs leading-none my-2.5">
                    如果给你带来了不好的体验，作者感到非常抱歉！作者会继续不断优化、完善。
                  </p>
                  <p class="text-xs leading-none my-2.5">
                    如果您有任何跟AI相关的信息欢迎提供，有任何建议或意见可以使用<a
                      href="mailto:steven.zhu.email@gmail.com"
                      >邮件</a
                    >与我联系。
                  </p>
                  <h4 class="mt-2">初衷🚀</h4>
                  <p class="text-xs leading-none my-2.5">
                    也希望你能善用该工具提升生活中、工作中的生产力，多留出更多时间给自己。
                  </p>
                  <p class="text-xs leading-none my-2.5">
                    希望AI🤖能提高社会的生产力，<strong>四天工作制</strong>早点到来，每个人都能空下来做自己想做的事情。
                  </p>
                  <h4 class="mt-2">免责声明</h4>
                  <p class="text-xs">
                    使用本网站提供的服务，视为您接受并同意<router-link
                      to="/disclaimer"
                      >《免责声明》</router-link
                    >全部内容。🙏
                  </p>
                </article>
                <button
                  type="button"
                  class="mt-5 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  {{ $t('common.gotIt') }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
