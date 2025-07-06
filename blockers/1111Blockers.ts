import { type Blocker } from '../schemas/blocker'

export const _1111BlockerOptions: Blocker[] = [
  {
    description: '首頁 優質企業 Slider',
    exampleUrl: 'https://www.1111.com.tw/',
    itemsSelector: '.swiper-wrapper .w-full.h-full.card-border.bg-white.cursor-pointer',
    companyNameStrategy: 'h3',
  },
  {
    description: '首頁職缺 Slider',
    exampleUrl: 'https://www.1111.com.tw/',
    itemsSelector: '.swiper-wrapper .grid > .card-border',
    jobTitleStrategy: 'a[href^="/job"] div',
    companyNameStrategy: 'a[href^="/corp"] div',
    activatorPosition: 'bottom-right',
  },
  {
    description: '`/search/job` 職缺列表',
    exampleUrl: 'https://www.1111.com.tw/search/job',
    itemsSelector: '.search-content .job-card',
    jobTitleStrategy: 'a[href^="/job"] h2',
    companyNameStrategy: 'a[href^="/corp"] h2',
  },
  {
    description: '`/search/job` 職缺列表右側強力推薦 ',
    exampleUrl: 'https://www.1111.com.tw/search/job',
    itemsSelector: `
      section.w-\\[218px\\]
      .w-full.flex.flex-row.border-b
    `,
    jobTitleStrategy: 'h2',
    companyNameStrategy: 'p.mb-2.line-clamp-2.text-gray-600',
  },
  {
    description: '`/search/corp` 公司列表',
    exampleUrl: 'https://www.1111.com.tw/search/corp',
    itemsSelector: '.search-content .company-card',
    companyNameStrategy: 'h2',
  },
  {
    description: '`/corp/*` 公司頁下方「工作機會」列表',
    exampleUrl: 'https://www.1111.com.tw/corp/1355006',
    itemsSelector: '#JOBS .job-card',
    jobTitleStrategy: 'h3 a',
    companyNameStrategy: {
      selectorTarget: 'document',
      selector: 'h1',
      textType: 'textContent',
    },
    activatorPosition: 'bottom-right',
  },
  {
    description: '`/job/*` 職缺頁',
    itemsSelector: '.container.mx-auto:has(h1)',
    jobTitleStrategy: 'h1',
    companyNameStrategy: 'h2',
    activatorPosition: 'bottom-right',
  },
  {
    description: '`/job/*` 職缺頁 右側推薦職缺',
    itemsSelector: 'aside ul li.py-4',
    jobTitleStrategy: 'h3',
    companyNameStrategy: 'h4',
    activatorPosition: 'bottom-right',
  },
]
