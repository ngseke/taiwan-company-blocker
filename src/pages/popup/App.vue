<script setup lang="ts">
import { REVEAL_MESSAGE_NAME, UNREVEAL_MESSAGE_NAME } from '../../modules/constants'
import { formatPlatformName } from '../content/modules/platform'
import PopupLayout from './components/PopupLayout.vue'
import Statistic from './components/Statistic.vue'
import { sendMessageToCurrentTab } from './modules/chrome'
import { useContentMessage } from './composables/useContentMessage'
import Button from './components/Button.vue'

async function reveal () {
  await sendMessageToCurrentTab(REVEAL_MESSAGE_NAME)
}

async function unreveal () {
  await sendMessageToCurrentTab(UNREVEAL_MESSAGE_NAME)
}

function openOptions () {
  chrome.runtime.openOptionsPage()
}

const { platformName, blockedCount } = useContentMessage()
</script>

<template>
  <PopupLayout>
    <div class="flex flex-col gap-4 pb-3">
      <h1 class="text-lg font-bold leading-6">
        <a href="#" @click.stop>Taiwan Company Blocker</a>
      </h1>

      <div class="flex gap-7">
        <Statistic name="求職平台" :value="formatPlatformName(platformName)" />
        <Statistic name="頁面已過濾數量" :value="blockedCount" />
      </div>

      <div class="flex flex-wrap gap-2">
        <div class="w-2/5">
          <Button @click="openOptions">管理篩選關鍵詞</Button>
        </div>
        <div class="flex-none">
          <Button @click="reveal">Reveal</Button>
        </div>
        <div class="flex-none">
          <Button @click="unreveal">Unreveal</Button>
        </div>
      </div>
    </div>
  </PopupLayout>
</template>
