import { BlockDialog } from './components/BlockDialog'
import { QuickSetting } from './components/QuickSetting'
import { QuickSettingActivator } from './components/QuickSettingActivator'

export function App () {
  return (
    <div className="text-left font-sans text-sm tracking-wide">
      <BlockDialog />
      <QuickSetting />

      <QuickSettingActivator />
    </div>
  )
}
