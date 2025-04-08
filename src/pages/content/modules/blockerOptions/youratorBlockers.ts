import { type CreateBlockerOptions } from '../CreateBlockerOptions'

export const youratorBlockerOptions: CreateBlockerOptions[] = [
  {
    description: '`/search?s=*` 綜合搜尋 職缺列表',
    exampleUrl: 'https://www.yourator.co/search',
    itemsSelector: '.search-result__section .y-job-card',
    jobTitleStrategy: '.y-new-card__title',
    companyNameStrategy: '.y-new-card__subtitle',
    activatorPosition: 'bottom-right',
  },
  {
    description: '`/search?s=*` 綜合搜尋 公司列表',
    exampleUrl: 'https://www.yourator.co/search',
    itemsSelector: '.search-result__cards .y-company-card ',
    companyNameStrategy: '.y-new-card__title',
  },
  {
    description: '`/companies` 公司列表',
    exampleUrl: 'https://www.yourator.co/companies',
    itemsSelector: '.shadow-company-card',
    companyNameStrategy: `
      .text-lightest-navy.font-medium.truncate.text-general,
      .shrink.truncate.text-hint.text-main-blue
    `,
  },
  {
    description: '`/companies/*` 公司頁「目前職缺」列表',
    exampleUrl: 'https://www.yourator.co/companies/Yourator',
    itemsSelector: '#JobsOfCompanyPage div > a[href^="/companies"]',
    jobTitleStrategy: 'p.truncate.text-general.font-bold.text-lightest-navy',
    companyNameStrategy: {
      selectorTarget: 'document',
      selector: '#company-info h1',
      textType: 'textContent',
    },
    activatorPosition: 'bottom-right',
  },
  {
    description: '`/companies/*` 公司頁下方「相關推薦公司」列表（登入後可見）',
    exampleUrl: 'https://www.yourator.co/companies/Yourator',
    itemsSelector: '.recommend-companies .y-company-card',
    companyNameStrategy: '.y-new-card__title',
  },
  {
    description: '`/jobs` 職缺列表',
    exampleUrl: 'https://www.yourator.co/jobs',
    itemsSelector: '#normal-jobs > div > a',
    jobTitleStrategy: '.text-general.font-bold.text-lightest-navy.truncate',
    companyNameStrategy: '.flex-initial.text-sub.text-main-blue.truncate',
    activatorPosition: 'bottom-right',
  },
  {
    description: '`/companies/*/jobs/*` 職缺頁底部「你可能也感興趣的職缺」列表',
    itemsSelector: '.job-recommendations .y-job-card',
    jobTitleStrategy: '.y-new-card__title',
    companyNameStrategy: '.y-new-card__subtitle',
  },
  {
    description: '`/events/*?tab=companies` 專題頁 公司列表',
    itemsSelector: `
      #event-detail-company-and-job-section
      .grid.grid-cols-2.gap-x-1\\.5.gap-y-2.tablet\\:grid-cols-3.tablet\\:gap-4
      .shadow-company-card
    `,
    companyNameStrategy: '.text-lightest-navy.font-medium.truncate.text-general',
  },
  {
    description: '`/events/*?tab=jobs` 專題頁 職缺列表',
    itemsSelector: `
      #event-detail-company-and-job-section
      .flex.flex-col.tablet\\:gap-4 > div > a
    `,
    jobTitleStrategy: 'p.truncate.text-general.font-bold.text-lightest-navy',
    companyNameStrategy: '.flex-initial.text-sub.text-main-blue.hover\\:text-darkest-blue.truncate',
    activatorPosition: 'bottom-right',
  },
]
