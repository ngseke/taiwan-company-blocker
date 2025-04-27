import { Card } from '../../../components/Card'
import { BlockMethodOptions } from '../../../components/options/BlockMethodOptions'
import { EnableOptions } from '../../../components/options/EnableOptions'
import { RulesOptions } from '../../../components/options/RulesOptions'
import { OPTIONS_TEST_IDS } from '../../../modules/constants'
import { VersionUpdatedAlert } from '../components/VersionUpdatedAlert'

export function SettingPage () {
  return (
    <section
      className="flex w-full flex-col gap-4"
      data-testid={OPTIONS_TEST_IDS.sectionSetting}
    >
      <VersionUpdatedAlert />

      <Card>
        <EnableOptions />
      </Card>

      <Card>
        <BlockMethodOptions />
      </Card>

      <Card>
        <RulesOptions />
      </Card>
    </section>
  )
}
