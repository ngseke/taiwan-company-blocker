/* eslint-disable no-console */
import { act, render } from '@testing-library/react'

import { mockChrome } from '../../../__tests__/chrome'
import { App } from './App.tsx'

test('popup app should be rendered without any errors and warnings', async () => {
  mockChrome()

  render(<App />)
  act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))
  })

  expect(console.error).toBeCalledTimes(0)
  expect(console.warn).toBeCalledTimes(0)
})
