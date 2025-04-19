/* eslint-disable no-console */
import { flushPromises, mount } from '@vue/test-utils'

import { mockChrome } from '../../../__tests__/chrome'
import App from './App.vue'
import { createTestingPinia } from '@pinia/testing'
import { router } from './router'

test('options app should be rendered without any errors and warnings', async () => {
  mockChrome()

  mount(App, {
    global: {
      plugins: [createTestingPinia(), router],
    },
  })
  await flushPromises()

  expect(console.error).toBeCalledTimes(0)
  expect(console.warn).toBeCalledTimes(0)
})
