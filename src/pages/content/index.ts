import { QUERY_BLOCKED_COUNT_MESSAGE_NAME, QUERY_PLATFORM_NAME_MESSAGE_NAME } from '../../modules/constants'
import { loadBlockMethod, loadIsDebuggerEnabled, loadIsEnabled } from '../../modules/storage'
import { mountVueApp } from './main'
import { BlockerManager } from './modules/BlockerManager'
import { waitForElement } from './modules/dom'
import { injectGlobalCssVariables } from './modules/injectGlobalCssVariables'
import { detectPagePlatform } from './modules/platform'

await waitForElement('body')

const blockerManager = new BlockerManager()

injectGlobalCssVariables()

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message === QUERY_PLATFORM_NAME_MESSAGE_NAME) {
    sendResponse(detectPagePlatform())
    return
  }
  if (message === QUERY_BLOCKED_COUNT_MESSAGE_NAME) {
    sendResponse(blockerManager.blockedCount)
  }
})

let previousIsEnabled = false

async function startOrStop () {
  const isEnabled = await loadIsEnabled()
  const blockMethod = await loadBlockMethod()
  const isDebuggerEnabled = await loadIsDebuggerEnabled()

  blockerManager.setBlockMethod(blockMethod)

  if (isDebuggerEnabled) {
    blockerManager.enableDebugger()
  }

  if (isEnabled) {
    if (previousIsEnabled === isEnabled) {
      await blockerManager.reload()
    } else {
      await blockerManager.start()
    }
  } else {
    blockerManager.stop()
  }

  previousIsEnabled = isEnabled
}

chrome.storage.onChanged.addListener(startOrStop)
startOrStop()
mountVueApp()
