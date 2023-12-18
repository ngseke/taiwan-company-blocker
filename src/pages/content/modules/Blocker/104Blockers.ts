import { type CreateBlockerOptions } from './createBlocker'

export const _104BlockerOptions: CreateBlockerOptions[] = [
  {
    description: '`/jobs/main` 首頁「適合你的好工作」',
    itemsSelector: `
      .job-recommend .job-recommend-list .row > .col .card,
      .job-recommend .job-recommend-list .row > .col .card-container
    `,
    jobTitleStrategy: '.jb-link-blue',
    companyNameStrategy: '.company-name-link > a, .card__header',
  },
  {
    description: '`/jobs/main` 首頁「適合你的好公司」',
    itemsSelector: '.company-recommend-list .company-card',
    companyNameStrategy: '.company-name-link > a, .card__header',
  },
  {
    description: '`/search` 公司列表、 `/topic/recommend` 「為你推薦」公司列表',
    itemsSelector: '.container .company-list, .company-lists__item',
    companyNameStrategy: '.company-name-link > a, .advert-type27__middle__header__title',
  },
  {
    description: '`/company/*` 公司頁下方工作機會列表（桌面版）',
    itemsSelector: '.joblist__container .job-list-container',
    jobTitleStrategy: '.info-job__text',
    companyNameStrategy: {
      selectorTarget: 'document',
      selector: '[custname]',
      textType: 'attribute',
      textKey: 'custname',
    },
  },
  {
    description: '`/jobs/search` 職缺列表',
    itemsSelector: '#js-job-content > article',
    jobTitleStrategy: {
      selectorTarget: 'item',
      selector: '',
      textType: 'dataset',
      textKey: 'jobName',
    },
    companyNameStrategy: {
      selectorTarget: 'item',
      selector: '',
      textType: 'dataset',
      textKey: 'custName',
    },
    activatorPosition: 'bottom-right',
  },
  {
    description: '`/job/*` 職缺頁右側「瀏覽工作紀錄」和「這些工作也很適合你」職缺列表',
    itemsSelector: `
      .sidebarContainer [data-gtm-sidebar="瀏覽工作紀錄"],
      .sidebarContainer [data-gtm-sidebar="你可能有興趣的工作"]
    `,
    jobTitleStrategy: {
      selectorTarget: 'item',
      selector: '.text-mode b',
      textType: 'attribute',
      textKey: 'title',
    },
    companyNameStrategy: {
      selectorTarget: 'item',
      selector: '.text-mode p',
      textType: 'attribute',
      textKey: 'title',
    },
  },
  {
    description: '`/company/*` 公司頁右側「瀏覽公司紀錄」和「你可能有興趣的公司」列表',
    itemsSelector: `
      .sidebarContainer [data-gtm-sidebar="最近瀏覽公司"],
      .sidebarContainer [data-gtm-sidebar="您可能有興趣的公司"]
    `,
    companyNameStrategy: 'b.h4.d-block.text-truncate',
  },
  {
    description: '`/job/*` 已關閉了的職缺頁下方「這些工作也很適合你」',
    itemsSelector: '.row.job-card__column.d-none.d-md-flex [gtm=你可能有興趣的工作]',
    jobTitleStrategy: 'h3 a',
    companyNameStrategy: '.mb-1.t4.font-weight-bold a',
  },
]
