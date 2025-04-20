<script setup lang="ts">
import { computed } from 'vue'
import { emitter, OPEN_SETTING } from '../modules/emitter'
import { type PlatformName } from '../../../../schemas/platformName'
import { detectPagePlatform } from '../modules/platform'
import { cn } from '../../../modules/cn'

function openSetting () {
  emitter.emit(OPEN_SETTING)
}

const positionClassName = computed(() => {
  const map: Record<PlatformName, string> = {
    cake: 'top-[76px] right-[16px]',
    yourator: 'top-[80px] right-[16px]',
    104: 'top-[62px] right-[16px]',
    518: 'top-[100px] right-[16px]',
    1111: 'top-[80px] right-[16px]',
    chickpt: 'top-[80px] right-[16px]',
    meetJobs: 'top-[80px] right-[16px]',
    taiwanJobs: 'top-[64px] right-[16px]',
  }

  const platform = detectPagePlatform()
  if (!platform) return null

  return map[platform]
})
</script>

<template>
  <button
    :class="cn('group fixed z-[20000000000]', positionClassName)"
    type="button"
    @click="openSetting"
  >
    <div
      class="h-10 w-10 bg-contain bg-center bg-no-repeat drop-shadow-[0_4px_8px_rgba(0,0,0,.3)] duration-200 group-hover:brightness-125 group-active:scale-90"
      :style="{ backgroundImage: 'var(--taiwan-company-blocker-icon)',
      }"
    />
  </button>
</template>
