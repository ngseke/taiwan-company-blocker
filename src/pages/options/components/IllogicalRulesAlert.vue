<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Code from './Code.vue'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

defineProps<{
  show?: boolean
}>()
</script>

<template>
  <Transition enterFromClass="opacity-0 translate-y-1.5">
    <div v-if="show" class="rounded-lg bg-amber-500 p-3 py-2 text-neutral-900 duration-200">
      <FontAwesomeIcon :icon="faExclamationTriangle" />

      在規則中偵測到了 <Code>*</Code> 或 <Code>**</Code>，這將會封鎖<b>所有</b>職缺或公司。
    </div>
  </Transition>
</template>
