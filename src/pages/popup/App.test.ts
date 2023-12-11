import { flushPromises, mount } from '@vue/test-utils'

import { mockChrome } from '../../../__tests__/chrome'
import App from './App.vue'

test('popup app should be rendered without any errors and warnings', async () => {
  mockChrome()

  mount(App)

  await flushPromises()

  expect(console.error).toBeCalledTimes(0)
  expect(console.warn).toBeCalledTimes(0)
})
