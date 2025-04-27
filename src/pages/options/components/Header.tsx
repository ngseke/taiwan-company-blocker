import { useRef } from 'react'
import { useChromeStorage } from '../../../hooks/useChromeStorage'
import { DEBUGGER_ENABLED_STORAGE_KEY } from '../../../modules/storage'
import { logger } from '../../../modules/logger'
import { Button } from '../../../components/Button'
import { Checkbox } from '../../../components/Checkbox'
import icon from '../../../assets/img/icon.png'

export function Header () {
  const [isDebuggerEnabled, setIsDebuggerEnabled] = useChromeStorage(DEBUGGER_ENABLED_STORAGE_KEY)
  const count = useRef(0)

  async function handleClickPrintStorage () {
    logger.info('local storage', await chrome.storage.local.get(null))
    logger.info('sync storage', await chrome.storage.sync.get(null))
  }

  return (
    <div className="flex flex-col items-center py-3">
      <div
        className="my-4 h-28 w-28 bg-contain bg-center bg-no-repeat duration-1000"
        style={{ backgroundImage: `url(${icon})` }}
        onClick={() => {
          count.current++
          if (count.current >= 3) {
            setIsDebuggerEnabled(true)
            count.current = 3
          }
        }}
      />

      <h1 className="text-center text-lg font-bold leading-6">
        Taiwan Company Blocker
      </h1>

      {isDebuggerEnabled && (
        <div className="mt-4 flex w-full flex-col items-start gap-2">
          <Checkbox
            checked={isDebuggerEnabled ?? false}
            onChange={setIsDebuggerEnabled}
          >
            Enable Debugger
          </Checkbox>

          <Button onClick={handleClickPrintStorage}>
            Print Storage
          </Button>
        </div>
      )}
    </div>
  )
}
