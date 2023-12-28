import { mockChrome } from '../../../../__tests__/chrome'
import { injectGlobalCssVariables } from './injectGlobalCssVariables'

describe('injectGlobalCssVariables', () => {
  test('injectGlobalCssVariables', () => {
    mockChrome()

    injectGlobalCssVariables()

    expect(document.head.querySelector('style')).toBeTruthy()
  })
})
