<script setup lang="ts">
import { type RuleType } from '../../../modules/rule'
import { type Nullish } from '../../../types/Nullish'
import { type MatchedRulesWithMeta } from '../composables/useMatchedRules'
import Badge from './Badge.vue'
import EditIcon from './EditIcon.vue'

defineProps<{
  matchedRules?: Nullish<MatchedRulesWithMeta>
}>()

const emit = defineEmits<{
  'edit': [type: RuleType, rule: string]
}>()

function handleClick (item: MatchedRulesWithMeta[number]) {
  if (item.ruleSource !== 'custom') return
  emit('edit', item.ruleType, item.raw)
}
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
        <span class="inline-flex flex-1 space-x-2 overflow-hidden">
          <span class="flex-none">
            <Badge>{{ item.groupName }}</Badge>
          </span>
          <button
            class="group inline-flex space-x-1 overflow-hidden enabled:hover:underline"
            :disabled="item.ruleSource !== 'custom'"
            :title="item.raw"
            type="button"
            @click="handleClick(item)"
          >
            <span class="truncate font-mono text-red-500">
              {{ item.raw }}
            </span>

            <span
              v-if="item.ruleSource === 'custom'"
              class="w-0 flex-none overflow-hidden focus-within:w-auto group-hover:w-auto"
            >
              <EditIcon />
            </span>
          </button>
        </span>
      </li>
    </ol>
  </div>
</template>
