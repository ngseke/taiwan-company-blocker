import { OPEN_OPTIONS_PAGE_MESSAGE_NAME } from '../../modules/constants'

chrome.runtime.onMessage.addListener((message) => {
  if (message === OPEN_OPTIONS_PAGE_MESSAGE_NAME) {
    chrome.runtime.openOptionsPage()
  }
})

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage()
})
