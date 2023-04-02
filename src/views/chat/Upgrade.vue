<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { CheckIcon } from '@heroicons/vue/20/solid'

import { fetchPricingPlan } from '@/api'
import { da } from 'element-plus/es/locale'


interface Feature {
  zh: Array<string>
}

interface Plan {
  id: number,
  zh_name: string,
  list_price: number,
  price: number
  zh_desc: string,
  features: Feature
}

interface PlanResponse {
  billing: Array<string>;
  按月计费: Array<Plan>;
  按年计费: Array<Plan>;
}

const pricingPlans = ref<PlanResponse>()
const activePlans = ref<Array<Plan>>()
const active = ref<string>('')

// 获取定价计划
async function fetchData() {
  try {
    const { data } = await fetchPricingPlan<PlanResponse>()
    active.value = data.billing[0]
    pricingPlans.value = data
    activePlans.value = data.按月计费

  } catch (error) {
    //
  }
}

function changeActive(billing: string) {
  active.value = billing
  if (!pricingPlans.value) {
    return
  }
  if (billing === '按月计费') {
    activePlans.value = pricingPlans.value.按月计费
  } else {
    activePlans.value = pricingPlans.value.按年计费
  }

}
onMounted(() => {
  fetchData();
});
</script>


<template>
  <div class="bg-white dark:bg-[#252529] h-screen">
    <div class="mx-auto max-w-7xl py-4 px-6 lg:px-8">
      <div class="sm:align-center sm:flex sm:flex-col">
        <h1 class="text-5xl font-bold tracking-tight sm:text-center">{{ $t('common.pricingPlans') }}</h1>
        <!-- <p class="mt-5 text-xl text-gray-500 sm:text-center">Start building for free, then add a site plan to go live. Account plans unlock additional features.</p> -->
        <div class="relative mt-6 flex self-center rounded-lg bg-gray-100 p-0.5 sm:mt-8 dark:bg-[#161618]">
          <button v-for="item in pricingPlans?.billing" :key="item" @click="changeActive(item)"
            :class="active == item ? 'border-gray-200 bg-white shadow-sm dark:bg-[#252529]' : 'border border-transparent dark:bg-[#161618]'"
            class="relative mr-0.5 w-1/2 whitespace-nowrap rounded-md  py-2 text-sm font-medium  focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-auto sm:px-8"
            type="button">
            {{ item }}
          </button>
        </div>
      </div>
      <div
        class="mt-12 space-y-4 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
        <div v-for="plan in activePlans" :key="plan.zh_name"
          class="divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm dark:bg-[#161618]">
          <div class="p-6">
            <h2 class="text-lg font-medium leading-6 ">{{ plan.zh_name }}</h2>
            <p class="mt-4 text-sm text-gray-500">{{ plan.zh_desc }}</p>
            <p class="mt-8">
              <span class="text-4xl font-bold tracking-tight ">¥{{ plan.price }}</span>

            </p>
            <div
              class="mt-8 block w-full rounded-md border border-gray-800 bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900">
              {{ $t('common.select') }}
            </div>
          </div>
          <div class="px-6 pt-6 pb-8">
            <h3 class="text-sm font-medium ">{{ $t('common.included') }}</h3>
            <ul role="list" class="mt-6 space-y-4">
              <li v-for="feature in plan.features.zh" :key="feature" class="flex space-x-3">
                <CheckIcon class="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                <span class="text-sm text-gray-500">{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>