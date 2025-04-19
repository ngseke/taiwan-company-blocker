import { type Blocker } from '../../schemas/blocker'

export const taiwanJobsBlockerOptions: Blocker[] = [
  {
    description: '`/` 首頁「最新職缺」',
    itemsSelector: '#tuIndexJobList figure.t-card.t-job-card',
    jobTitleStrategy: 'figcaption a.t-card-title',
    companyNameStrategy: 'footer .t-card-comp-name',
    activatorPosition: 'bottom-right',
  },
  {
    description: '`/Internet/index/job_search_list.aspx` 職缺列表',
    itemsSelector: 'ul#tuJobList li.search-list-item figure.t-card.t-list-card',
    jobTitleStrategy: 'figcaption a.t-card-title',
    companyNameStrategy: '.t-list-txts .t-card-comp-name',
  },
  {
    description: '`/Internet/Index/JobDetail.aspx?EMPLOYER_ID=*&HIRE_ID=*` 職缺頁右側「最近瀏覽的工作」和「可能適合您的工作」',
    itemsSelector: '[id^=CPH1_pl] ul li.t-list-item:not(.t-fc-secondary)',
    jobTitleStrategy: 'a.link-navy.t-list-link',
    companyNameStrategy: 'a.link-grey.t-list-link-sm',
  },
  {
    description: '`https://job.taiwanjobs.gov.tw/Internet/jobwanted/company_desc2.aspx?EMPLOYER_ID=*` 公司頁右方「最近瀏覽的公司」列表',
    itemsSelector: '#CPH1_sidePanelViewComps ul.t-list li.t-list-item',
    companyNameStrategy: 'a.link-grey.t-list-link',
  },
  {
    description: '`https://job.taiwanjobs.gov.tw/Internet/jobwanted/company_desc2.aspx?EMPLOYER_ID=*` 公司頁下方「工作機會」列表',
    itemsSelector: '#CPH1_TuJobList ul.search-list-items li.search-list-item figure',
    jobTitleStrategy: 'a.t-card-title.text-inherit',
    companyNameStrategy: {
      selectorTarget: 'document',
      selector: 'h2#CPH1_h1_COMPNAME',
      textType: 'textContent',
    },
  },
]
