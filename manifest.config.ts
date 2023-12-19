import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'

const { version } = packageJson

export default defineManifest(async () => ({
  manifest_version: 3,
  version,

  default_locale: 'zh_TW',
  name: '__MSG_appName__',
  description: '__MSG_appDesc__',

  icons: {
    128: 'src/assets/img/icon.png',
  },
  action: {
    default_icon: 'src/assets/img/icon.png',
    default_popup: 'src/pages/popup/index.html',
  },
  content_scripts: [
    {
      matches: [
        'https://www.cakeresume.com/*',
        'https://www.yourator.co/*',
        'https://www.104.com.tw/*',
        'https://pda.104.com.tw/*',
        'https://www.518.com.tw/*',
        'https://www.1111.com.tw/*',
        'https://www.yes123.com.tw/*',
        'https://www.linkedin.com/*',
        'https://www.chickpt.com.tw/*',
        'https://chickpt.com.tw/*',
        'https://meet.jobs/*',
        'https://job.taiwanjobs.gov.tw/*',
      ],
      js: ['src/pages/content/index.ts'],
      run_at: 'document_start',
    },
  ],
  options_ui: {
    open_in_tab: true,
    page: 'src/pages/options/index.html',
  },
  background: {
    service_worker: 'src/pages/background/index.ts',
    type: 'module',
  },
  permissions: [
    'storage',
    'alarms',
  ],
}))
