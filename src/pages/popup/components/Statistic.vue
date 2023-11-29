<script setup lang="ts">
defineProps<{
  name: string
  value: unknown
  muted?: boolean
}>()
</script>

<template>
  <div class="flex flex-col">
    <div class="text-neutral-500">{{ name }}</div>
    <div
      class="text-xl font-medium"
      :class="{ ' text-neutral-600': muted }"
    >
      {{ value ?? '-' }}
    </div>
  </div>
</template>
