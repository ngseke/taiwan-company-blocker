<script setup lang="ts">
import { nanoid } from 'nanoid'
import { type Nullish } from '../types/Nullish'

const props = defineProps<{
  label?: string
  modelValue?: Nullish<boolean>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const handleClick = async () => {
  await new Promise((resolve) => setTimeout(resolve, 0))
  emit('update:modelValue', !props.modelValue)
}

const id = nanoid()
</script>

<template>
  <!-- https://www.material-tailwind.com/docs/html/checkbox -->

  <div class="inline-flex items-center">
    <label
      class="relative flex cursor-pointer items-center rounded-full p-3"
    >
      <input
        :id="id"
        :checked="modelValue ?? false"
        class="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-neutral-800 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-neutral-500 before:opacity-0 before:transition-opacity before:content-['_'] checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
        type="checkbox"
        @click.prevent="handleClick"
      >
      <div class="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
        <svg
          class="h-3.5 w-3.5 fill-current stroke-current stroke-1"
          viewBox="0 0 20 20"
        >
          <path
            clip-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </label>

    <label
      v-if="$slots.default"
      class="ml-1 mt-px cursor-pointer select-none"
      :for="id"
    >
      <slot />
    </label>
  </div>
</template>
