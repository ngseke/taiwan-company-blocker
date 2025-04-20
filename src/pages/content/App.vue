<script setup lang="ts">
import BlockDialog from './components/BlockDialog.vue'
import SettingDialog from './components/SettingDialog.vue'
import { emitter, OPEN_SETTING } from './modules/emitter'

function openSetting () {
  emitter.emit(OPEN_SETTING)
}
</script>

<template>
  <div class="text-left font-sans text-sm tracking-wide">
    <BlockDialog />
    <SettingDialog />

    <button class="group fixed bottom-4 right-4 z-[20000000000]" type="button" @click="openSetting">
      <div
        class="h-10 w-10 bg-contain bg-center bg-no-repeat drop-shadow-[0_4px_8px_rgba(0,0,0,.3)] duration-200 group-hover:brightness-125  group-active:scale-95"
        :style="{ backgroundImage: 'var(--taiwan-company-blocker-icon)',
        }"
      />
    </button>
  </div>
</template>
