<script setup lang="ts">
import { REVEAL_MESSAGE_NAME, UNREVEAL_MESSAGE_NAME } from '../../modules/constants'
import { formatPlatformName } from '../content/modules/platform'
import PopupLayout from './components/PopupLayout.vue'
import Statistic from './components/Statistic.vue'
import { sendMessageToCurrentTab } from './modules/chrome'
import { useContentMessage } from './composables/useContentMessage'

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
    <div class="flex flex-col gap-4 py-4">
      <div class="flex gap-7">
        <Statistic name="求職平台" :value="formatPlatformName(platformName)" />
        <Statistic name="頁面已過濾數量" :value="blockedCount" />
      </div>
      <div class="flex gap-6">
        <button type="button" @click="reveal">Reveal</button>
        <button type="button" @click="unreveal">Unreveal</button>
        <button type="button" @click="openOptions">Options</button>
      </div>
    </div>
  </PopupLayout>
</template>
