<script setup lang="ts">
import BlockDialog from './components/BlockDialog.vue'
import QuickSetting from './components/QuickSetting.vue'
import QuickSettingActivator from './components/QuickSettingActivator.vue'
</script>

<template>
  <div class="text-left font-sans text-sm tracking-wide">
    <BlockDialog />
    <QuickSetting />

    <QuickSettingActivator />
  </div>
</template>
