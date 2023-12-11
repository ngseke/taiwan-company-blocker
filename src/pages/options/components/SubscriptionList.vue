<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faEllipsisVertical, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { type Nullish } from '../../../types/Nullish'
import Checkbox from '../../../components/Checkbox.vue'
import { type SubscriptionResults, type Subscription } from '../../../modules/Subscription'
import { formatRelativeTime } from '../../../modules/date'

const props = defineProps<{
  modelValue?: Nullish<Subscription[]>
  subscriptionResults?: Nullish<SubscriptionResults>
}>()

const emit = defineEmits<{
  'update:modelValue': [list: Subscription[]]
  clickDetail: [index: number]
}>()

function getResult (url: string) {
  return props.subscriptionResults?.[url]
}

function getResultError (url: string) {
  const result = getResult(url)
  if (result?.status !== 'error') return
  return result.error
}

function getCheckboxValue (index: number) {
  return props.modelValue?.[index]?.isEnabled
}
function setCheckboxValue (index: number, isEnabled: boolean) {
  if (!props.modelValue) return
  const newList = [...props.modelValue]
  const newSubscription: Subscription = { ...newList[index], isEnabled }
  newList[index] = newSubscription
  emit('update:modelValue', newList)
}
</script>

<template>
  <div v-if="modelValue?.length" class="flex flex-col rounded-lg">
    <div class="flex min-w-[240px] flex-col gap-1 font-normal">
      <div
        v-for="(item, index) in modelValue"
        :key="index"
        class="flex w-full items-center rounded-lg text-start"
      >
        <div>
          <Checkbox
            :modelValue="getCheckboxValue(index)"
            @update:modelValue="setCheckboxValue(index, $event)"
          />
        </div>

        <div class="flex min-w-0 flex-1 flex-col px-2">
          <div class="truncate">
            {{ item.name }}
          </div>
          <div class="truncate text-xs text-neutral-500">
            <span v-if="!getResult(item.url)">
              -
            </span>
            <span v-else-if="getResult(item.url)?.status === 'success'">
              <FontAwesomeIcon :icon="faCheck" />
              {{ formatRelativeTime(getResult(item.url)?.timestamp) }}
            </span>
            <span v-else>
              <FontAwesomeIcon :icon="faTriangleExclamation" />
              載入失敗 ({{ getResultError(item.url) }})
            </span>
          </div>
        </div>

        <div class="ml-auto flex">
          <button
            class="h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:bg-neutral-500/10 active:bg-neutral-500/30 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            @click="$emit('clickDetail', index)"
          >
            <FontAwesomeIcon :icon="faEllipsisVertical" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
