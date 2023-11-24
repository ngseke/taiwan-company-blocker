import { expect, test } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'

import { mockChrome } from '../../__tests__/chrome'
import SharedApp from './SharedApp.vue'

test('SharedApp should be rendered without any errors and warnings', async () => {
  mockChrome()

  mount(SharedApp)
  await flushPromises()

  expect(console.error).toBeCalledTimes(0)
  expect(console.warn).toBeCalledTimes(0)
})
