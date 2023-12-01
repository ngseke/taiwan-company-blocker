<script setup lang="ts">
import { type Nullish } from '../../../types/Nullish'
import SearchIcon from './SearchIcon.vue'

const props = defineProps<{
  href?: Nullish<string>
  disabled?: boolean
}>()

function handleClick (event: Event) {
  if (props.disabled) {
    event.preventDefault()
  }
}
</script>

<template>
  <a
    class="inline-flex items-center gap-1"
    :class="{
      'cursor-default opacity-50': disabled,
      'hover:underline': !disabled,
    }"
    :href=" href ?? undefined"
    target="_blank"
    @click="handleClick"
  >
    <SearchIcon :size="14" />
    <slot />
  </a>
</template>
