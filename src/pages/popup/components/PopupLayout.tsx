import { cn } from '../../../modules/cn'
import icon from '../../../assets/img/icon.png'
import { useChromeStorage } from '../../../hooks/useChromeStorage'
import { ENABLED_STORAGE_KEY } from '../../../modules/storage'
import { POPUP_TEST_IDS } from '../../../modules/constants'
import { type PropsWithChildren } from 'react'
import { EnableSwitch } from './EnableSwitch'
import { OptionsButton } from './OptionsButton'

export function PopupLayout ({ children }: PropsWithChildren) {
  const [isEnabled, setIsEnabled] = useChromeStorage(ENABLED_STORAGE_KEY)

  if (isEnabled == null) return null

  function openOptions () {
    chrome.runtime.openOptionsPage()
  }

  return (
    <div className="flex h-full items-stretch overflow-auto">
      <div className="m-6 mr-4 flex flex-col items-center border-r border-neutral-800 pr-4">
        <div
          className={cn('duration-[2000ms]', {
            '[filter:_drop-shadow(0_0_8px_rgba(239,68,68,.2))_drop-shadow(0_0_12px_rgba(239,68,68,.15))_drop-shadow(0_0_16px_rgba(239,68,68,.1))]': isEnabled,
          })}
        >
          <div
            className={cn(
              'mb-4 h-20 w-20 bg-contain bg-center bg-no-repeat duration-[1000ms]',
              { grayscale: !isEnabled }
            )}
            style={{ backgroundImage: `url(${icon})` }}
          />
        </div>

        <div>
          <EnableSwitch
            value={isEnabled}
            onChange={setIsEnabled}
            data-testid={POPUP_TEST_IDS.enableSwitch}
          />
        </div>

        <div className="flex flex-1 flex-col justify-end">
          <OptionsButton onClick={openOptions} />
        </div>
      </div>

      <div className="h-full flex-1 overflow-auto py-6 pr-6">
        {children}
      </div>
    </div>
  )
}
