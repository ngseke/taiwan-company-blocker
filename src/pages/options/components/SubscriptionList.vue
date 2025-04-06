<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faEllipsisVertical, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { type Nullish } from '../../../types/Nullish'
import Checkbox from '../../../components/Checkbox.vue'
import { type SubscriptionResults, type Subscription } from '../../../modules/Subscription'
import { useTime } from '../../../composables/useTime'

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
const { getFormattedTime, getRelativeTime } = useTime()
</script>

<template>
  <div v-if="modelValue?.length" class="flex flex-col rounded-lg">
    <div class="flex min-w-[240px] flex-col gap-1 font-normal">
      <button
        v-for="(item, index) in modelValue"
        :key="index"
        class="flex w-full items-center rounded-lg p-1 text-start hover:bg-neutral-800/50"
        type="button"
        @click="$emit('clickDetail', index)"
      >
        <div>
          <Checkbox
            :modelValue="getCheckboxValue(index)"
            @click.stop
            @update:modelValue="setCheckboxValue(index, $event)"
          />
        </div>

        <div class="flex min-w-0 flex-1 flex-col px-2">
          <div
            class="truncate"
            :class="{
              'text-red-500': getResult(item.url)?.status === 'error'
            }"
          >
            {{ item.name }}
          </div>
          <div class="truncate text-xs text-neutral-500">
            <span v-if="!getResult(item.url)">
              -
            </span>
            <span
              v-else-if="getResult(item.url)?.status === 'success'"
              :title="getFormattedTime(getResult(item.url)?.timestamp)"
            >
              <FontAwesomeIcon :icon="faCheck" />
              {{ getRelativeTime(getResult(item.url)?.timestamp) }}
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
            @click.stop="$emit('clickDetail', index)"
          >
            <FontAwesomeIcon :icon="faEllipsisVertical" />
          </button>
        </div>
      </button>
    </div>
  </div>
</template>
