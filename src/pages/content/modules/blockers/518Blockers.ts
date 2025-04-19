import { type Blocker } from '../../../../schemas/blocker'

export const _518BlockerOptions: Blocker[] = [
  {
    description: '`/job-index.html` 職缺列表',
    itemsSelector: '.job__card',
    jobTitleStrategy: '.job__title',
    companyNameStrategy: '.job__comp__name',
    activatorPosition: 'bottom-right',
  },
  {
    description: '`/job-index.html` 職缺頁右側「最多人瀏覽的職缺」和「瀏覽記錄」列表、下方「看過此職缺的人也看了...」列表',
    itemsSelector: `
      .sidebarBox > ul > li,
      .similarList > .similarJob
    `,
    jobTitleStrategy: 'a.title',
    companyNameStrategy: 'p.comp',
  },
  {
    description: '`/company-*` 公司頁底部「所有工作機會」列表',
    itemsSelector: '#listContent .jobSumContent',
    jobTitleStrategy: 'li.title a',
    companyNameStrategy: {
      selectorTarget: 'document',
      selector: 'h1.comp-name strong',
      textType: 'textContent',
    },
  },
  {
    description: '`/company-*` 公司頁右側「相似公司」列表',
    itemsSelector: '.comp-sidebox ul.similar li',
    companyNameStrategy: 'a',

  },
]
