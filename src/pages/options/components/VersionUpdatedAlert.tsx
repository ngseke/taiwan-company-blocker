import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useVersion } from '../../../hooks/useVersion'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

const version = `v${APP_VERSION}`

export function VersionUpdatedAlert () {
  const { isUpdated, updatePreviousVersion } = useVersion()

  function handleDismiss () {
    updatePreviousVersion()
  }

  if (!isUpdated) return null

  return (
    <div
      className="rounded-lg bg-neutral-800 p-3 py-2 duration-200"
    >
      <div className="flex gap-2">
        <div className="flex-1">
          {/* @ts-expect-error -- Remove Vue */}
          <FontAwesomeIcon className="mr-1" icon={faCheck} />
          已成功更新至 <span className="font-mono">{version}</span>。

          <a
            className="underline hover:text-red-500"
            href="https://github.com/ngseke/taiwan-company-blocker/releases"
            rel="noreferrer" target="_blank"
          >
            查看版本記錄
          </a>
        </div>

        <button
          className="inline-flex items-center justify-center p-1 hover:text-red-500"
          type="button"
          onClick={handleDismiss}
        >
          {/* @ts-expect-error -- Remove Vue */}
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>
  )
}
