import { QUERY_PLATFORM_NAME_MESSAGE_NAME, REVEAL_MESSAGE_NAME, UNREVEAL_MESSAGE_NAME } from '../../modules/constants'
import { BlockerManager } from './modules/BlockerManager'
import { injectGlobalCssVariables } from './modules/injectGlobalCssVariables'
import { detectPagePlatform } from './modules/platform'

const blockerManager = new BlockerManager()

blockerManager.start()

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
  }
})
