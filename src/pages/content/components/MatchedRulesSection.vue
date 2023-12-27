<script setup lang="ts">
import { type RuleType } from '../../../modules/rule'
import { type Nullish } from '../../../types/Nullish'
import { type MatchedRulesWithMeta } from '../composables/useMatchedRules'
import Badge from './Badge.vue'
import EditButton from './EditButton.vue'

defineProps<{
  matchedRules?: Nullish<MatchedRulesWithMeta>
}>()

defineEmits<{
  'edit': [type: RuleType, rule: string]
}>()
</script>

<template>
  <div
    v-if="matchedRules?.length"
    class="rounded-lg bg-red-500/10 px-3 py-2"
  >
    <h2 class="mb-2 font-bold">已匹配以下規則</h2>
    <ol class="space-y-1 pb-1 text-xs marker:text-neutral-500">
      <li
        v-for="(item, index) in matchedRules"
        :key="index"
        class="group flex"
      >
        <span class="flex-1 space-x-2 truncate">
          <Badge>{{ item.groupName }}</Badge>
          <code class="text-red-500" :title="item.raw">
            {{ item.raw }}
          </code>
        </span>

        <span
          v-if="item.ruleSource === 'custom'"
          class="flex w-0 flex-none overflow-hidden focus-within:w-auto group-hover:w-auto"
        >
          <EditButton @click="$emit('edit', item.ruleType, item.raw)" />
        </span>
      </li>
    </ol>
  </div>
</template>
