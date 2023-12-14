<script setup lang="ts">
import { nanoid } from 'nanoid'

defineProps<{
  label?: string
  modelValue?: boolean

}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const id = nanoid()
</script>

<template>
  <!-- https://www.material-tailwind.com/docs/html/switch -->

  <div class="inline-flex items-center">
    <div class="relative inline-block h-4 w-8 cursor-pointer rounded-full">
      <input
        :id="id"
        :checked="modelValue"
        class="peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full bg-neutral-700 transition-colors duration-300 checked:bg-red-500 peer-checked:border-red-500 peer-checked:before:bg-red-500"
        type="checkbox"
        @click.prevent="$emit('update:modelValue', !modelValue)"
      >
      <label
        class="absolute -left-1 top-2/4 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-neutral-700 bg-white shadow-md transition-all duration-300 before:absolute before:left-2/4 before:top-2/4 before:block before:h-10 before:w-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-neutral-500 before:opacity-0 before:transition-opacity before:content-['_'] hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-red-500 peer-checked:before:bg-red-500"
        :for="id"
      >
        <div
          class="left-2/4 top-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full p-5"
        />
      </label>
    </div>
    <label
      class="ml-4 mt-px cursor-pointer select-none"
      :for="id"
    >
      <slot />
    </label>
  </div>
</template>
