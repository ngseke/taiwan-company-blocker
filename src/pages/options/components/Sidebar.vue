<script setup lang="ts">
import { cn } from '../../../modules/cn'
import { OPTIONS_TEST_IDS } from '../../../modules/constants'

defineProps<{
  modelValue?: string
  list?: Array<{ label: string, value: string }>
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div
    class="flex flex-col gap-y-2"
    :data-testid="OPTIONS_TEST_IDS.sidebar"
  >
    <button
      v-for="item in list"
      :key="item.value"
      :class="cn('rounded-lg py-4 px-5 font-bold text-left', {
        'bg-neutral-900': modelValue === item.value,
        'hover:bg-neutral-900/30': modelValue !== item.value,
      })"
      :data-testid="item.value"
      type="button"
      @click="$emit('update:modelValue', item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>
