import { emitter, OPEN_SETTING } from '../modules/emitter'
import { type PlatformName } from '../../../../schemas/platformName'
import { detectPagePlatform } from '../modules/platform'
import { cn } from '../../../modules/cn'

function openSetting () {
  emitter.emit(OPEN_SETTING)
}

const positionClassName = (() => {
  const map: Record<PlatformName, string> = {
    cake: 'top-[76px] right-[16px]',
    yourator: 'top-[80px] right-[16px]',
    104: 'top-[62px] right-[16px]',
    518: 'top-[100px] right-[16px]',
    1111: 'top-[80px] right-[16px]',
    chickpt: 'top-[80px] right-[16px]',
    meetJobs: 'top-[80px] right-[16px]',
    taiwanJobs: 'top-[64px] right-[16px]',
  }

  const platform = detectPagePlatform()
  if (!platform) return null

  return map[platform]
})()

export function QuickSettingActivator () {
  return (
    <button
      className={cn('group fixed z-[20000000000] drop-shadow-[0_0_4px_rgba(0,0,0,.3)] hover:[filter:_drop-shadow(0_0_4px_rgba(239,68,68,.5))_drop-shadow(0_0_8px_rgba(239,68,68,.3))] duration-500 outline-none', positionClassName)}
      type="button"
      onClick={openSetting}
    >
      <div
        className="h-10 w-10 bg-contain bg-center bg-no-repeat duration-200 group-hover:brightness-[120%] group-active:scale-95"
        style={{ backgroundImage: 'var(--taiwan-company-blocker-icon)' }}
      />
    </button>
  )
}
