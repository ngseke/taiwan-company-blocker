import { type CreateBlockerOptions } from '../CreateBlockerOptions'

export const cakeBlockerOptions: CreateBlockerOptions[] = [
  {
    description: '`/companies` 公司列表',
    itemsSelector: '[class^=CompanySearchItem_wrapper]',
    companyNameStrategy: '[class^=CompanySearchItem_companyTitle]',
  },
  {
    description: '`/companies/*` 公司頁下方職缺、 `/companies/*/jobs` 公司頁職缺頁籤',
    itemsSelector: `
      [class^=CompanyJobItemList_jobList] >
      [class^=CompanyJobItemWithAdminTool_container__],
      [class^=CompanyAboutPage_visibleJobsWrapper]
      [class^=CompanyJobItemView_container__]
    `,
    jobTitleStrategy: '[class^=CompanyJobItemView_title]',
    companyNameStrategy: {
      selectorTarget: 'document',
      selector: `
        [class^=CompanyHeader_main__]
        [class^=CompanyHeader_companyNameWrapper__]
        [class^=CompanyHeader_companyName__]
      `,
      textType: 'textContent',
    },
  },
  {
    description: '`/companies/*` 公司頁底部「看過這間公司的求職者也看了」',
    itemsSelector: `
      [class^=CompanySimilarPages_container__]
      [class^=SimilarPagesListItem_container__]
    `,
    companyNameStrategy: '[class^=SimilarPagesListItem_name__] a',
    activatorPosition: {
      position: 'top-right',
      offset: [-8, -8],
    },
  },
  {
    description: '`/companies/*/jobs/*` 職缺頁底部公司介紹職缺列表',
    itemsSelector: '[class^=JobItem_container__]',
    jobTitleStrategy: '[class^=JobItem_title__] a',
    companyNameStrategy: {
      selectorTarget: 'document',
      selector: '[class^=AboutBlock_companyName__]',
      textType: 'textContent',
    },
    activatorPosition: {
      position: 'top-right',
      offset: [-44, 0],
    },
  },
  {
    description: '`/companies/*/jobs/*` 職缺右側「應徵此職缺的人也應徵了」',
    itemsSelector: `
      [class^=CommonAppliedJobs_jobList__] >
      [class^=CommonAppliedJobItem_container__]
    `,
    jobTitleStrategy: '[class^=CommonAppliedJobItem_title__] a',
    companyNameStrategy: '[class^=CommonAppliedJobItem_pageName__] a',
    activatorPosition: 'bottom-right',
  },
  {
    description: '`/companies/*/jobs/*` 職缺最下方「相似職缺」列表',
    itemsSelector: `
      [class^=SimilarJobsBlock_jobItemsContainer__] >
      [class^=JobItemLarge_container__]
    `,
    jobTitleStrategy: 'a[class^=JobItemLarge_jobTitle__]',
    companyNameStrategy: 'a[class^=JobItemLarge_pageName__]',
  },
  {
    description: '`/jobs` 職缺列表',
    itemsSelector: '[class^=JobSearchItem_wrapper__]',
    jobTitleStrategy: '[class^=JobSearchItem_jobTitle]',
    companyNameStrategy: '[class^=JobSearchItem_companyName]',
    activatorPosition: {
      position: 'top-right',
      offset: [-16, -16],
    },
  },
  {
    description: '`/campaigns` Campaigns 職缺列表',
    itemsSelector: '[class^=CampaignJobSearchItem_wrapper_]',
    jobTitleStrategy: '[class^=CampaignJobSearchItem_headerTitle]',
    companyNameStrategy: '[class^=CampaignJobSearchItem_companyName]',
  },
]
