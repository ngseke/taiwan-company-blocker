import { formatPlatformName } from '../content/modules/platform'
import { BlockMethodSelect } from './components/BlockMethodSelect'
import { PopupLayout } from './components/PopupLayout'
import { Statistic } from './components/Statistic'
import { useContentMessage } from './hooks/useContentMessage'

export function App () {
  const { platformName, blockedCount } = useContentMessage()

  return (
    <PopupLayout>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            <h1 className="text-lg font-bold leading-6">
              Taiwan Company Blocker
            </h1>
            <Statistic className="w-full" muted={!platformName} name="求職平台">
              {formatPlatformName(platformName) ?? '未偵測'}
            </Statistic>

            <Statistic muted={blockedCount == null} name="封鎖模式">
              <BlockMethodSelect />
            </Statistic>
            <Statistic muted={blockedCount == null} name="已過濾數量">
              {blockedCount}
            </Statistic>
          </div>
        </div>
      </div>
    </PopupLayout>
  )
}
