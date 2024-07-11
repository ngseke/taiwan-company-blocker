<script setup lang="ts">
import { cn } from '../../../modules/cn'

defineProps<{
  modelValue?: string
  list?: Array<{ label: string, value: string }>
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <button
      v-for="(item, index) in list"
      :key="index"
      :class="cn('rounded-lg py-4 px-5 font-bold text-left', {
        'bg-neutral-900': modelValue === item.value,
        'hover:bg-neutral-900/30': modelValue !== item.value,
      })"
      type="button"
      @click="$emit('update:modelValue', item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>
