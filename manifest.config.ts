import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'

const { version } = packageJson

const key = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwjoxvq/KornQdb8x/oG3gcMKkpX1ADNoymkeqf12SWXhNqhMgEXjXT4SHAFhg4CBR2DuuPPx4jkITiBU/YhbPHltAuRooGObc+X5keEYxAce1KwL56dvxSNT2D+3sW6OmRKvqqDH0m5qy2zoo+RQ+vLTZk2eZmnxLYX3fdlGxUVABd0G8zcox4yklpHYuuqEdTBoWBiF+mOJG18LzwvskwOugiYu5BtOpMTbyyFqNsC3aJu6dc6jEvnmaHrfLB1iwbAsDhRNEQqvM6wF1uPAvjVJQSCTLcXlhqi0VVhdUeY26cln8c11gWbi1gedrBJPuK/+mOUSk+KboDaHMVWeOQIDAQAB'

export default defineManifest(async () => ({
  manifest_version: 3,
  version,
  key,

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
        'https://*.cakeresume.com/*',
        'https://*.cake.me/*',
        'https://*.yourator.co/*',
        'https://*.104.com.tw/*',
        'https://*.104.com.tw/*',
        'https://*.518.com.tw/*',
        'https://*.1111.com.tw/*',
        'https://*.yes123.com.tw/*',
        'https://*.linkedin.com/*',
        'https://*.chickpt.com.tw/*',
        'https://*.meet.jobs/*',
        'https://*.taiwanjobs.gov.tw/*',
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
