import { type Blocker } from '../schemas/blocker'

export const cakeBlockerOptions: Blocker[] = [
  {
    description: '`/companies` 公司列表',
    exampleUrl: 'https://www.cake.me/companies?ref=navs_companies',
    itemsSelector: '[class*="CompanySearchItem-module-scss-module__"][class*="__wrapper"]',
    companyNameStrategy: '[class*="CompanySearchItem-module-scss-module__"][class*="__headerTitle"]',
  },
  {
    description: '`/companies/*` 公司頁下方職缺、 `/companies/*/jobs` 公司頁職缺頁籤',
    exampleUrl: 'https://www.cake.me/companies/Google',
    itemsSelector: `
      [class*="CompanyJobItemView-module-scss-module__"][class*="__container"]
    `,
    jobTitleStrategy: '[class*="CompanyJobItemView-module-scss-module__"][class*="__title"]',
    companyNameStrategy: {
      selectorTarget: 'document',
      selector: `
        h1[class*="CompanyHeader-module-scss-module__"][class*="__companyName"]
      `,
      textType: 'textContent',
    },
  },
  {
    description: '`/companies/*` 公司頁底部「看過這間公司的求職者也看了」',
    exampleUrl: 'https://www.cake.me/companies/Google',
    itemsSelector: '[class*="SimilarPagesListItem-module-scss-module__"][class*="__container"]',
    companyNameStrategy: 'h3',
    activatorPosition: {
      position: 'top-right',
      offset: [-8, -8],
    },
  },
  {
    description: '`/companies/*/jobs/*` 職缺頁底部公司介紹職缺列表',
    itemsSelector: '[class*="JobItem-module-scss-module__"][class*="__container"]',
    jobTitleStrategy: '[class*="JobItem-module-scss-module__"][class*="__title"] a',
    companyNameStrategy: {
      selectorTarget: 'document',
      selector: '[class*="JobDescriptionLeftColumn-module-scss-module__"][class*="__companyInfo"]',
      textType: 'textContent',
    },
    activatorPosition: {
      position: 'top-right',
      offset: [-44, 0],
    },
  },
  {
    description: '`/jobs` 職缺列表',
    exampleUrl: 'https://www.cake.me/jobs',
    itemsSelector: '[class*="JobSearchItem-module-scss-module__"][class*="__container"]',
    jobTitleStrategy: '[class*="JobSearchItem-module-scss-module__"][class*="__jobTitle"]',
    companyNameStrategy: '[class*="JobSearchItem-module-scss-module__"][class*="__companyName"]',
  },
  {
    description: '`/campaigns` Campaigns 職缺列表',
    exampleUrl: 'https://www.cake.me/campaigns/Summer-Tech-Career-Fair',
    itemsSelector: '[class*="CampaignJobSearchItem-module-scss-module__"][class*="__wrapper"]',
    jobTitleStrategy: '[class*="CampaignJobSearchItem-module-scss-module__"][class*="__jobTitle"]',
    companyNameStrategy: '[class*="CampaignJobSearchItem-module-scss-module__"][class*="__companyName"]',
  },
  {
    description: '`/campaigns` Campaigns 左側精選企業',
    exampleUrl: 'https://www.cake.me/campaigns/Summer-Tech-Career-Fair',
    itemsSelector: '[class*="FeaturedCompanyListItem-module-scss-module__"][class*="__wrapper"]',
    companyNameStrategy: '[class*="FeaturedCompanyListItem-module-scss-module__"][class*="__companyTitle"]',
  },
]
