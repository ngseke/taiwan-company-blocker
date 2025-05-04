import { useEffect, useRef } from 'react'
import { type StorageKey } from '../modules/storage'

type Handler = Parameters<typeof chrome.storage.onChanged.addListener>[0]

export function useChromeStorageListener (
  handler: Handler,
  key?: StorageKey
) {
  const handlerRef = useRef(handler)
  handlerRef.current = handler

  useEffect(() => {
    const changeHandler: Handler = (changes, ...rest) => {
      if (!key || key in changes) {
        handlerRef.current(changes, ...rest)
      }
    }
    chrome.storage.onChanged.addListener(changeHandler)
    return () => {
      chrome.storage.onChanged.removeListener(changeHandler)
    }
  }, [key])
}
