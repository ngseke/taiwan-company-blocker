<script setup lang="ts">
import icon from '../../../assets/img/icon.png'
import EnableSwitch from './EnableSwitch.vue'
import { useIsEnabled } from '../../../composables/useIsEnabled'

const { isEnabled } = useIsEnabled()
</script>

<template>
  <div class="flex h-full items-stretch overflow-auto">
    <div class="m-6 mr-4 flex flex-col items-center gap-5 border-r border-neutral-800 pr-4">
      <img
        v-if="isEnabled != null"
        alt="Taiwan Company Blocker"
        class="h-auto w-20 select-none duration-1000"
        :class="{ 'grayscale': !isEnabled }"
        :src="icon"
      >
      <div>
        <EnableSwitch v-if="isEnabled != null" v-model="isEnabled" />
      </div>
    </div>

    <div class="h-full flex-1 overflow-auto py-6 pr-6">
      <h1 class="text-lg font-bold leading-6">
        <a href="#" @click.stop>Taiwan Company Blocker</a>
      </h1>
      <slot />
    </div>
  </div>
</template>
