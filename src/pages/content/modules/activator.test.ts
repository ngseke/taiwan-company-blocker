import { renderActivator } from './activator'

describe('activator', () => {
  test('renderActivator', () => {
    const handler = vi.fn()
    const $activator = renderActivator({
      onClick: handler,
    })
    $activator.querySelector('button')?.click()
    expect(handler).toBeCalledTimes(1)
  })
})
