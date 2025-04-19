<script setup lang="ts">
import { computed, ref } from 'vue'
import icon from '../../../assets/img/icon.png'
import { useChromeStorage } from '../../../composables/useChromeStorage'
import { DEBUGGER_ENABLED_STORAGE_KEY } from '../../../modules/storage'
import Button from '../../../components/Button.vue'
import Checkbox from '../../../components/Checkbox.vue'

const isDebuggerEnabled = useChromeStorage(DEBUGGER_ENABLED_STORAGE_KEY)
const count = ref(0)
const shouldShowDebuggerButton = computed(() => count.value >= 3 || isDebuggerEnabled.value)

async function handleClickPrintStorage () {
  // eslint-disable-next-line no-console
  console.info('local storage', await chrome.storage.local.get(null))
  // eslint-disable-next-line no-console
  console.info('sync storage', await chrome.storage.sync.get(null))
}
</script>

<template>
  <div class="flex flex-col items-center py-3">
    <div
      class="h-28 w-28 bg-contain bg-center bg-no-repeat duration-1000"
      :style="{ backgroundImage: `url(${icon})` }"
      @click="count++"
    />
    <h1 class="text-center text-lg font-bold leading-6">
      Taiwan Company Blocker
    </h1>

    <div v-if="shouldShowDebuggerButton" class="mt-4 flex w-full flex-col items-start gap-2">
      <Checkbox v-model="isDebuggerEnabled">
        Enable Debugger
      </Checkbox>

      <Button
        type="button border"
        @click="handleClickPrintStorage"
      >
        Print Storage
      </Button>
    </div>
  </div>
</template>
