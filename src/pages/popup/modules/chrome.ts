export async function getCurrentTab () {
  const [tab] = await chrome.tabs.query({ active: true })
  return tab
}

export async function sendMessageToCurrentTab (message: string) {
  const tab = await getCurrentTab()
  return await new Promise((resolve, reject) => {
    if (!tab.id) {
      reject(new Error('Cannot get current `tab.id`!'))
      return
    }
    chrome.tabs.sendMessage(tab.id, message, resolve)
  })
}
