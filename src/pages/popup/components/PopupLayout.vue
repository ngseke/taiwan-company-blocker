<script setup lang="ts">
import icon from '../../../assets/img/icon.png'
import EnableSwitch from './EnableSwitch.vue'
import { useChromeStorage } from '../../../composables/useChromeStorage'
import { ENABLED_STORAGE_KEY } from '../../../modules/storage'

const isEnabled = useChromeStorage(ENABLED_STORAGE_KEY)

</script>

<template>
  <div class="flex h-full items-stretch overflow-auto">
    <div class="m-6 mr-4 flex flex-col items-center gap-6 border-r border-neutral-800 pr-4">
      <div
        v-if="isEnabled != null"
        class="h-20 w-20 bg-contain bg-center bg-no-repeat duration-1000"
        :class="{ 'grayscale': !isEnabled }"
        :style="{ backgroundImage: `url(${icon})` }"
      />
      <div>
        <EnableSwitch v-if="isEnabled != null" v-model="isEnabled" />
      </div>
    </div>

    <div class="h-full flex-1 overflow-auto pr-6 pt-6">
      <slot />
    </div>
  </div>
</template>
