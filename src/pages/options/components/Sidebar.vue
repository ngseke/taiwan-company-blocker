<script setup lang="ts">
import { OPTIONS_TEST_IDS } from '../../../modules/constants'
import { RouterLink } from 'vue-router'

defineProps<{
  list?: Array<{ label: string, value: string }>
}>()
</script>

<template>
  <div
    class="flex flex-col gap-y-2"
    :data-testid="OPTIONS_TEST_IDS.sidebar"
  >
    <RouterLink
      v-for="item in list"
      :key="item.value"
      activeClass="bg-neutral-900 hover:!bg-neutral-900"
      class="rounded-lg px-5 py-4 text-left font-bold
      hover:bg-neutral-900/30"
      :data-testid="item.value"
      :to="item.value"
    >
      {{ item.label }}
    </RouterLink>
  </div>
</template>
