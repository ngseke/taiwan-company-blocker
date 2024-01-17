<script setup lang="ts">
withDefaults(defineProps<{
  color?: 'default' | 'primary'
}>(), {
  color: 'default',
})
</script>

<template>
  <span
    class="inline-flex min-h-[1rem] min-w-[1rem] items-center justify-center whitespace-nowrap rounded-full px-1.5 py-0.5 text-xs font-bold leading-none"
    :class="{
      'bg-neutral-700': color === 'default',
      'bg-red-700': color === 'primary',
    }"
  >
    <slot />
  </span>
</template>
