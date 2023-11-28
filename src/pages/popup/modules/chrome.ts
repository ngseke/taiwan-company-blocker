export async function getCurrentTab () {
  const [tab] = await chrome.tabs.query({ active: true })
  return tab as (chrome.tabs.Tab | undefined)
}

export async function sendMessageToCurrentTab (message: string) {
  const tab = await getCurrentTab()
  return await new Promise((resolve, reject) => {
    if (tab?.id == null) {
      reject(new Error('Cannot get current `tab.id`!'))
      return
    }
    chrome.tabs.sendMessage(tab.id, message, resolve)
  })
}
