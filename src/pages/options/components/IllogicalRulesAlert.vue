<script setup lang="ts">
import Code from './Code.vue'

defineProps<{
  show?: boolean
}>()
</script>

<template>
  <Transition enterFromClass="opacity-0 translate-y-1.5">
    <div v-if="show" class="rounded-lg bg-amber-500 p-3 py-2 text-neutral-900 duration-200">
      <svg
        class="mr-1.5 inline-block align-text-bottom"
        fill="currentColor"
        height="16"
        viewBox="0 0 512 512"
        width="16"
      ><path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" /></svg>

      在規則中偵測到了 <Code>*</Code> 或 <Code>**</Code>，這將會封鎖<b>所有</b>職缺或公司。
    </div>
  </Transition>
</template>
