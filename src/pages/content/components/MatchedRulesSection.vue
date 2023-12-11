<script setup lang="ts">
import { type Nullish } from '../../../types/Nullish'
import Badge from './Badge.vue'

defineProps<{
  matchedRules?: Nullish<any[]>
}>()
</script>

<template>
  <div
    v-if="matchedRules?.length"
    class="rounded-lg bg-red-500/10 px-3 py-2"
  >
    <h2 class="mb-2 font-bold">已匹配以下規則</h2>
    <ol class="list-inside list-decimal space-y-1 pb-1 text-xs marker:text-neutral-500">
      <li
        v-for="(item, index) in matchedRules"
        :key="index"
        class="space-x-2 truncate"
      >
        <Badge>{{ item.groupName }}</Badge>
        <span class="text-red-500">
          {{ item.pattern }}
        </span>
      </li>
    </ol>
  </div>
</template>
