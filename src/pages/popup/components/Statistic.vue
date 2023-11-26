<script setup lang="ts">
defineProps<{
  name: string
  value: unknown
}>()
</script>

<template>
  <div class="flex flex-col">
    <div class="text-neutral-400 ">{{ name }}</div>
    <div class="text-xl font-medium">{{ value ?? '-' }}</div>
  </div>
</template>
