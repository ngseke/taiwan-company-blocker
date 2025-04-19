<script setup lang="ts">
import { type IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

withDefaults(defineProps<{
  icon: IconDefinition
  active?: boolean
}>(), {})
</script>

<template>
  <div
    class="flex w-full items-center gap-2 rounded-lg p-2 text-start"
  >
    <div
      class="flex w-8 justify-center"
      :class="{ 'text-green-600': active }"
    >
      <FontAwesomeIcon :icon="icon" />
    </div>

    <div class="flex min-w-0 flex-1 flex-col px-2">
      <div
        class="truncate"
        :class="{ 'font-bold text-green-600': active }"
      >
        <slot name="title" />
      </div>

      <div class="truncate text-xs text-neutral-500">
        <slot name="content" />
      </div>
    </div>

    <div class="ml-auto flex">
      <slot name="action" />
    </div>
  </div>
</template>
