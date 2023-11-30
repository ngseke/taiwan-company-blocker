<script setup lang="ts">
import { computed, ref } from 'vue'
import icon from '../../../assets/img/icon.png'
import { useChromeStorage } from '../../../composables/useChromeStorage'
import { DEBUGGER_ENABLED_STORAGE_KEY } from '../../../modules/storage'

const isDebuggerEnabled = useChromeStorage(DEBUGGER_ENABLED_STORAGE_KEY)
const count = ref(0)
const shouldShowDebuggerButton = computed(() => count.value >= 3)
</script>

<template>
  <div class="flex flex-col items-center py-3">
    <div
      class="h-28 w-28 bg-contain bg-center bg-no-repeat duration-1000"
      :style="{ backgroundImage: `url(${icon})` }"
      @click="count++"
    />
    <h1 class="text-lg font-bold leading-6">
      Taiwan Company Blocker
    </h1>

    <div v-if="shouldShowDebuggerButton" class="mt-4">
      <label>
        <input v-model="isDebuggerEnabled" type="checkbox">
        Enable Debugger
      </label>
    </div>
  </div>
</template>
