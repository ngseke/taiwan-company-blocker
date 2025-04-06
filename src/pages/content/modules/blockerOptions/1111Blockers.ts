import { type CreateBlockerOptions } from '../CreateBlockerOptions'

export const _1111BlockerOptions: CreateBlockerOptions[] = [
  {
    description: '`/search/job` 職缺列表',
    itemsSelector: '.search-content .job-card',
    jobTitleStrategy: '.job-card__title',
    companyNameStrategy: {
      selectorTarget: 'item',
      selector: 'a.hover\\:underline.font-medium.flex.flex-row.items-center',
      textType: 'attribute',
      textKey: 'title',
    },
  },
  {
    description: '`/search/job` 職缺列表右側強力推薦 ',
    itemsSelector: `
      section.w-\\[218px\\]
      .w-full.flex.flex-row.border-b
    `,
    jobTitleStrategy: 'h2',
    companyNameStrategy: 'a[href^="/corp/"]',
  },
  {
    description: '`/search/corp` 公司列表',
    itemsSelector: '.search-content .company-card',
    companyNameStrategy: 'h2',
  },
  {
    description: '`/corp/*` 公司頁下方「工作機會」列表',
    itemsSelector: '#JOBS .job-card',
    jobTitleStrategy: 'h4 a',
    companyNameStrategy: {
      selectorTarget: 'document',
      selector: 'h2',
      textType: 'textContent',
    },
    activatorPosition: 'bottom-right',
  },
  {
    description: '`/job/*` 職缺頁 右側推薦職缺',
    itemsSelector: 'aside ul li.py-4.border-b.border-solid',
    jobTitleStrategy: 'h3',
    companyNameStrategy: 'h4',
    activatorPosition: 'bottom-right',
  },
]
