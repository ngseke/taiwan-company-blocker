import { Fragment } from 'react/jsx-runtime'
import { platformNames } from '../../../schemas/platformName'
import { useChromeStorage } from '../../hooks/useChromeStorage'
import { OPTIONS_TEST_IDS } from '../../modules/constants'
import { ENABLED_STORAGE_KEY } from '../../modules/storage'
import { formatPlatformName, platformHosts } from '../../pages/content/modules/platform'
import { Switch } from '../Switch'
import { Link } from '../Link'

function SupportPlatformArticle () {
  return (
    <article className="space-y-2">
      <p>
        支援下列平台：
        {platformNames.map((name, index) => (
          <Fragment key={name}>
            <Link
              className="underline"
              href={`https://${platformHosts[name]}`}
            >
              {formatPlatformName(name)}
            </Link>
            {index !== platformNames.length - 1 && (
              <span>、</span>
            )}
          </Fragment>
        ))}
      </p>
    </article>
  )
}

export function EnableOptions ({ isInContent }: { isInContent?: boolean }) {
  const [isEnabled, setIsEnabled] = useChromeStorage(ENABLED_STORAGE_KEY)

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Switch
          checked={isEnabled ?? false}
          testId={OPTIONS_TEST_IDS.enableSwitch}
          onChange={setIsEnabled}
        >
          啟用
        </Switch>
      </div>

      {!isInContent && (
        <SupportPlatformArticle />
      )}
    </div>
  )
}
