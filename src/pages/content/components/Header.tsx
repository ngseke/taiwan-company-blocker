import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { OPEN_OPTIONS_PAGE_MESSAGE_NAME } from '../../../modules/constants'
import { faGear } from '@fortawesome/free-solid-svg-icons'

function openOptions () {
  chrome.runtime.sendMessage(OPEN_OPTIONS_PAGE_MESSAGE_NAME)
}

export function Header () {
  return (

    <div className="flex items-center gap-3">
      <div
        className="h-10 w-10 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: 'var(--taiwan-company-blocker-icon)' }}
      />
      <div className="text-lg font-medium">封鎖此職缺或公司</div>

      <div className="flex-1" />

      <button
        className="group px-2"
        title="設定"
        type="button"
        onClick={openOptions}
      >
        <div className="text-lg duration-500 group-hover:rotate-90 group-hover:text-neutral-50">
          <FontAwesomeIcon icon={faGear} />
        </div>
      </button>
    </div>
  )
}
