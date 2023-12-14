<script setup lang="ts" generic="Value">
import { nanoid } from 'nanoid'
import { computed } from 'vue'

const props = defineProps<{
  label?: string
  modelValue?: Value
  value?: Value
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Value]
}>()

const id = nanoid()
const isChecked = computed(() => props.modelValue === props.value)

function handleChange () {
  if (props.value == null) return
  emit('update:modelValue', props.value)
}
</script>

<template>
  <!-- https://www.material-tailwind.com/docs/html/radio-button -->

  <div class="inline-flex items-center">
    <label
      class="relative flex cursor-pointer items-center rounded-full p-3"
      data-ripple-dark="true"
      for="html"
    >
      <input
        :id="id"
        :checked="isChecked"
        class="peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-neutral-700 text-red-500 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:bg-neutral-500 before:opacity-0 before:transition-opacity before:content-['_'] checked:border-red-500 checked:before:bg-red-500 hover:before:opacity-10"
        name="type"
        type="radio"
        @click.prevent="handleChange"
      >
      <div class="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-red-500 opacity-0 transition-opacity peer-checked:opacity-100">
        <svg class="h-3.5 w-3.5 fill-current" viewBox="0 0 16 16">
          <circle
            cx="8"
            cy="8"
            data-name="ellipse"
            r="8"
          />
        </svg>
      </div>
    </label>
    <label
      class="ml-1 mt-px cursor-pointer select-none"
      :for="id"
    >
      <slot />
    </label>
  </div>
</template>
