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
import {
  fetchCreateOrder,
  fetchCheckOrder,
  fetchManualCheckOrder,
} from "@/api";
import { parseTime } from "@/utils/format";
import { da } from "element-plus/es/locale";

interface UserPlan {
  plan_id: number;
  zh_name: string;
  zh_tw_name: string;
  en_name: string;
  usage_count: number;
  start_time: string;
  expire_time: string;
}
interface Plan {
  id: number;
  zh_name: string;
  list_price: number;
  price: number;
  zh_desc: string;
  en_name: string;
}

interface OrderInfo {
  order_id: number;
  qrcode: string;
  order_name: string;
  order_price: string;
}

interface OrderStatus {
  id: number;
  status: number;
  order_name: string;
  expire_time: string;
}
// Props
interface Props {
  isOpen: boolean;
  plan?: Plan;
  user_plan?: UserPlan;
}
const props = defineProps<Props>();

// Emit
interface Emit {
  (ev: "close"): void;
  (ev: "open"): void;
}
const emit = defineEmits<Emit>();

const loading = ref(false);
const order = ref<OrderInfo>();
let timer: string | number | NodeJS.Timer | undefined;

function closeModal() {
  emit("close");
}
function openModal() {
  emit("open");
}

async function handleCreateOrder() {
  try {
    if (!props.plan) {
      return;
    }
    loading.value = true;
    const { data } = await fetchCreateOrder<OrderInfo>(props.plan?.id);
    order.value = data;
  } catch (error: any) {
    console.log("error:", error);
    loading.value = false;
    ElMessage({
      type: "error",
      message: error.message || "订单创建失败",
    });
    return;
  }

  loading.value = false;
  // 检测支付结果
  handleCheckOrder();
}

async function handleCheckOrder() {
  timer = setInterval(async () => {
    if (!order.value) {
      return;
    }
    try {
      const { data } = await fetchCheckOrder<OrderStatus>(order.value.order_id);
      console.log("check order status", data);
      // 支付成功
      if (data.status == 1) {
        // 停止定时器
        clearInterval(timer);
        order.value = undefined;
        // 成功激活
        confetti({
          particleCount: 360,
          spread: 360,
        });
        ElMessage({
          type: "success",
          message: "支付成功",
        });
        // 关闭对话框
        closeModal();
      }
      // 支付超时
      if (data.status == -1) {
        // 停止定时器
        clearInterval(timer);
        order.value = undefined;
        ElMessage({
          type: "error",
          message: "订单超时，请重新发起订单",
        });
        // 关闭对话框
        closeModal();
      }
      // 订单超时
      if (new Date(data.expire_time) <= new Date()) {
        // 停止定时器
        clearInterval(timer);
        ElMessage({
          type: "error",
          message: "订单超时，请重新发起订单",
        });
        // 关闭对话框
        closeModal();
      }
    } catch (error: any) {
      console.log("error:", error);
      // 停止定时器
      clearInterval(timer);
      order.value = undefined;
      // 关闭对话框
      closeModal();
    }
  }, 10000);
}

