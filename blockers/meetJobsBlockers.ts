import { type Blocker } from '../schemas/blocker'

export const meetJobsBlockerOptions: Blocker[] = [
  {
    description: '`/zh-TW/jobs` 職缺列表、`/zh-TW/jobs/*` 職缺頁下方「此企業的其他工作機會」、`/zh-TW/employers/*` 公司職缺列表',
    itemsSelector: '.job-cards .job-card',
    jobTitleStrategy: 'h3.job-title',
    companyNameStrategy: 'h5.employer-name',
    activatorPosition: 'top-left',
  },
]
