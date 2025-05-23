import { type Blocker } from '../schemas/blocker'

export const _104BlockerOptions: Blocker[] = [
  {
    description: '首頁「適合你的好工作」',
    exampleUrl: 'https://www.104.com.tw/',
    itemsSelector: `
      .job-recommend .job-recommend-list .row > .col .card-container
    `,
    jobTitleStrategy: '.jb-link-blue',
    companyNameStrategy: '.company-name-link > a, .card__header',
  },
  {
    description: '首頁「適合你的好公司」',
    exampleUrl: 'https://www.104.com.tw/',
    itemsSelector: '.company-recommend-list .company-card',
    companyNameStrategy: '.company-name-link > a, .card__header',
  },
  {
    description: '最新工作',
    exampleUrl: 'https://www.104.com.tw/jobs/main/newestjob',
    itemsSelector: `
      .job-list__list .info-wrapper,
      .job-list__list .job-list-container
    `,
    jobTitleStrategy: '.jb-link',
    companyNameStrategy: '.info-company a',
  },
  {
    description: '搜尋結果 (Tab: 找公司)',
    exampleUrl: 'https://www.104.com.tw/jobs/search',
    itemsSelector: '.container .company-list, .company-lists__item',
    companyNameStrategy: `
      .company-name-link > a,
      .advert-type27__middle__header__title
    `,
  },
  {
    description: '搜尋結果 (Tab: 找工作)',
    exampleUrl: 'https://www.104.com.tw/company/search',
    itemsSelector: '.job-summary',
    jobTitleStrategy: '.info-job__text',
    companyNameStrategy: '.info-company__text',
    activatorPosition: 'bottom-right',
  },
  {
    description: '`/company/*` 公司頁下方工作機會列表（桌面版）',
    exampleUrl: 'https://www.104.com.tw/company/12v3o7uw',
    itemsSelector: '.joblist__container .job-list-container',
    jobTitleStrategy: '.info-job__text',
    companyNameStrategy: {
      selectorTarget: 'document',
      selector: 'h1',
      textType: 'textContent',
    },
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
    description: '`/job/*` 職缺頁下方「適合你大展身手的工作」職缺列表',
    itemsSelector: '.personal-recommend .job-list-container',
    jobTitleStrategy: '.info-job__text',
    companyNameStrategy: '.info-company__text',
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
  {
    description: '`https://pda.104.com.tw/work/mate/list/highchance` 會員中心「專屬工作」列表（桌面和手機版）',
    itemsSelector: `
      .mate-list .job-summery-mobile,
      .mate-list .job-list-container
    `,
    jobTitleStrategy: '.info-job__text, .job-name',
    companyNameStrategy: '.info-company__text, .cust-name',
  },
  {
    description: '`https://pda.104.com.tw/` 會員中心「推薦適合你大展身手的好工作」列表',
    itemsSelector: '.recommend-job__stage .job-list-container',
    jobTitleStrategy: '.jb-link',
    companyNameStrategy: '.info-company__text, .cust-name',
  },
  {
    description: '`https://pda.104.com.tw/applyRecord` 應徵紀錄「值得一試的好工作」列表',
    itemsSelector: '.recommend-jobs .job-list-container',
    jobTitleStrategy: '.jb-link',
    companyNameStrategy: '.info-company__text, .cust-name',
  },
  {
    description: '`/job/similar/*` 「...的相似工作」列表',
    itemsSelector: '.jb-container .list-container [jobtype]',
    jobTitleStrategy: '.jb-link',
    companyNameStrategy: '.info-company__text, .cust-name',
  },
  {
    description: '`/company/similar/*` 「...的相似公司」列表',
    itemsSelector: `
      .list-container--summary
      .list-container
      .row.no-gutters.py-4.list-large
    `,
    companyNameStrategy: '.jb-link',
  },
]
