import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useVersion } from '../../../hooks/useVersion'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from '../../../components/Link'

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
          <FontAwesomeIcon className="mr-1" icon={faCheck} />
          已成功更新至 <span className="font-mono">{version}</span>。

          <Link
            className="underline"
            href="https://github.com/ngseke/taiwan-company-blocker/releases"
          >
            查看版本記錄
          </Link>
        </div>

        <button
          className="inline-flex items-center justify-center p-1 hover:text-red-500"
          type="button"
          onClick={handleDismiss}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>
  )
}
