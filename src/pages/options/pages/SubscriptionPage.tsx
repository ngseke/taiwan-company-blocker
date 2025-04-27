import { Card } from '../../../components/Card'
import { OPTIONS_TEST_IDS } from '../../../modules/constants'
import { SubscriptionOptions } from '../components/SubscriptionOptions'

export function SubscriptionPage () {
  return (
    <section
      className="flex w-full flex-col gap-4"
      data-testid={OPTIONS_TEST_IDS.sectionSubscription}
    >
      <Card>
        <SubscriptionOptions />
      </Card>
    </section>
  )
}
