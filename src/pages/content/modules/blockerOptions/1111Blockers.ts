import { type CreateBlockerOptions } from '../CreateBlockerOptions'

export const _1111BlockerOptions: CreateBlockerOptions[] = [
  {
    description: '`/job` 職缺列表',
    itemsSelector: '.job_item.item__job',
    jobTitleStrategy: 'h5',
    companyNameStrategy: 'h6',
  },
  // `companyName` contains irrelevant noise after the actual company name, e.g. "OX有限公司 | 不動產經營╱開發"
  {
    description: '`/search/corp` 公司列表',
    itemsSelector: '.job_item.item__corp',
    companyNameStrategy: 'h5',
  },
  {
    description: '`/corp/*` 公司頁下方「工作機會」列表',
    itemsSelector: '#jobListPage .job_item',
    jobTitleStrategy: 'h5',
    companyNameStrategy: 'h6',
  },
  {
    description: '`/corp/*` 公司頁下方「相似產業」公司列表',
    itemsSelector: '#similarCompanyDiv .UI_card_company',
    companyNameStrategy: 'h3 a',
    activatorPosition: 'bottom-right',
  },
]
