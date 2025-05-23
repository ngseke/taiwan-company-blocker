import semver from 'semver'
import { useChromeStorage } from './useChromeStorage'
import { PREVIOUS_VERSION_KEY } from '../modules/storage'

const version = APP_VERSION

export function useVersion () {
  const [previousVersion, setPreviousVersion] = useChromeStorage(PREVIOUS_VERSION_KEY)

  const isUpdated = (() => {
    if (previousVersion == null) return false
    try {
      return semver.gt(version, previousVersion)
    } catch (err) {
      return true
    }
  })()

  function updatePreviousVersion () {
    setPreviousVersion(version)
  }

  return {
    previousVersion,
    isUpdated,
    updatePreviousVersion,
  }
}
