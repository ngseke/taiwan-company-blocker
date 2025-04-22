<script setup lang="ts">
import { formatPlatformName } from '../content/modules/platform'
import PopupLayout from './components/PopupLayout.vue'
import Statistic from './components/Statistic.vue'
import { useContentMessage } from './composables/useContentMessage'
import BlockMethodSelect from './components/BlockMethodSelect.vue'

const { platformName, blockedCount } = useContentMessage()
</script>

<template>
  <PopupLayout>
    <div class="flex h-full flex-col justify-between">
      <div class="flex flex-col gap-3">
        <div class="flex flex-wrap gap-x-7 gap-y-3">
          <h1 class="text-lg font-bold leading-6">
            Taiwan Company Blocker
          </h1>
          <Statistic
            class="w-full"
            :muted="!platformName"
            name="求職平台"
            :value="formatPlatformName(platformName) ?? '未偵測'"
          />
          <Statistic :muted="blockedCount == null" name="封鎖模式">
            <BlockMethodSelect />
          </Statistic>
          <Statistic
            :muted="blockedCount == null"
            name="已過濾數量"
            :value="blockedCount"
          />
        </div>
      </div>
    </div>
  </PopupLayout>
</template>
