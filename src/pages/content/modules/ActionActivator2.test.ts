import { mockChrome } from '../../../../__tests__/chrome'
import { ActionActivator2 } from './ActionActivator2'
import { type Candidate } from './Candidate'
import { $ } from './dom'
import { emitter } from './emitter'
import { overlayDataKey } from './overlay'

describe('ActionActivator2', () => {
  const activatorPositionCallback = vi.fn()
    .mockReturnValue({ x: 0, y: 0 })
  let actionActivator: ActionActivator2
  let candidate: Candidate
  const { body } = document

  beforeEach(() => {
    activatorPositionCallback.mockClear()
    actionActivator = new ActionActivator2()

    const $item = document.createElement('div')
    body.append($item)
    candidate = {
      companyName: 'Test Company',
      jobTitle: 'Test Job Title',
      itemElementRef: new WeakRef($item),
      options: {
        description: 'Test Description',
        itemsSelector: '.',
      },
    }
  })

  afterEach(() => {
    body.innerHTML = ''
    actionActivator?.stop()
  })

  test('render the container', async () => {
    mockChrome()
    actionActivator.start([])

    expect(
      $(`[data-${ActionActivator2.dataSetKey}]`)
    ).toBeTruthy()
  })

  test('render the activator', async () => {
    mockChrome()
    vi.useFakeTimers()
    await actionActivator.start([candidate])
    vi.runAllTimers()

    expect($('button svg')).toBeTruthy()
    actionActivator.stop()
    expect($('button svg')).toBeFalsy()
  })

  test('emit event on click', async () => {
    mockChrome()
    const spyEmitter = vi.spyOn(emitter, 'emit')

    vi.useFakeTimers()
    actionActivator.start([candidate])
    vi.runAllTimers()

    $('button')?.click()
    expect(spyEmitter).toBeCalled()
  })

  test('toggle overlay visibility on hover', async () => {
    mockChrome()

    vi.useFakeTimers()
    actionActivator.start([candidate])
    vi.runAllTimers()

    expect($(`[data-${overlayDataKey}]`)).toBeTruthy()

    $('button')?.dispatchEvent(new Event('mouseenter'))
    expect($(`[data-${overlayDataKey}]`)?.style.opacity).toBe('1')

    $('button')?.dispatchEvent(new Event('mouseleave'))
    expect($(`[data-${overlayDataKey}]`)?.style.opacity).toBe('0')
  })
})
