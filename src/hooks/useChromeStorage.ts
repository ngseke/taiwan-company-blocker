import { type StorageKey, type StorageSchema, getStorage, setStorage } from '../modules/storage'
import { useChromeStorageListener } from './useChromeStorageListener'
import { isEqual } from 'lodash-es'
import { useCallback, useEffect, useState } from 'react'

export function useChromeStorage <
  Key extends StorageKey
> (key: Key) {
  type Value = StorageSchema[Key] | null

  const [value, _setValue] = useState<Value>(null)

  useEffect(() => {
    ;(async () => {
      _setValue(await getStorage(key))
    })()
  }, [key])

  const setValue = useCallback(async (newValue: Value) => {
    const oldValue = value
    if (newValue == null || oldValue == null) return
    if (isEqual(newValue, oldValue)) return

    await setStorage(key, newValue)
    _setValue(newValue)
  }, [key, value])

  useChromeStorageListener(useCallback((changes) => {
    if (!(key in changes)) return
    const { newValue, oldValue } = changes[key]
    if (isEqual(newValue, oldValue)) return

    _setValue(newValue)
  }, [key]))

  return [value, setValue] as const
}
