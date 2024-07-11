import semver from 'semver'
import { useChromeStorage } from './useChromeStorage'
import { PREVIOUS_VERSION_KEY } from '../modules/storage'
import { computed } from 'vue'

const version = APP_VERSION

export function useVersion () {
  const previousVersion = useChromeStorage(PREVIOUS_VERSION_KEY)

  const isUpdated = computed(() => {
    if (previousVersion.value == null) return false
    try {
      return semver.gt(version, previousVersion.value)
    } catch (err) {
      return true
    }
  })

  function updatePreviousVersion () {
    previousVersion.value = version
  }

  return {
    previousVersion,
    isUpdated,
    updatePreviousVersion,
  }
}
