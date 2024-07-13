import { useBrowser } from '../helpers/puppeteer'
import { useOptionsOperation } from '../helpers/useOptionsOperation'
import { OPTIONS_TEST_IDS } from '../../modules/constants'
import { sleep } from '../helpers/sleep'

describe('Save rules in popup page', () => {
  const { getOptionsPage, getOptionsLocalStorage } = useBrowser()
  const { typeInEditor, clickRulesSaveButton } = useOptionsOperation({
    getOptionsPage,
  })

  test('should be able to save long rules', async () => {
    const companyNameRules = Array.from({ length: 10000 })
      .map((_, index) => `${index} ${'what a long company name'}`)
      .join('\n')
    const jobTitleRules = Array.from({ length: 10000 })
      .map((_, index) => `${index} ${'what a long job title'}`)
      .join('\n')

    await typeInEditor(OPTIONS_TEST_IDS.companyNameRulesEditor, companyNameRules)
    await typeInEditor(OPTIONS_TEST_IDS.jobTitleRulesEditor, jobTitleRules)
    await clickRulesSaveButton()
    await sleep(500)

    expect((await getOptionsLocalStorage()).companyNameRules)
      .toBe(companyNameRules)
    expect((await getOptionsLocalStorage()).jobTitleRules)
      .toBe(jobTitleRules)

    const page = await getOptionsPage()
    await page.reload({ waitUntil: 'networkidle2' })

    expect((await getOptionsLocalStorage()).companyNameRules)
      .toBe(companyNameRules)
    expect((await getOptionsLocalStorage()).jobTitleRules)
      .toBe(jobTitleRules)
  })
})
