<script setup lang="ts">
import { nanoid } from 'nanoid'

defineProps<{
  modelValue: boolean
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const id = nanoid()
</script>

<template>
  <label class="flex cursor-pointer select-none items-center" :for="id">
    <div class="relative">
      <input
        :id="id"
        :checked="modelValue"
        class="peer sr-only"
        type="checkbox"
        @click.prevent="$emit('update:modelValue', !modelValue)"
      >
      <div
        class="h-5 w-14 rounded-full transition-colors duration-300"
        :class="modelValue ? 'bg-red-500' : 'bg-neutral-700'"
      />
      <div
        class="absolute -top-1 left-0 flex h-7 w-7 items-center justify-center rounded-full bg-neutral-300 transition duration-300 peer-checked:translate-x-full"
      >
        <span
          class="h-4 w-4 rounded-full transition-colors duration-300"
          :class="modelValue ? 'bg-red-500' : 'bg-neutral-400'"
        />
      </div>
    </div>
  </label>
</template>
