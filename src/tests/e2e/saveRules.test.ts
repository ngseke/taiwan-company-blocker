import { useBrowser } from '../helpers/puppeteer'
import { useOptionsOperation } from '../helpers/useOptionsOperation'
import { OPTIONS_TEST_IDS } from '../../modules/constants'
import { sleep } from '../helpers/sleep'

describe('Save rules in popup page', () => {
  const { getOptionsPage, getOptionsLocalStorage } = useBrowser()
  const { typeInEditor, getEditorLines, clickRulesSaveButton } =
   useOptionsOperation({ getOptionsPage })

  test('should save & load rules', async () => {
    const companyNameRules = '\n\n\nXYZ 有限公司#註解\n\n  /ABC 興業/  '
    const jobTitleRules = '\n\n\n*助理*\n*實習生*#comment\n\n  硬體工程師  \n\n'
    await typeInEditor(
      OPTIONS_TEST_IDS.companyNameRulesEditor,
      companyNameRules,
    )
    await typeInEditor(
      OPTIONS_TEST_IDS.jobTitleRulesEditor,
      jobTitleRules,
    )
    await clickRulesSaveButton()
    await sleep(500)

    const normalizedCompanyNameRules = 'XYZ 有限公司#註解\n/ABC 興業/'
    const normalizedJobTitleRules = '*助理*\n*實習生*#comment\n硬體工程師'

    expect((await getOptionsLocalStorage()).companyNameRules)
      .toBe(normalizedCompanyNameRules)
    expect((await getOptionsLocalStorage()).jobTitleRules)
      .toBe(normalizedJobTitleRules)

    const page = await getOptionsPage()
    await page.reload({ waitUntil: 'networkidle2' })

    expect((await getOptionsLocalStorage()).companyNameRules)
      .toBe(normalizedCompanyNameRules)
    expect((await getOptionsLocalStorage()).jobTitleRules)
      .toBe(normalizedJobTitleRules)

    expect(
      await getEditorLines(OPTIONS_TEST_IDS.companyNameRulesEditor)
    ).toMatchObject(normalizedCompanyNameRules.split('\n'))
    expect(
      await getEditorLines(OPTIONS_TEST_IDS.jobTitleRulesEditor)
    ).toMatchObject(normalizedJobTitleRules.split('\n'))
  })

  test('should be able to save long rules', async () => {
    const companyNameRules = Array.from({ length: 10000 })
      .map((_, index) => `${index} ${'what a long company name'}`)
      .join('\n')
    const jobTitleRules = Array.from({ length: 10000 })
      .map((_, index) => `${index} ${'what a long job title'}`)
      .join('\n')

    await typeInEditor(
      OPTIONS_TEST_IDS.companyNameRulesEditor,
      companyNameRules,
      true
    )
    await typeInEditor(
      OPTIONS_TEST_IDS.jobTitleRulesEditor,
      jobTitleRules,
      true
    )
    await clickRulesSaveButton()
    await sleep(500)

    expect((await getOptionsLocalStorage()).companyNameRules)
      .toBe(companyNameRules)
    expect((await getOptionsLocalStorage()).jobTitleRules)
      .toBe(jobTitleRules)
  })
})
