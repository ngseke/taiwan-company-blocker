import { actionActivatorDataKey, renderActivator } from './activator'

describe('activator', () => {
  test('renderActivator', () => {
    const { $wrapper, $activator } = renderActivator()
    expect($wrapper instanceof HTMLElement).toBe(true)
    expect($activator instanceof HTMLElement).toBe(true)
    expect($activator.dataset[actionActivatorDataKey]).not.toBeUndefined()
  })
})
