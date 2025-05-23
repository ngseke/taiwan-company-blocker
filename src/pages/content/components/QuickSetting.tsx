import { faGear, faXmark } from '@fortawesome/free-solid-svg-icons'
import { IconButton } from '../../../components/IconButton'
import { OverlayDialog } from '../../../components/OverlayDialog'
import { useEmitter } from '../hooks/useEmitter'
import { OPEN_SETTING } from '../modules/emitter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { OPEN_OPTIONS_PAGE_MESSAGE_NAME } from '../../../modules/constants'
import { Card } from '../../../components/Card'
import { EnableOptions } from '../../../components/options/EnableOptions'
import { BlockMethodOptions } from '../../../components/options/BlockMethodOptions'
import { RulesOptions } from '../../../components/options/RulesOptions'
import { type RuleType } from '../../../modules/rule'

export function QuickSetting () {
  const [isOpened, setIsOpened] = useState(false)
  const [options, setOptions] = useState< {
    type: RuleType
    text: string
  } | null>(null)
  function open () { setIsOpened(true) }
  function close () { setIsOpened(false) }

  useEmitter(OPEN_SETTING, (options) => {
    open()
    setOptions(options ?? null)
  })

  function openOptions () {
    close()
    chrome.runtime.sendMessage(OPEN_OPTIONS_PAGE_MESSAGE_NAME)
  }

  return (
    <OverlayDialog closeOnClickOutside open={isOpened} onClose={close}>
      {isOpened && (
        <div className="flex h-full gap-4 [filter:drop-shadow(0_0_16px_rgba(0,0,0,.6))_drop-shadow(0_0_32px_rgba(0,0,0,.4))_drop-shadow(0_0_48px_rgba(0,0,0,.2))]">
          <div className="sticky top-0 flex flex-col gap-2 pl-4 pt-6">
            <IconButton
              className="h-12 w-12 text-2xl"
              icon={faXmark}
              title="關閉"
              onClick={close}
            />
          </div>
          <section
            className="flex w-full flex-col gap-4 overflow-auto pb-0 pl-0 pr-6 pt-6 text-neutral-300"
          >
            <Card>
              <EnableOptions isInContent />
            </Card>

            <Card>
              <BlockMethodOptions />
            </Card>

            <Card>
              <RulesOptions isInContent highlight={options} />
            </Card>

            <button
              className="flex w-full items-center gap-3 rounded-lg bg-neutral-900 p-6 font-medium shadow-2xl hover:brightness-125" type="button"
              onClick={openOptions}
            >
              <FontAwesomeIcon className="text-lg" icon={faGear} />
              進階設定
            </button>

            <div className="mb-8" />
          </section>
        </div>
      )}
    </OverlayDialog>
  )
}
