<script setup lang="ts">
import { ref } from 'vue'
import { QUERY_BLOCKED_COUNT_MESSAGE_NAME, QUERY_PLATFORM_NAME_MESSAGE_NAME, REVEAL_MESSAGE_NAME, UNREVEAL_MESSAGE_NAME } from '../../modules/constants'
import { type PlatformName } from '../content/modules/platform'

async function getCurrentTab () {
  const [tab] = await chrome.tabs.query({ active: true })
  return tab
}

async function sendMessageToCurrentTab (message: string) {
  const tab = await getCurrentTab()
  return await new Promise((resolve, reject) => {
    if (!tab.id) {
      reject(new Error('Cannot get current `tab.id`!'))
      return
    }
    chrome.tabs.sendMessage(tab.id, message, resolve)
  })
}

async function reveal () {
  await sendMessageToCurrentTab(REVEAL_MESSAGE_NAME)
}

async function unreveal () {
  await sendMessageToCurrentTab(UNREVEAL_MESSAGE_NAME)
}

function openOptions () {
  chrome.runtime.openOptionsPage()
}

async function queryPlatformName () {
  platformName.value =
    await sendMessageToCurrentTab(QUERY_PLATFORM_NAME_MESSAGE_NAME) as any
}
const platformName = ref<PlatformName | null>(null)
queryPlatformName()

async function queryBlockedCount () {
  blockedCount.value =
    await sendMessageToCurrentTab(QUERY_BLOCKED_COUNT_MESSAGE_NAME) as any
}
const blockedCount = ref<number | null>(null)
queryBlockedCount()

</script>

<template>
  <div>
    <h1>
      <a href="#">Blocker</a>
    </h1>
    <h2>{{ platformName }} ({{ blockedCount }})</h2>
    <hr>
    <button type="button" @click="reveal">Reveal</button>
    <button type="button" @click="unreveal">Unreveal</button>
    <hr>
    <button type="button" @click="openOptions">Options</button>
  </div>
</template>