async function handleManualCheckOrder() {
  try {
    if (!order.value) {
      return;
    }
    const { data } = await fetchManualCheckOrder<OrderStatus>(
      order.value.order_id
    );
    // 支付成功
    if (data.status == 1) {
      // 停止定时器
      if (timer) {
        clearInterval(timer);
      }
      // 成功激活
      confetti({
        particleCount: 360,
        spread: 360,
      });
      ElMessage({
        type: "success",
        message: "支付成功",
      });
      order.value = undefined;
      // 关闭对话框
      closeModal();
      return;
    }
    // 支付超时
    if (data.status == -1) {
      // 停止定时器
      if (timer) {
        clearInterval(timer);
      }
      order.value = undefined;
      ElMessage({
        type: "error",
        message: "订单超时，请重新发起订单",
      });
      // 关闭对话框
      closeModal();
      return;
    }
    ElMessage({
      type: "error",
      message: "支付状态检查失败，请稍后再试",
    });
  } catch (error: any) {
    console.log("error:", error);
    ElMessage({
      type: "error",
      message: error.message || "支付状态检查失败",
    });
    return;
  }
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
                class="text-xl font-medium leading-6 text-gray-900"
              >{{ order ? $t("common.pay") : $t("common.subscribe") }}
              </DialogTitle>
              <div v-if="!order">
                <div class="mt-2">
                  <div v-if="props.user_plan">
                    <span class="text-base text-gray-700">
                      当前订阅信息
                    </span>
                    <p class="text-sm text-gray-500">订阅名称: {{ props.user_plan.zh_name }}</p>
                    <p class="text-sm text-gray-500">订阅包含请求数/天: {{ props.user_plan.usage_count }}</p>
                    <p class="text-sm text-gray-500">订阅生效时间: {{ props.user_plan.start_time }}</p>
                    <p class="text-sm text-gray-500">订阅过期时间: {{ props.user_plan.expire_time }}</p>
                  </div>
                  <div v-else>
                    <span class="text-base text-gray-700">
                      当前订阅信息
                    </span>
                    <p class="text-sm text-gray-500">订阅名称: 免费</p>
                    <p class="text-sm text-gray-500">订阅包含请求数/天: 25</p>
                  </div>
                </div>
                <div class="mt-4">
                  <button
                    v-if="props.plan?.en_name != 'Free'"
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="handleCreateOrder"
                  >
                    <ArrowPathIcon
                      v-show="loading"
                      class="animate-spin h-5 w-5 mr-1 "
                    ></ArrowPathIcon>
                    {{ $t("common.newSubscribe") }}
                  </button>
                </div>
              </div>
              <div v-else>

                <div class="mt-2">
                  <!-- 显示支付二维码 -->
                  <div class="pay-qrcon">
                    <div class="flex flex-col items-center justify-center">
                      <div class="flex flex-initial items-center justify-center">
                        <svg
                          class="w-12 h-12"
                          viewBox="0 0 1024 1024"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="100"
                          height="100"
                        >
                          <path
                            d="M373.64622222 629.76c-4.66488889 2.38933333-9.44355555 3.52711111-15.24622222 3.52711111-12.97066667 0-23.552-7.05422222-29.46844445-17.63555556L326.54222222 610.98666667l-92.95644444-202.52444445c-1.13777778-2.38933333-1.13777778-4.66488889-1.13777778-7.05422222 0-9.44355555 7.05422222-16.49777778 16.49777778-16.49777778 3.52711111 0 7.05422222 1.13777778 10.58133333 3.52711111l109.45422222 77.71022222c8.192 4.66488889 17.63555555 8.192 28.21688889 8.192 5.91644445 0 11.71911111-1.13777778 17.63555556-3.5271111l513.25155555-228.352C836.26666667 134.144 684.48711111 63.488 512.56888889 63.488c-280.12088889 0-508.47288889 189.55377778-508.47288889 423.70844445 0 127.08977778 68.26666667 242.46044445 175.33155555 320.17066666 8.192 5.91644445 14.10844445 16.49777778 14.10844445 27.07911111 0 3.52711111-1.13777778 7.05422222-2.38933333 10.58133333-8.192 31.744-22.41422222 83.62666667-22.41422222 85.90222223-1.13777778 3.52711111-2.38933333 8.192-2.38933334 12.97066667 0 9.44355555 7.05422222 16.49777778 16.49777778 16.49777777 3.52711111 0 7.05422222-1.13777778 9.44355556-3.52711111l110.592-64.73955556c8.192-4.66488889 17.63555555-8.192 27.0791111-8.192 4.66488889 0 10.58133333 1.13777778 15.24622223 2.38933334 51.76888889 15.24622222 108.31644445 23.552 166.00177777 23.552 280.12088889 0 508.47288889-189.55377778 508.4728889-423.70844444 0-70.656-21.16266667-137.67111111-57.68533334-196.608l-584.81777778 337.80622222-3.52711111 2.38933333z"
                            fill="#09BB07"
                          >
                          </path>
                        </svg>

                        <span class="pl-3 text-gray-600">微信支付</span>
                      </div>

                      <div class="mt-4 text-gray-400">{{ order.order_name }}</div>
                      <div class="mt-4">
                        <span class="text-sm">￥</span>
                        <span class="text-xl font-medium leading-6">{{ order.order_price }}</span>
                      </div>
                      <div class="w-3/5 h-3/5">
                        <img
                          :src="order.qrcode"
                          alt="pay-qrcode"
                        >
                      </div>
                      <div>
                        <div class="countdown">
                          <span>05:00</span>
                        </div>
                        
                      </div>
                    </div>

                    <div class="mt-4">
                      <div class="text-[#ff6f07] text-center">请扫码后支付{{ order.order_price }}元，为了确保支付成功，请注意付款金额请勿出错</div>
                    </div>
                  </div>

                </div>
                <div class="mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-200 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="handleManualCheckOrder"
                  >
                    <ArrowPathIcon
                      v-show="loading"
                      class="animate-spin h-5 w-5 mr-1 "
                    ></ArrowPathIcon>
                    {{ $t("common.paid") }}
                  </button>
                </div>
              </div>

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

