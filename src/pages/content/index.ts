import { QUERY_BLOCKED_COUNT_MESSAGE_NAME, QUERY_PLATFORM_NAME_MESSAGE_NAME, REVEAL_MESSAGE_NAME, UNREVEAL_MESSAGE_NAME } from '../../modules/constants'
import { loadIsEnabled } from '../../modules/storage'
import { BlockerManager } from './modules/BlockerManager'
import { injectGlobalCssVariables } from './modules/injectGlobalCssVariables'
import { detectPagePlatform } from './modules/platform'

const blockerManager = new BlockerManager()

injectGlobalCssVariables()

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message === REVEAL_MESSAGE_NAME) {
    blockerManager.reveal()
    return
  }
  if (message === UNREVEAL_MESSAGE_NAME) {
    blockerManager.unreveal()
    return
  }

  if (message === QUERY_PLATFORM_NAME_MESSAGE_NAME) {
    sendResponse(detectPagePlatform())
    return
  }
  if (message === QUERY_BLOCKED_COUNT_MESSAGE_NAME) {
    sendResponse(blockerManager.blockedCount)
  }
})

async function startOrStop () {
  const isEnabled = await loadIsEnabled()

  if (isEnabled) {
    blockerManager.start()
  } else {
    blockerManager.stop()
  }
}

chrome.storage.onChanged.addListener(startOrStop)
startOrStop()
