<script setup lang="ts">
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

withDefaults(defineProps<{
  block?: boolean
  disabled?: boolean
  color?: 'default' | 'primary'
  loading?: boolean
}>(), {
  color: 'default',
})
</script>

<template>
  <!-- https://www.material-tailwind.com/docs/html/button -->

  <button
    class="relative select-none whitespace-nowrap rounded-lg px-4 py-2 font-sans text-xs font-bold uppercase text-neutral-200 shadow-md transition-all hover:shadow-lg focus:opacity-80 focus:shadow-none active:opacity-80 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    :class="{
      'bg-neutral-800 shadow-neutral-800/20 hover:shadow-neutral-800/40': color === 'default',
      'bg-red-500 shadow-red-500/20 hover:shadow-red-500/40': color === 'primary',
      'w-full': block,
    }"
    :disabled="disabled"
    type="button"
  >
    <span
      v-if="loading"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <FontAwesomeIcon :icon="faCircleNotch" spin />
    </span>
    <span class="inline-flex" :class="loading ? 'opacity-0' : ''">
      <slot />
    </span>
  </button>
</template>
