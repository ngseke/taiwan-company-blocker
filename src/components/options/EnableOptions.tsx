import { platformNames } from '../../../schemas/platformName'
import { useChromeStorage } from '../../hooks/useChromeStorage'
import { OPTIONS_TEST_IDS } from '../../modules/constants'
import { ENABLED_STORAGE_KEY } from '../../modules/storage'
import { formatPlatformName, platformHosts } from '../../pages/content/modules/platform'
import { Switch } from '../Switch'

function SupportPlatformArticle () {
  return (
    <article className="space-y-2">
      <p>
        目前支援平台：
        {platformNames.map((name, index) => (
          <template key={name}>
            <a
              className="underline"
              href={`https://${platformHosts[name]}`}
              rel="noreferrer" target="_blank"
            >
              {formatPlatformName(name)}
            </a>
            {index !== platformNames.length - 1 && (
              <span>、</span>
            )}
          </template>
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
          data-testid={OPTIONS_TEST_IDS.enableSwitch}
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
