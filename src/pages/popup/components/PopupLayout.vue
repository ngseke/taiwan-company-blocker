<script setup lang="ts">
import icon from '../../../assets/img/icon.png'
import EnableSwitch from './EnableSwitch.vue'
import { useChromeStorage } from '../../../composables/useChromeStorage'
import { ENABLED_STORAGE_KEY } from '../../../modules/storage'
import OptionsButton from './OptionsButton.vue'
import { POPUP_TEST_IDS } from '../../../modules/constants'

const isEnabled = useChromeStorage(ENABLED_STORAGE_KEY)

function openOptions () {
  chrome.runtime.openOptionsPage()
}
</script>

<template>
  <div class="flex h-full items-stretch overflow-auto">
    <div class="m-6 mr-4 flex flex-col items-center border-r border-neutral-800 pr-4">
      <div
        v-if="isEnabled != null"
        class="mb-4 h-20 w-20 bg-contain bg-center bg-no-repeat duration-[1500ms]"
        :class="{ 'grayscale': !isEnabled }"
        :style="{ backgroundImage: `url(${icon})` }"
      />
      <div>
        <EnableSwitch
          v-if="isEnabled != null"
          v-model="isEnabled"
          :data-testid="POPUP_TEST_IDS.enableSwitch"
        />
      </div>
      <div class="flex flex-1 flex-col justify-end">
        <OptionsButton @click="openOptions" />
      </div>
    </div>

    <div class="h-full flex-1 overflow-auto py-6 pr-6">
      <slot />
    </div>
  </div>
</template>
