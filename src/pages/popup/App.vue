<script setup lang="ts">
import { formatPlatformName } from '../content/modules/platform'
import PopupLayout from './components/PopupLayout.vue'
import Statistic from './components/Statistic.vue'
import { useContentMessage } from './composables/useContentMessage'
import Button from '../../components/Button.vue'
import BlockMethodSelect from './components/BlockMethodSelect.vue'

function openOptions () {
  chrome.runtime.openOptionsPage()
}

const { platformName, blockedCount } = useContentMessage()
const version = `v${APP_VERSION}`
</script>

<template>
  <PopupLayout>
    <div class="flex h-full flex-col justify-between">
      <div class="flex flex-col gap-4">
        <div class="flex items-end gap-2">
          <h1 class="text-lg font-bold leading-6">
            Taiwan Company Blocker
          </h1>
          <span class="font-mono text-neutral-600">
            {{ version }}
          </span>
        </div>

        <div class="flex gap-7">
          <Statistic
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

      <div class="flex flex-wrap gap-2">
        <Button @click="openOptions">管理封鎖關鍵詞</Button>
      </div>
    </div>
  </PopupLayout>
</template>
