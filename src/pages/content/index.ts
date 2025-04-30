import { QUERY_BLOCKED_COUNT_MESSAGE_NAME, QUERY_PLATFORM_NAME_MESSAGE_NAME } from '../../modules/constants'
import { mountReactApp } from './main'
import { BlockerManager } from './modules/BlockerManager'
import { waitForElement } from './modules/dom'
import { injectGlobalCssVariables } from './modules/injectGlobalCssVariables'
import { detectPagePlatform } from './modules/platform'

;(async () => {
  const platform = detectPagePlatform()
  if (!platform) return

  await waitForElement('body')

  const blockerManager = new BlockerManager()

  injectGlobalCssVariables()

  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === QUERY_PLATFORM_NAME_MESSAGE_NAME) {
      sendResponse(platform)
      return
    }
    if (message === QUERY_BLOCKED_COUNT_MESSAGE_NAME) {
      sendResponse(blockerManager.blockedCount)
    }
  })

  chrome.storage.onChanged.addListener(async () => {
    await blockerManager.render()
  })

  mountReactApp()
})()
