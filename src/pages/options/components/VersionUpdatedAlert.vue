<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useVersion } from '../../../composables/useVersion'

const version = `v${APP_VERSION}`

const { isUpdated, updatePreviousVersion } = useVersion()

function handleDismiss () {
  updatePreviousVersion()
}
</script>

<template>
  <div
    v-if="isUpdated"
    class="rounded-lg bg-neutral-800 p-3 py-2 duration-200"
  >
    <div class="flex gap-2">
      <div class="flex-1">
        <FontAwesomeIcon class="mr-1" :icon="faCheck" />
        已成功更新至 <span class="font-mono">{{ version }}</span>。

        <a
          class="underline hover:text-red-500"
          href="https://github.com/ngseke/taiwan-company-blocker/releases"
          target="_blank"
        >
          查看版本記錄
        </a>
      </div>

      <button
        class="inline-flex items-center justify-center p-1 hover:text-red-500"
        type="button"
        @click="handleDismiss"
      >
        <FontAwesomeIcon :icon="faXmark" />
      </button>
    </div>
  </div>
</template>
