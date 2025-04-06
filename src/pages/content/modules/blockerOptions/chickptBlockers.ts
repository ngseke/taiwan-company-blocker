import { type CreateBlockerOptions } from '../CreateBlockerOptions'

export const chickptBlockerOptions: CreateBlockerOptions[] = [
  {
    description: '`/` 職缺列表',
    itemsSelector: 'ul#job-list li',
    jobTitleStrategy: 'a.job-list-item h2.job-info-title',
    companyNameStrategy: '.job-info-company p',
  },
  {
    description: '`/` 公司頁下方「所有職缺」列表',
    itemsSelector: '.company_profile #js-job ul.job_wrap li.job_wrap_item',
    jobTitleStrategy: 'h3.job_name',
    companyNameStrategy: {
      selectorTarget: 'document',
      selector: '.company_content h1.title',
      textType: 'textContent',
    },
    activatorPosition: 'bottom-right',
  },
  {
    description: '`/` 公司頁右側「相似公司」列表',
    itemsSelector: '.similar_wrap .similar_wrap_item',
    companyNameStrategy: '.similar_wrap_item_title',
  },
  {
    description: '`/job-*` 職缺頁下方「推薦職缺」列表（任意公司）',
    itemsSelector: '.wrap-job-content #js-job ul.job_wrap li.job_wrap_item',
    jobTitleStrategy: 'h3.job_name',
    activatorPosition: 'bottom-right',
  },
]
